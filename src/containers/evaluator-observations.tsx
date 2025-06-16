import type { UseFormReturn } from "react-hook-form"

import { FormSection } from "@/components/ui/form-section"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import type { FormValues } from "@/lib/form-schema"
import { RequiredLabel } from "@/components/ui/required-label"

interface EvaluatorObservationsProps {
  form: UseFormReturn<FormValues>
  isExpanded: boolean
  onToggle: () => void
}

export default function EvaluatorObservations({
  form,
  isExpanded,
  onToggle,
}: EvaluatorObservationsProps) {
  return (
    <FormSection title="4. Observaciones del evaluador" isExpanded={isExpanded} onToggle={onToggle}>
      <FormField
        control={form.control}
        name="evaluatorObservations"
        render={({ field }) => (
          <FormItem id="evaluatorObservations-field">
            <RequiredLabel>Observaciones</RequiredLabel>
            <FormControl>
              <Textarea placeholder="Ingrese las observaciones" className="resize-none min-h-[150px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  )
}
