import { Button } from "@/components/ui/button";
import moment from "moment/moment";
import React, { useEffect } from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidateList({ candidate }) {
  let total = null;
  if (!candidate || !candidate[0]) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (candidate?.[0]?.feedback?.feedback) {
      const feedback = candidate[0].feedback.feedback;
      total =
        (feedback.rating.technicalSkills || 0) +
        (feedback.rating.communication || 0) +
        (feedback.rating.problemSolving || 0) +
        (feedback.rating.experience || 0);
    }
  }, [candidate]);

  return (
    <div>
      <h2 className="font-bold my-5">Candidates ({candidate?.length})</h2>
      {candidate?.map((candidate, ind) => (
        <div
          key={ind}
          className="p-5 flex justify-between gap-3 items-center bg-white rounded-lg"
        >
          <div className="flex item-center gap-5">
            <h2 className="bg-primary p-2 px-4.5 font-bold text-white text-sm rounded-full">
              {candidate.userName[0].toUpperCase()}
            </h2>
            <div>
              <h2>{candidate?.userName.toUpperCase()}</h2>
              <h2 className="text-sm text-gray-500">
                Completed On:{" "}
                {moment(candidate?.created_at).format("DD MMM,YYYY")}
              </h2>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {/* <h2 className="text-sm text-green-500">{total / 4}/10</h2> */}
            <CandidateFeedbackDialog candidate={candidate} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidateList;
