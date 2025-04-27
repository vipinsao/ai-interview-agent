"use client";
import React, { useEffect, useState } from "react";

const TimerComponent = ({ startTimer, resetTimer }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (startTimer) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    if (resetTimer) {
      setSeconds(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startTimer, resetTimer]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return <div className="font-mono text-lg">{formatTime(seconds)}</div>;
};

export default TimerComponent;
