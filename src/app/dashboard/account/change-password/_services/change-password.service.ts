import { ChangePasswordValues } from "@/lib/types/account";

export async function changePasswordService(data: ChangePasswordValues) {
  const res = await fetch("/api/account/change-password", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.message || "Failed to change password");
  }

  return payload;
}
