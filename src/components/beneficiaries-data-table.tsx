import * as React from "react";
import { formatMoney, formatDate } from "@/lib/utils";
import { valueTranslations } from "@/constants/valueTranslations";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export interface ExportItem {
  userId: string;
  campo: string;
  valor: string | number | boolean | null;
}

interface UserDataTableProps {
  sectionTitle: string;
  fields: Record<string, string>;
  userData: Record<string, any>;
}

export function BeneficiariesDataTable({
  sectionTitle,
  fields,
  userData,
}: UserDataTableProps) {
  const translateValue = (key: string, value: any): string => {
    const dict = valueTranslations[key];
    if (dict && typeof value === "string") return dict[value] || value;
    return value;
  };

  return (
    <div className="space-y-2">
      {sectionTitle && (
        <h3 className="text-xl font-semibold text-gray-800">{sectionTitle}</h3>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <Table className="w-full text-sm text-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-4 py-2 font-semibold">Campo</TableHead>
              <TableHead className="px-4 py-2 font-semibold">Valor</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(fields).map(([fieldKey, label]) => {
              const rawValue = userData[fieldKey];
              const isDateField = ["dateOfBirth", "disbursementDate"].includes(
                fieldKey
              );

              let display: React.ReactNode;

              if (["approvedCreditValue", "dinerosolicitado"].includes(fieldKey)) {
                display = formatMoney(rawValue as string);
              } else if (Array.isArray(rawValue)) {
                const translatedItems = rawValue.map(
                  (item) => valueTranslations[fieldKey]?.[item] || item
                );
                display = (
                  <ul className="list-disc list-inside space-y-1">
                    {translatedItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                );
              } else if (rawValue && typeof rawValue === "object") {
                display = JSON.stringify(rawValue);
              } else if (
                rawValue !== undefined &&
                rawValue !== null &&
                String(rawValue).trim() !== ""
              ) {
                const translated = translateValue(fieldKey, rawValue);
                display = isDateField ? formatDate(translated) : translated;
              } else {
                display = (
                  <span className="text-red-600 font-medium">⚠️ —</span>
                );
              }

              return (
                <TableRow key={fieldKey} className="hover:bg-gray-50">
                  <TableCell className="px-4 py-2 font-medium text-gray-900">
                    {label}
                  </TableCell>
                  <TableCell className="px-4 py-2">{display}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
