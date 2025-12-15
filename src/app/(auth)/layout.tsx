import React from "react";
import AuthLeftSide from "./_components/auth-left-side";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between w-full h-screen ">
      <AuthLeftSide />
      {children}
    </div>
  );
}
