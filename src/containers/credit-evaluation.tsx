import { useFormContext } from "react-hook-form";
import { FormSection } from "@/components/ui/form-section";
import { RequiredLabel } from "@/components/ui/required-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { ControllerRenderProps } from "react-hook-form";
import type { VisitValues } from "@/lib/form-schema";
import { Upload } from "lucide-react";

interface CreditEvaluationProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CreditEvaluation({
  isExpanded,
  onToggle,
}: CreditEvaluationProps) {
  const { control, watch } = useFormContext<VisitValues>();

  const improvements = watch("improvements") ?? [];
  const resultsAsExpected = watch("resultsAsExpected") ?? "";
  const financialRecords = watch("financialRecords") ?? "";

  return (
    <FormSection
      title="1. Evaluación del crédito"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <FormField<VisitValues, "creditUsedAsApproved">
        control={control}
        name="creditUsedAsApproved"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "creditUsedAsApproved">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿El crédito fue utilizado conforme el destino aprobado?
            </RequiredLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {["Sí", "No", "Parcialmente"].map((v) => (
                  <FormItem key={v} className="flex items-center gap-2">
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

      <FormField<VisitValues, "creditUsageDescription">
        control={control}
        name="creditUsageDescription"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "creditUsageDescription">;
        }) => (
          <FormItem>
            <RequiredLabel>
              Describa en qué fue utilizado el crédito
            </RequiredLabel>
            <FormControl>
              <Textarea
                placeholder="Explique brevemente"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField<VisitValues, "improvements">
        control={control}
        name="improvements"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "improvements">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿Qué mejoras se lograron con el crédito?
            </RequiredLabel>
            <div className="space-y-2">
              {[
                "Aumento de ingresos",
                "Adquisición de activos",
                "Mejora en infraestructura",
                "Capital de trabajo",
                "Generación de empleo",
                "Otras",
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
      {improvements?.includes("Otras") && (
        <FormField<VisitValues, "otherImprovement">
          control={control}
          name="otherImprovement"
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "otherImprovement">;
          }) => (
            <FormItem>
              <RequiredLabel required={false}>Otra mejora</RequiredLabel>
              <FormControl>
                <Input placeholder="Describe otra mejora" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField<VisitValues, "timeToResults">
        control={control}
        name="timeToResults"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "timeToResults">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿Cuánto tiempo después del desembolso se evidenciaron resultados?
            </RequiredLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {[
                  "1 mes",
                  "Entre 1 y 6 meses",
                  "Más de 6 meses",
                  "Todavía no se ha evidenciado",
                ].map((v) => (
                  <FormItem key={v} className="flex items-center gap-2">
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

      <FormField<VisitValues, "resultsAsExpected">
        control={control}
        name="resultsAsExpected"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "resultsAsExpected">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿Los resultados alcanzados fueron los esperados?
            </RequiredLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {[
                  "Sí",
                  "No",
                  "Parcialmente",
                  "Todavía no se ha evidenciado",
                ].map((v) => (
                  <FormItem key={v} className="flex items-center gap-2">
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
      {(resultsAsExpected === "No" || resultsAsExpected === "Parcialmente") && (
        <FormField<VisitValues, "resultsExplanation">
          control={control}
          name="resultsExplanation"
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "resultsExplanation">;
          }) => (
            <FormItem>
              <RequiredLabel required={false}>
                Explicación de resultados
              </RequiredLabel>
              <FormControl>
                <Input placeholder="Comenta brevemente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField<VisitValues, "financialRecords">
        control={control}
        name="financialRecords"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "financialRecords">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿Lleva registros contables o de uso del dinero?
            </RequiredLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="Sí" />
                  </FormControl>
                  <FormLabel>Sí</FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="No" />
                  </FormControl>
                  <FormLabel>No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {financialRecords === "Sí" && (
        <FormField<VisitValues, "creditEvidenceFiles">
          control={control}
          name="creditEvidenceFiles"
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "creditEvidenceFiles">;
          }) => (
            <FormItem>
              <RequiredLabel required={false}>
                Suba los archivos de evidencia
              </RequiredLabel>
              <FormControl>
                <div className="flex flex-col w-full gap-2">
                  <label
                    htmlFor="credit-evidence-files"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Haz clic para subir archivos
                        </span>{" "}
                        o arrastra y suelta
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, XLS, JPG o PNG (máx. 5MB por archivo)
                      </p>
                    </div>
                    <input
                      id="credit-evidence-files"
                      type="file"
                      accept=".pdf,.doc,.xls,.jpg,.jpeg,.png"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        field.onChange(files);
                      }}
                    />
                  </label>

                  {field.value && field.value.length > 0 && (
                    <ul className="text-sm text-gray-600 list-disc pl-4">
                      {field.value.map((file: File, idx: number) => (
                        <li key={idx} className="truncate">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField<VisitValues, "resourceManager">
        control={control}
        name="resourceManager"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "resourceManager">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿Quién administra los recursos del crédito?
            </RequiredLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="El beneficiario" />
                  </FormControl>
                  <FormLabel>El beneficiario</FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="Otro" />
                  </FormControl>
                  <FormLabel>Otro</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {watch("resourceManager") === "Otro" && (
        <FormField<VisitValues, "otherResourceManager">
          control={control}
          name="otherResourceManager"
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "otherResourceManager">;
          }) => (
            <FormItem>
              <RequiredLabel required={false}>Especifique</RequiredLabel>
              <FormControl>
                <Input
                  placeholder="¿Quién administra los recursos?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField<VisitValues, "paymentsOnSchedule">
        control={control}
        name="paymentsOnSchedule"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "paymentsOnSchedule">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿Se han cumplido los pagos según lo establecido en el cronograma?
            </RequiredLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {["Sí", "No", "Parcialmente"].map((v) => (
                  <FormItem key={v} className="flex items-center gap-2">
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
      {(watch("paymentsOnSchedule") === "No" ||
        watch("paymentsOnSchedule") === "Parcialmente") && (
        <FormField<VisitValues, "paymentExplanation">
          control={control}
          name="paymentExplanation"
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "paymentExplanation">;
          }) => (
            <FormItem>
              <RequiredLabel required={false}>Explicación</RequiredLabel>
              <FormControl>
                <Textarea
                  placeholder="Explique por qué no se ha cumplido el cronograma"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField<VisitValues, "satisfaction">
        control={control}
        name="satisfaction"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "satisfaction">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿Está satisfecho con el crédito recibido?
            </RequiredLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {[
                  "Muy satisfecho",
                  "Satisfecho",
                  "Poco satisfecho",
                  "Insatisfecho",
                ].map((v) => (
                  <FormItem key={v} className="flex items-center gap-2">
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

      <FormField<VisitValues, "needAnotherCredit">
        control={control}
        name="needAnotherCredit"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "needAnotherCredit">;
        }) => (
          <FormItem>
            <RequiredLabel>
              ¿Necesita otro crédito para fortalecer su proyecto?
            </RequiredLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {["Sí", "No", "Tal vez"].map((v) => (
                  <FormItem key={v} className="flex items-center gap-2">
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
      {watch("needAnotherCredit") === "Sí" && (
        <FormField<VisitValues, "creditIntendedUse">
          control={control}
          name="creditIntendedUse"
          render={({
            field,
          }: {
            field: ControllerRenderProps<VisitValues, "creditIntendedUse">;
          }) => (
            <FormItem>
              <RequiredLabel required={false}>Uso previsto</RequiredLabel>
              <FormControl>
                <Textarea
                  placeholder="Describa el uso del próximo crédito"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </FormSection>
  );
}
