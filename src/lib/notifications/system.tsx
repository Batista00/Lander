import * as React from "react";
import { useToast } from "@/hooks/useToast";
import {
  ToastAction,
  ToastDescription,
  ToastTitle,
  type ToastProps,
  Toast,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";

export function useNotifications() {
  const { toast } = useToast();

  const notify = {
    success(title: string, description: string) {
      toast({
        title,
        description,
        variant: "default",
      });
    },
    error(title: string, description: string) {
      toast({
        title,
        description,
        variant: "destructive",
      });
    },
    info(title: string, description: string) {
      toast({
        title,
        description,
        variant: "default",
      });
    },
    warning(title: string, description: string) {
      toast({
        title,
        description,
        variant: "destructive",
      });
    },
  };

  return { notify };
}

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  );
}
