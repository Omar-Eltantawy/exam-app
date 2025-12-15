"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { useSession } from "next-auth/react";
import { accountSchema } from "@/lib/schemes/account.schema";
import { AccoutFormValues } from "@/lib/types/account";
import { useUpdateAccount } from "../_hooks/use-update-account";
import { AccountDialog } from "./account-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import InputField from "@/app/(auth)/_components/input-field";

export default function AccountForm() {
  const { data: session } = useSession();
  const { mutate, isPending } = useUpdateAccount();

  const form = useForm<AccoutFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: session?.user?.firstName || "",
      lastName: session?.user?.lastName || "",
      username: session?.user?.username || "",
      email: session?.user?.email || "",
      phone: session?.user?.phone || "",
    },
  });

  const onSubmit = (values: AccoutFormValues) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-10">
        {/* First & Last Name */}
        <div className="flex gap-5">
          <InputField<AccoutFormValues>
            name="firstName"
            label="First Name"
            control={form.control}
          />

          <InputField<AccoutFormValues>
            name="lastName"
            label="Last Name"
            control={form.control}
          />
        </div>

        {/* Username */}
        <InputField<AccoutFormValues>
          name="username"
          label="Username"
          control={form.control}
        />

        {/* Email */}
        <InputField<AccoutFormValues>
          name="email"
          label="Email"
          type="email"
          control={form.control}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm">Phone Number</label>

              <PhoneInput
                defaultCountry="EG"
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter your phone number"
                className="w-full h-10 text-sm"
              />

              {fieldState.error && (
                <p className="text-red-500 text-xs">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Actions */}
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="w-1/2 bg-red-50 text-red-500 hover:bg-red-100"
                disabled={isPending}
              >
                Delete My Account
              </Button>
            </DialogTrigger>
            <AccountDialog />
          </Dialog>

          <Button type="submit" className="w-1/2" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
