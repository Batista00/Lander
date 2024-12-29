import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-white hover:from-[#00CC66] hover:to-[#009933] shadow-lg",
        destructive:
          "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700",
        outline:
          "border-2 border-[#00FF7F] bg-transparent text-[#00FF7F] hover:bg-[#00FF7F]/10 hover:text-[#00CC66]",
        secondary:
          "bg-[#00FF7F]/10 text-[#00FF7F] hover:bg-[#00FF7F]/20 hover:text-[#00CC66]",
        ghost: "hover:bg-[#00FF7F]/10 hover:text-[#00FF7F]",
        link: "text-[#00FF7F] underline-offset-4 hover:text-[#00CC66] hover:underline",
        glow: "bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-white hover:from-[#00CC66] hover:to-[#009933] shadow-[0_0_15px_rgba(0,255,127,0.5)] hover:shadow-[0_0_25px_rgba(0,255,127,0.6)]",
        glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
