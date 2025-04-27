"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import TimerComponent from "./_components/TimerComponent";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);

  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const vapi = useRef();
  const [loading, setLoading] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const { interview_id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!interviewInfo) return;
    const instanceVapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    vapi.current = instanceVapi;
    startCall();
  }, [interviewInfo]);

  useEffect(() => {
    const handleMessage = (message) => {
      console.log("Message:", message);
      if (message?.convresation) {
        const convoString = JSON.stringify(message.conversation);
        console.log("Conversation String:", convoString);
        setConversation(convoString);
      }
    };
    vapi.on("message", handleMessage);
    vapi.current.on("call-start", () => {
      console.log("Call has started.");
      toast("Call Connected...");
      setStartTimer(true);
      setResetTimer(false);
    });
    vapi.current.on("call-end", () => {
      console.log("Call has ended.");
      toast("Interview has ended!");
      setStartTimer(false);
      setResetTimer(true);
    });

    vapi.current.on("speech-start", () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    });
    vapi.current.on("speech-end", () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
      GenerateFeedback();
    });

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => console.log("END"));
      vapi.off("speech-start", () => console.log("END"));
      vapi.off("call-end", () => console.log("END"));
      vapi.off("speech-end", () => console.log("END"));
    };
  }, []);

  const GenerateFeedback = async () => {
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });

    console.log(result);

    // // Safe access: result.data and then get the content
    // const Content = result.data.data || result.data.content; // fallback if API returns 'data' instead of 'content'

    // if (!Content) {
    //   console.error("No content found in the API response.");
    //   return;
    // }

    // // Remove starting ```json\n and ending ```
    // const FINAL_CONTENT = Content.replace(/^```json\s*/, "") // removes starting ```json + optional \n
    //   .replace(/\s*```$/, ""); // removes ending ```

    // console.log(FINAL_CONTENT);
    // //save to database

    const { data, error } = await supabase
      .from("interview-feedback")
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          // feedback: JSON.parse(FINAL_CONTENT),
          recommended: false,
        },
      ])
      .select();
    console.log(data);
    router.replace("/interview/" + interview_id + "/completed");
  };

  const startCall = () => {
    let questionList = "";
    interviewInfo?.interviewData?.questionList.forEach(
      (item, index) => (questionList = item?.question + "," + questionList)
    );

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        "! Ready to kickstart your interview for the position of " +
        interviewInfo?.interviewData?.jobPosition +
        "? Let's begin!",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
    You are an AI voice assistant conducting interviews for the position of "${interviewInfo?.interviewData?.jobPosition}".

    🔹 Start with a warm, professional greeting. Example:
    "Hi ${interviewInfo?.userName}! Ready to begin your ${interviewInfo?.interviewData?.jobPosition} interview? Let's get started!"

    🔹 Interview Flow:
    - Ask **one question at a time**.
    - Questions: ${questionList}
    - Wait for the candidate's response before moving forward.
    - Keep questions **clear, concise, and engaging**.

    🔹 Support During Interview:
    - If the candidate struggles, offer hints without giving the answer.
      Example: "Need a hint? Think about how React tracks component updates!"
    - Provide **brief, encouraging feedback** after each answer.
      Example: "That's a solid answer."

    - If needed, ask:
      "Would you like me to rephrase or give a hint?"

    🔹 Conversational Style:
    - Keep it **casual yet professional**.
    - Use phrases like:
      - "Alright, next up..."
      - "Let's tackle a tricky one!"

    🔹 Wrapping Up:
    - After 10-12 questions, **summarize** their performance.
      Example:
      "You did great! You handled some tough questions well. Keep sharpening your skills!"

    - End with positive note:
      "Thanks for chatting! Hope to see you crushing projects soon! 🚀"

    🔹 Key Guidelines:
    ✅ Be friendly, witty, and supportive.
    ✅ Keep responses short and natural.
    ✅ Adapt based on the candidate's confidence.
    ✅ Keep the focus on React-based questions.
    `.trim(),
          },
        ],
      },
    };

    vapi.current.start(assistantOptions);
  };

  const stopInterview = () => {
    if (vapi.current) {
      vapi.current.stop();
    } else {
      console.error("Vapi instance is not found");
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          <TimerComponent startTimer={startTimer} resetTimer={resetTimer} />
          {/* {00:00:00} */}
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center mt-4 shadow-2xl relative">
          {!activeUser && (
            <span className="absolute inset-30 rounded-full bg-blue-100 opacity-80  animate-pulse"></span>
          )}
          <Image
            src={"/ai-model.jpg"}
            alt="AI-Image"
            width={80}
            height={80}
            className={
              "w-[100px] h-[100px]  md:w-[80px] md:h-[80px] xl:w-[120px] xl:h-[120px] object-cover rounded-full "
            }
          />
          <h2 className=" font-semibold">AI Recruiter</h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center mt-4 shadow-2xl">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-pulse"></span>
            )}
            <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5 ">
              {interviewInfo?.userName[0]}
            </h2>
          </div>

          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center mt-5">
        <Mic className="h-12 w-12 p-3 bg-gray-500  text-white rounded-full cursor-pointer hover:bg-gray-800 hover:scale-110 transition-full ease-in-out shadow-2xl" />
        <AlertConfirmation stopInterview={() => stopInterview()}>
          {!loading ? (
            <Phone
              className="h-12 w-12 p-3 bg-red-500 rounded-full text-white cursor-pointer hover:bg-red-900 hover:scale-110 transition-full ease-in-out shadow-2xl"
              onClick={() => stopInterview()}
            />
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </AlertConfirmation>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview in Progress...
      </h2>
    </div>
  );
}

export default StartInterview;
