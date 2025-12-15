"use client";

import React from "react";
import InputField from "../../_components/input-field";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PhoneInput } from "@/components/ui/phone-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemes/auth.schema";
import { Form, FormField } from "@/components/ui/form";
import { RegisterField } from "@/lib/types/auth";
import FormError from "../../_components/form-error";
import { useRegister } from "../_hooks/use-register";
import { parsePhoneNumber } from "react-phone-number-input";

export default function RegisterForm() {
  const { error, isPending, register } = useRegister();

  const form = useForm<RegisterField>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterField> = (values) => {
    if (values.phone) {
      const phoneNumber = parsePhoneNumber(values.phone); // full +20 number
      if (phoneNumber) {
        values.phone = phoneNumber.formatNational().replace(/\s/g, ""); // converts +20xxxxxxxxxx → 01xxxxxxxxx
      }
    }

    register(values);

    console.log(error);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-3">
          <InputField<RegisterField>
            name="firstName"
            label="First Name"
            type="text"
            placeholder="Ahmed"
            control={form.control}
          />

          <InputField<RegisterField>
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Abdulla"
            control={form.control}
          />
        </div>

        <InputField<RegisterField>
          name="username"
          label="Username"
          type="text"
          placeholder="user123"
          control={form.control}
        />
        <InputField<RegisterField>
          name="email"
          label="Email"
          type="email"
          placeholder="user@example.com"
          control={form.control}
        />

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

        <InputField<RegisterField>
          name="password"
          label="Password"
          type="password"
          placeholder="*********"
          control={form.control}
        />
        <InputField<RegisterField>
          name="rePassword"
          label="Confirm Password"
          type="password"
          placeholder="*********"
          control={form.control}
        />

        {/* Error */}
        {error && <FormError message={error.message || "Invalid form"} />}

        <Button
          type="submit"
          className="mt-3 "
          disabled={
            isPending || (!form.formState.isValid && form.formState.isSubmitted)
          }
        >
          Create Account
        </Button>

        <div className="text-center text-gray-500 text-sm mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
