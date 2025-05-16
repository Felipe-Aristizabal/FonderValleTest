import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FormSectionProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: ReactNode
}

export function FormSection({ title, isExpanded, onToggle, children }: FormSectionProps) {
  return (
    <Card>
      <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 rounded-t-lg" onClick={onToggle}>
        <h2 className="text-xl font-semibold pl-10">{title}</h2>
        <Button type="button" variant= "ghost" size="sm">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>

      {isExpanded && <CardContent className="space-y-8 pt-6">{children}</CardContent>}
    </Card>
  )
}
