"use client";
import React from "react";

import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";

function Dashboard() {
  return (
    <div>
      <h2 className="py-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
