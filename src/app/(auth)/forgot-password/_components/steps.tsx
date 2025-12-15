"use client";
import React, { useState } from "react";
import ForgoPasswordStep from "./forgot-password-step";
import VerifyOTPStep from "./verify-otp-step";
import CreateNewPassword from "./create-new-password";

export default function Steps() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <ForgoPasswordStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <VerifyOTPStep onNext={() => setStep(3)} onPrev={() => setStep(1)} />
      )}
      {step === 3 && <CreateNewPassword onNext={() => setStep(1)} />}
    </>
  );
}
