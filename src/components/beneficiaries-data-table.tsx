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
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface ExportItem {
  userId: string;
  campo: string;
  valor: string | number | boolean | null;
}

interface UserDataTableProps {
  sectionTitle: string;
  fields: Record<string, string>;
  userData: Record<string, any>;
  showActions?: boolean;
  editValue: string;
  setEditValue: React.Dispatch<React.SetStateAction<string>>;
  onActionClick?: (fieldKey: string, newValue: any) => void;
}

export function BeneficiariesDataTable({
  sectionTitle,
  fields,
  userData,
  showActions = false,
  editValue,
  setEditValue,
  onActionClick,
}: UserDataTableProps) {
  const [editingKey, setEditingKey] = React.useState<string | null>(null);

  const translateValue = (key: string, value: any): string => {
    const dict = valueTranslations[key];
    if (dict && typeof value === "string") return dict[value] || value;
    return value;
  };

  const handleEditClick = (key: string) => {
    const current = userData[key];
    setEditingKey(key);
    setEditValue(current ?? "");
  };

  const handleConfirm = () => {
    if (editingKey && onActionClick) {
      onActionClick(editingKey, editValue === "" ? null : editValue);
    }
    setEditingKey(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const handleDelete = (key: string) => {
    if (onActionClick) onActionClick(key, null);
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
              {showActions && (
                <TableHead className="px-4 py-2 font-semibold">
                  Acciones
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(fields).map(([fieldKey, label]) => {
              const rawValue = userData[fieldKey];
              const isDateField = ["dateOfBirth", "disbursementDate"].includes(
                fieldKey
              );
              const isEditing = editingKey === fieldKey;

              let display: React.ReactNode;

              if (isEditing) {
                display = (
                  <div className="flex items-center gap-2">
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border rounded px-2 py-1 text-sm w-2/4"
                      placeholder="Vacío..."
                    />
                    <button
                      onClick={handleConfirm}
                      className="text-green-600 font-bold text-2xl px-1"
                    >
                      ✔
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-500 font-bold text-2xl px-1"
                    >
                      ✖
                    </button>
                  </div>
                );
              } else if (fieldKey === "approvedCreditValue") {
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
                  {showActions && (
                    <TableCell className="px-4 py-2 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border rounded-full hover:bg-gray-100"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          <DropdownMenuItem
                            onClick={() => handleEditClick(fieldKey)}
                            className="text-sm cursor-pointer"
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(fieldKey)}
                            className="text-sm text-red-600 cursor-pointer"
                          >
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
