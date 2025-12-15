"use client";

import React from "react";

type TimerProgressProps = {
  timerProgress: number;
  size?: number;
  strokeWidth?: number;
  formatTime: (s: number) => string;
  timeLeft: number;
};

export default function TimerProgress({
  timerProgress,
  size = 80,
  strokeWidth = 8,
  formatTime,
  timeLeft,
}: TimerProgressProps) {
  const backgroundStyle = {
    background: `conic-gradient(#2563eb ${
      timerProgress * 3.6
    }deg, #e5e7eb 0deg)`,
  };

  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        ...backgroundStyle,
      }}
    >
      <div
        className="bg-white rounded-full flex items-center justify-center"
        style={{
          width: size - strokeWidth * 3,
          height: size - strokeWidth * 3,
        }}
      >
        <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
}
