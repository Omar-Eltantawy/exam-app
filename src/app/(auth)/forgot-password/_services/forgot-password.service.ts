import { ForgotPasswordField, ForgotPasswordResponse } from "@/lib/types/auth";

export async function forgotPassswordSrevice(fields: ForgotPasswordField) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/forgotPassword`,
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
