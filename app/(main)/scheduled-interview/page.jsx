"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/interviewCard";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select("jobPosition,duration,interview_id,interview-feedback(userEmail)")
      .eq("userEmail", user?.email)
      .order("id", { ascending: true });

    // console.log(data);
    setInterviewList(data);
  };
  return (
    <div className="mt-5">
      <h2 className=" font-bold text-2xl">
        Interview List with Candidate Report
      </h2>

      {interviewList?.length === 0 ? (
        <div className="p-5 flex flex-col gap-3 items-center  mt-5">
          <Video className="h-10 w-10 text-primary" />
          <h2>You dont have any interview created!</h2>
          <Link href={"/dashboard/create-interview"}>
            <Button className={"cursor-pointer"}>+ Create New Interview</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {interviewList?.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
