import { toast as toastUI } from "@/components/ui/use-toast";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotifyOptions {
  title: string;
  description: string;
}

const notify = {
  success(title: string, description: string) {
    toastUI({
      title,
      description,
      variant: "default",
    });
  },
  error(title: string, description: string) {
    toastUI({
      title,
      description,
      variant: "destructive",
    });
  },
  info(title: string, description: string) {
    toastUI({
      title,
      description,
      variant: "default",
    });
  },
  warning(title: string, description: string) {
    toastUI({
      title,
      description,
      variant: "destructive",
    });
  },
};

export { notify };
