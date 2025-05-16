import type { ReactNode } from "react"

interface FormRowProps {
  children: ReactNode
  className?: string
}

export function FormRow({ children, className = "" }: FormRowProps) {
  return <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>{children}</div>
}
