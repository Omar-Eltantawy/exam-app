export async function deleteAccountService() {
  const res = await fetch("/api/account/delete", {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete account");
  }

  return res.json();
}
