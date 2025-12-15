import React from "react";
import InputField from "../../_components/input-field";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { ChangeNewPasswordField } from "@/lib/types/auth";
import useChangeNewPassword from "../_hooks/use-change-new-password";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeNewPasswordSchema } from "@/lib/schemes/forgot-password.schema";
import FormError from "../../_components/form-error";

type CreateNewPasswordProps = {
  onNext: () => void;
};

export default function CreateNewPassword({ onNext }: CreateNewPasswordProps) {
  const { isPending, error, resetPassword } = useChangeNewPassword();
  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(changeNewPasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangeNewPasswordField> = async (values) => {
    resetPassword(
      { newPassword: values.newPassword },
      {
        onSuccess: () => onNext(),
      }
    );
  };

  return (
    <div>
      <h2 className="font-bold text-3xl mb-4 font-inter">
        Create a New Password
      </h2>
      <p className="text-gray-500 w-full text-base mb-8">
        Create a new strong password for your account.
      </p>
      <Form {...form}>
        <form
          className=" flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputField<ChangeNewPasswordField>
            name="newPassword"
            label="New Password"
            type="password"
            placeholder="*********"
            control={form.control}
            error={error?.message}
          />
          <InputField<ChangeNewPasswordField>
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            placeholder="*********"
            control={form.control}
            error={error?.message}
          />

          {/* Error */}
          {error && <FormError message={error?.message || "Invalid form"} />}
          <Button
            type="submit"
            className="mt-3"
            disabled={
              isPending ||
              (!form.formState.isValid && form.formState.isSubmitted)
            }
          >
            Reset Password <MoveRight />{" "}
          </Button>
          <div className="m-auto text-gray-500">
            Don’t have an account?{" "}
            <span className="text-blue-600 font-semibold text-sm  mt-2 cursor-pointer">
              <Link href="/register">Create yours</Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
