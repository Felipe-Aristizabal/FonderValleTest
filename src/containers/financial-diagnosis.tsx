import { useFormContext } from "react-hook-form";
import type { ControllerRenderProps } from "react-hook-form";

import { FormSection } from "@/components/ui/form-section";
import { FormRow } from "@/components/ui/form-row";
import { RequiredLabel } from "@/components/ui/required-label";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { VisitValues } from "@/lib/form-schema";
import { formatThousands } from "@/lib/utils";

interface FinancialDiagnosisProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function FinancialDiagnosis({
  isExpanded,
  onToggle,
}: FinancialDiagnosisProps) {
  const { control } = useFormContext<VisitValues>();

  return (
    <FormSection
      title="2. Diagnóstico financiero"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <FormRow>
        <FormField
          control={control}
          name="monthlyIncome"
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "monthlyIncome">;
          }) => (
            <FormItem>
              <RequiredLabel>Ingresos mensuales</RequiredLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder="Ej $5.000.000"
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
          control={control}
          name={`fixedCosts`}
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "fixedCosts">;
          }) => (
            <FormItem>
              <RequiredLabel>Costos fijos mensuales</RequiredLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder="Ej $2.000.000"
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
          name={`variableCosts`}
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "variableCosts">;
          }) => (
            <FormItem>
              <RequiredLabel>Costos variables mensuales</RequiredLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder="Ej $1.500.000"
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
          control={control}
          name={`debtLevel`}
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "debtLevel">;
          }) => (
            <FormItem>
              <RequiredLabel>Nivel de endeudamiento (%)</RequiredLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step="0.01"
                  placeholder="Ej. 25"
                  {...field}
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
          name={`creditUsedPercentage`}
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "creditUsedPercentage">;
          }) => (
            <FormItem>
              <RequiredLabel>Monto del crédito utilizado (%)</RequiredLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step="0.01"
                  placeholder="Ej. 100"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`monthlyPayment`}
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "monthlyPayment">;
          }) => (
            <FormItem>
              <RequiredLabel>Pago mensual del crédito</RequiredLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder="Ej $800.000"
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
          name={`emergencyReserve`}
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "emergencyReserve">;
          }) => (
            <FormItem>
              <RequiredLabel>Cantidad reservada para imprevistos</RequiredLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder="Ej $1.000.000"
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
    </FormSection>
  );
}
