// src/components/ui/checkbox.tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentProps<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
    "size-5 shrink-0 rounded-[4px] border border-input shadow-xs outline-none " +
    "transition-shadow focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 " +
    "data-[state=checked]:bg-primary data-[state=checked]:border-primary " +
    "data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary " +
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 " +
    "disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="grid place-items-center w-full h-full"
    >
      <CheckIcon className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = "Checkbox"
