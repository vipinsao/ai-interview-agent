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

const data = [
  {
    question:
      "Can you briefly introduce yourself and walk us through your educational background?",
    type: "Experience",
  },
  {
    question:
      "What programming languages and technologies are you most familiar with?",
    type: "Technical",
  },
  {
    question: "Why did you choose full stack development as your career path?",
    type: "Behavioral",
  },
  {
    question:
      "Describe a personal project or school assignment where you used both front-end and back-end technologies. What was your role and what did you learn?",
    type: "Problem Solving",
  },
  {
    question:
      "Can you explain the difference between JavaScript and TypeScript?",
    type: "Technical",
  },
  {
    question:
      "How do you handle version control in your projects? Have you used Git or any other version control system?",
    type: "Technical",
  },
  {
    question:
      "Describe a challenging problem you faced while working on a project and how you solved it.",
    type: "Problem Solving",
  },
  {
    question:
      "Can you explain the concept of RESTful APIs and provide an example of how you might implement one?",
    type: "Technical",
  },
  {
    question: "How do you approach debugging and testing your code?",
    type: "Technical",
  },
  {
    question:
      "What are some of the key considerations when designing a database schema?",
    type: "Technical",
  },
  {
    question: "Do you have any questions for us about the role or the company?",
    type: "Behavioral",
  },
];

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
      // const result = await axios.post("/api/ai-model", {
      //   ...formData,
      // });

      // let content = result.data;

      // // Try to extract JSON block using regex
      // const match = content.match(/```json\s*([\s\S]*?)```/);
      // const jsonString = match ? match[1].trim() : content;

      // let parsed;

      // try {
      //   parsed = JSON.parse(jsonString);
      // } catch (jsonError) {
      //   toast.error("Invalid JSON format from server.");
      //   console.error("JSON Parsing Error:", jsonError);
      //   setLoading(false);
      //   return;
      // }

      // setQuestionList(parsed.interviewQuestions || []);
      setQuestionList(data);
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
      .select("*");
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
