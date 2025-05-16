import { useFormContext } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { formatThousands } from "@/lib/utils";
import type { VisitValues } from "@/lib/form-schema";

interface CommercialDiagnosisProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CommercialDiagnosis({
  isExpanded,
  onToggle,
}: CommercialDiagnosisProps) {
  const { control, watch } = useFormContext<VisitValues>();

  const salesChannels = watch("salesChannels") as string[];

  return (
    <FormSection
      title="3. Diagnóstico comercial"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <FormRow>
        <FormField
          control={control}
          name={`monthlyClients`}
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Número de clientes mensuales</RequiredLabel>
              <FormControl>
                <Input type="number" placeholder="Ej. 20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`monthlySales`}
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Número de ventas mensuales</RequiredLabel>
              <FormControl>
                <Input type="number" placeholder="Ej. 45" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>

      <FormRow>
        <FormField
          control={control}
          name={`totalSalesValue`}
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>
                Valor de las ventas actuales por mes
              </RequiredLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder="Ej $500.000"
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
      </FormRow>
      <FormRow>
        <FormField
          control={control}
          name={`currentEmployees`}
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Número de empleados actuales</RequiredLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-2"
                >
                  {["De 1 a 5", "De 5 a 10", "De 10 a 15"].map((v) => (
                    <FormItem key={v} className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={v} />
                      </FormControl>
                      <FormLabel>{v}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>
      <FormRow>
        <FormField<VisitValues, "salesChannels">
          control={control}
          name="salesChannels"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Canales de venta</RequiredLabel>
              <div className="space-y-2">
                {[
                  "Tienda física",
                  "Venta por catálogo",
                  "Redes sociales",
                  "Tienda en línea / e-commerce",
                  "Plataformas de terceros (MercadoLibre, etc.)",
                  "Otros",
                ].map((opt) => {
                  const checked = field.value.includes(opt);
                  return (
                    <FormItem key={opt} className="flex items-center gap-2">
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
        {salesChannels.includes("Otros") && (
          <FormField<VisitValues, "otherSalesChannel">
            control={control}
            name="otherSalesChannel"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required={false}>Otro canal</RequiredLabel>
                <FormControl>
                  <Input placeholder="Describe otro canal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </FormRow>
    </FormSection>
  );
}
