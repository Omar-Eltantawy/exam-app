import { AccoutFormValues } from "@/lib/types/account";

export async function updateAccountService(payload: AccoutFormValues) {
  const res = await fetch("/api/account", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update account");
  }

  return data;
}
