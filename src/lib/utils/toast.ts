import { useToast } from "@/components/ui/use-toast";

export function createToast() {
  const { toast } = useToast();
  return {
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
}
