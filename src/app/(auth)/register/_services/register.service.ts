import { RegisterField, RegisterResponse } from "@/lib/types/auth";

export async function registerSrevice(fields: RegisterField) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<RegisterResponse> = await response.json();

  return payload;
}
