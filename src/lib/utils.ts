import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatThousands(value: string | number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatMoney(value?: string): string {
  return value ? `$${Number(value).toLocaleString("es-CO")}` : "—";
}

function addWorksheetFromJson(
  wb: ExcelJS.Workbook,
  sheetName: string,
  rows: Record<string, any>[]
) {
  const ws = wb.addWorksheet(sheetName);
  if (rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  ws.addRow(headers);

  rows.forEach((r) => {
    const row = headers.map((h) => r[h] ?? "");
    ws.addRow(row);
  });

  headers.forEach((_, idx) => {
    ws.getColumn(idx + 1).width = 20;
  });
}

export async function exportToExcel(
  sheets: { name: string; rows: Record<string, any>[] }[],
  fileName: string
) {
  const wb = new ExcelJS.Workbook();

  wb.creator = "Mi App";
  wb.created = new Date();

  sheets.forEach(({ name, rows }) => {
    addWorksheetFromJson(wb, name, rows);
  });

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
}
