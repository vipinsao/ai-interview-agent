import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;
  const total =
    feedback?.rating?.technicalSkills +
    feedback?.rating?.communication +
    feedback?.rating?.problemSolving +
    feedback?.rating?.experience;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={"text-primary cursor-pointer"}>
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>FeedBack</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex item-center gap-5">
                  <h2 className="bg-primary p-2 px-4.5 font-bold text-white text-sm rounded-full">
                    {candidate.userName[0].toUpperCase()}
                  </h2>
                  <div>
                    <h2>{candidate?.userName.toUpperCase()}</h2>
                    <h2 className="text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <h2 className="text-primary text-2xl font-bold">
                    {total / 4}/10
                  </h2>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Skills Assesment</h2>
                <div className="mt-3 grid grid-cols-2 gap-10">
                  <div>
                    <h2 className="flex justify-between">
                      Technical Skills{" "}
                      <span>{feedback?.rating?.technicalSkills}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.technicalSkills * 10}
                      className={"mt-1"}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Communication{" "}
                      <span>{feedback?.rating?.communication}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.communication * 10}
                      className={"mt-1"}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Problem Solving{" "}
                      <span>{feedback?.rating?.problemSolving}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.problemSolving * 10}
                      className={"mt-1"}
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Experience
                      <span>{feedback?.rating?.experience}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.experience * 10}
                      className={"mt-1"}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Performance Summary</h2>
                <div className="p-5 bg-secondary my-3 rounded-md">
                  {<p>{feedback?.summary}</p>}
                </div>
              </div>
              <div
                className={`p-5 mt-8 rounded-md flex justify-between items-center ${
                  feedback?.recommendation === "No"
                    ? "bg-red-300"
                    : "bg-green-300"
                }`}
              >
                <div>
                  <h2
                    className={` font-bold ${
                      feedback?.recommendation === "No"
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    Recommendation Msg:
                  </h2>
                  <p
                    className={`select-none ${
                      feedback?.Recommendation === "No"
                        ? "text-red-500"
                        : "text-green-700"
                    }`}
                  >
                    {feedback?.recommendationMsg}
                  </p>
                </div>
                <div className="flex flex-col items-center ">
                  <Link href={"https://mail.google.com/"}>
                    <Button
                      className={`p-5 rounded-md cursor-pointer select-none ${
                        feedback?.recommendation === "No"
                          ? "bg-red-700"
                          : "bg-green-700"
                      }`}
                    >
                      Send Msg
                    </Button>
                  </Link>
                  <p className="text-sm font-semibold text-zinc-500 mt-2">
                    mail - vipinc.sao@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
