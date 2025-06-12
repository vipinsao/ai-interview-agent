"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Loader, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";

function QuestionList({ formData, onCreateLink }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);
  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/ai-model`,
        {
          ...formData,
        }
      );

      let content = result.data;

      if (!content) {
        toast.error("No content received from server.");
        setLoading(false);
        return;
      }

      // Ensure content is a string
      if (typeof content !== "string") {
        content = JSON.stringify(content);
      }

      // Try to extract JSON block using regex
      const match = content.match(/```json\s*([\s\S]*?)```/i);
      const jsonString = match ? match[1].trim() : content.trim();

      let parsed;

      try {
        parsed = JSON.parse(jsonString);
      } catch (jsonError) {
        console.error("Invalid JSON received from server:", content);
        toast.error("Invalid JSON format received.");
        setLoading(false);
        return;
      }

      if (!parsed || !parsed.interviewQuestions) {
        toast.error("No interview questions found in the server response.");
        setLoading(false);
        return;
      }
      setQuestionList(parsed.interviewQuestions || []);
      // setQuestionList(data);
      setLoading(false);
    } catch (error) {
      toast.error("Server Error,Try again");
      setLoading(false);
    }
  };
  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();

    //Update User Credits
    const userUpdate = await supabase
      .from("Users")
      .update({ credits: Number(user?.credits) - 1 })
      .eq("email", user?.email)
      .select();

    console.log(userUpdate);

    setSaveLoading(false);
    onCreateLink(interview_id);
  };
  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions bases on your job
              positions
            </p>
          </div>
        </div>
      )}
      {!loading && questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}
      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader className="animate-spin" />}Created Interview
          Link & Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
