"use client";
import LoginForm from "./_components/login-form";

export default function page() {
  return (
    <div className=" w-1/2  flex flex-col justify-center  p-32">
      <h2 className="font-bold text-3xl mb-4 font-inter">Login</h2>
      <LoginForm />
    </div>
  );
}
