// src/containers/visit-evidence.tsx

import { useFormContext } from "react-hook-form";
import type { ControllerRenderProps } from "react-hook-form";
import { Upload } from "lucide-react";

import { FormSection } from "@/components/ui/form-section";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RequiredLabel } from "@/components/ui/required-label";
import type { VisitValues } from "@/lib/schemas/visit-schema";

interface VisitEvidenceProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function VisitEvidence({
  isExpanded,
  onToggle,
}: VisitEvidenceProps) {
  const { control } = useFormContext<VisitValues>();

  return (
    <FormSection
      title="4. Evidencias de la asesoría"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <FormField
        control={control}
        name="fileevidenceFile"
        render={({
          field,
        }: {
          field: ControllerRenderProps<VisitValues, "fileevidenceFile">;
        }) => (
          <FormItem id="evidenceVisitFile-field">
            <RequiredLabel required={false}>
              Suba los archivos de evidencia
            </RequiredLabel>
            <FormControl>
              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="evidence-visit-file"
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
                    id="evidence-visit-file"
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
    </FormSection>
  );
}
