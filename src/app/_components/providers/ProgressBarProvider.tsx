"use client";

import type React from "react";
import { Next13ProgressBar } from "next13-progressbar";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Next13ProgressBar startPosition={0.3} height="3px" color="#A058DA" options={{ showSpinner: false }} />
      {children}
    </>
  );
};

export default ProgressBarProvider;
