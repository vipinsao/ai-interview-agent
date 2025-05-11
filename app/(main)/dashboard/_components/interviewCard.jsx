import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment/moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function InterviewCard({ interview, viewDetail = false, index }) {
  const url =
    process.env.NEXT_PUBLIC_HOST_URL + "/interview/" + interview?.interview_id;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Copied!!!");
  };
  const onSend = () => {
    window.location.href =
      "mailto:vipin.sao@ssipmt.com?subject=AIrcruiter interview link & body=Interview Link=" +
      url;
  };
  console.log(interview["interview-feedback"]);
  return (
    <div key={index} className="mt-4 p-5 bg-white rounded-lg border shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="h-[30px] w-[30px] bg-primary flex items-center justify-center rounded-full">
          <span className="text-center text-white">AI</span>
        </div>
        <h2>{moment(interview?.created_at).format("DD/MM/YYYY")}</h2>
      </div>
      <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-2 flex justify-between text-gray-500">
        {interview?.duration}
        <span className="text-green-600">
          {interview["interview-feedback"]?.length} Candidates
        </span>
      </h2>
      {!viewDetail ? (
        <div className="flex mt-2">
          <Button
            variant={"outline"}
            className={"cursor-pointer w-full"}
            onClick={copyLink}
          >
            <Copy /> Copy Link
          </Button>
        </div>
      ) : (
        <Link
          href={"/scheduled-interview/" + interview?.interview_id + "/details"}
        >
          <Button
            className={"mt-5 w-full cursor-pointer flex items-center"}
            variant={"outline"}
          >
            View Detail
            <ArrowRight className="text-sm" />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default InterviewCard;
