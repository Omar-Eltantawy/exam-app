"use client";

import React from "react";
import RegisterForm from "./_components/register-form";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-32">
      <div className="w-full max-w-md">
        <h2 className="font-bold text-3xl mb-3  font-inter">Create Account</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
