import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, defaultValue, type, ...props }, ref) => {
    const isControlled = value !== undefined

    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm " +
            "ring-offset-background placeholder:text-muted-foreground " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
            "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...(isControlled
          ? { value, onChange, readOnly: !onChange }
          : { defaultValue })}
        {...props}
      />
    )
  }
)


Input.displayName = "Input"
