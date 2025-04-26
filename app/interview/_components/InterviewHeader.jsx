import Image from "next/image";
import React from "react";

function InterviewHeader() {
  return (
    <div className="p-1 shadow-sm bg-white border-b-2 border-gray-400">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={100}
        height={80}
        className="w-[50px] ml-4"
      />
    </div>
  );
}

export default InterviewHeader;
