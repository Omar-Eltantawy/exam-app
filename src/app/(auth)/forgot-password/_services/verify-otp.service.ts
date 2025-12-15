import { ForgotPasswordResponse, VerifyOTPField } from "@/lib/types/auth";

export async function verifyOTPSrevice(fields: VerifyOTPField) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    }
  );

  const payload: APIResponse<ForgotPasswordResponse> = await response.json();

  return payload;
}
