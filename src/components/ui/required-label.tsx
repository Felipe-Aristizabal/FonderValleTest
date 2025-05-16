import type { ReactNode } from "react"
import { FormLabel } from "@/components/ui/form"

interface RequiredLabelProps {
  children: ReactNode
  required?: boolean
}

export function RequiredLabel({ children, required = true}: RequiredLabelProps) {
  return (
    <FormLabel>
      {children} {required && <span className="text-red-500">*</span>}
    </FormLabel>
  )
}
