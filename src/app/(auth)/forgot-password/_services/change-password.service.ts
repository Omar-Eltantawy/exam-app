import {
  ChangeNewPasswordField,
  ChangeNewPasswordResponse,
} from "@/lib/types/auth";

type changeNewPasswordSreviceProps = {
  email: string;
  fields: ChangeNewPasswordField;
};

export async function changeNewPasswordSrevice({
  email,
  fields,
}: changeNewPasswordSreviceProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/resetPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        newPassword: fields.newPassword,
      }),
    }
  );

  const payload: APIResponse<ChangeNewPasswordResponse> = await response.json();

  return payload;
}
