"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidateList from "./_components/CandidateList";

function InterviewDetails() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState();

  useEffect(() => {
    user && GetInterviewDetail();
  }, [user]);

  useEffect(() => {
    console.log(interviewDetail);
  }, [interviewDetail]);
  const GetInterviewDetail = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select(
        `jobPosition,jobDescription,questionList,type,duration,interview_id,created_at,interview-feedback(userEmail,userName,feedback,created_at)`
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);

    setInterviewDetail(data[0]);
    // console.log(data[0]);
    // console.log(interviewDetail);
  };
  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl ">Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidate={interviewDetail?.["interview-feedback"]} />
    </div>
  );
}

export default InterviewDetails;
