"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/app/(auth)/_components/input-field";

import { useChangePassword } from "../_hooks/use-change-password";
import { ChangePasswordValues } from "@/lib/types/account";
import { changePasswordSchema } from "@/lib/schemes/account.schema";

export default function ChangePasswordForm() {
  const { mutate, isPending } = useChangePassword();

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const onSubmit = (values: ChangePasswordValues) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-10 w-full"
      >
        <InputField<ChangePasswordValues>
          name="oldPassword"
          label="Current Password"
          type="password"
          control={form.control}
        />

        <InputField<ChangePasswordValues>
          name="password"
          label="New Password"
          type="password"
          control={form.control}
        />

        <InputField<ChangePasswordValues>
          name="rePassword"
          label="Confirm New Password"
          type="password"
          control={form.control}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </Form>
  );
}
