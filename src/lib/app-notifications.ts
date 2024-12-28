import { useToast } from "@/hooks/useToast";

export function useAppNotifications() {
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
