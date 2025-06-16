import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FormSection } from "@/components/ui/form-section";
import { FormRow } from "@/components/ui/form-row";
import { RequiredLabel } from "@/components/ui/required-label";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { formatThousands } from "@/lib/utils";
import type { FormValues } from "@/lib/form-schema";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";

interface CreditInformationProps {
  form: UseFormReturn<FormValues>;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CreditInformation({
  form,
  isExpanded,
  onToggle,
}: CreditInformationProps) {
  return (
    <FormSection
      title="3. Información del crédito"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-12">
        <FormRow>
          <FormField
            control={form.control}
            name="approvedCreditValue"
            render={({ field }) => (
              <FormItem id="approvedCreditValue-field">
                <RequiredLabel>Valor aprobado del crédito</RequiredLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    placeholder="Ingrese el valor del crédito aprobado"
                    value={field.value ? formatThousands(field.value) : ""}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      field.onChange(raw);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="disbursementDate"
            render={({ field }) => (
              <FormItem className="flex flex-col" id="disbursementDate-field">
                <DatePicker
                  label="Fecha de desembolso"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormRow>
        <FormRow>
          <FormField<FormValues, "creditDestination">
            control={form.control}
            name="creditDestination"
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormValues, "creditDestination">;
            }) => (
              <FormItem id="creditDestination-field">
                <RequiredLabel>
                  ¿Cuál será el destino del crédito?
                </RequiredLabel>
                <div className="space-y-2">
                  {[
                    "Capital de Trabajo",
                    "Activos Fijos",
                    "Deuda Legal",
                    "Deuda Ilegal",
                    "Otros",
                  ].map((opt) => {
                    const checked = field.value.includes(opt);
                    return (
                      <FormItem
                        key={opt}
                        className="flex items-center gap-2"
                        id="creditDestination-field"
                      >
                        <FormControl>
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(c) => {
                              const next = c
                                ? [...field.value, opt]
                                : field.value.filter((v) => v !== opt);
                              field.onChange(next);
                            }}
                          />
                        </FormControl>
                        <FormLabel>{opt}</FormLabel>
                      </FormItem>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("creditDestination")?.includes("Otros") && (
            <FormField<FormValues, "otherCreditDestination">
              control={form.control}
              name="otherCreditDestination"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  FormValues,
                  "otherCreditDestination"
                >;
              }) => (
                <FormItem id="otherCreditDestination-field">
                  <RequiredLabel required={false}>Otro destino</RequiredLabel>
                  <FormControl>
                    <Input placeholder="Especifique otro destino" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </FormRow>
      </div>
    </FormSection>
  );
}
