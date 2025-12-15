"use client";

import { useMutation } from "@tanstack/react-query";
import { changePasswordService } from "../_services/change-password.service";
import { toast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePasswordService,
    onSuccess: () => {
      toast({
        title: "Password Updated",
        description: "Please login again with your new password",
      });

      signOut({ callbackUrl: "/login" });
    },
  });
}
