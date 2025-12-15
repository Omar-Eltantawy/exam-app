"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteAccountService } from "../_services/delete-account.service";
import { signOut } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccountService,
    onSuccess: async () => {
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently removed",
        variant: "destructive",
      });

      await signOut({ callbackUrl: "/login" });
    },
  });
}
