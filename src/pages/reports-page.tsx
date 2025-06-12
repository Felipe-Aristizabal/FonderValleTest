import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

export default function ReportsPage() {
  return (
    <div className="w-full px-4 py-8 space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Reportes</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <Select>
              <SelectTrigger className="w-full sm:w-[300px]">
                <SelectValue placeholder="Seleccione el reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved-amount">
                  Créditos Aprobados x Monto
                </SelectItem>
              </SelectContent>
            </Select>
            <Button>Seleccionar</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione Rango" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">0-5M</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Estado del Crédito" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aprobado">Aprobado</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Destino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="educativo">Educativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatePicker label="Fecha inicio" />
            <DatePicker label="Fecha fin" />
          </div>

          <Button className="mt-2 w-fit">Buscar</Button>
        </CardContent>
      </Card>

      {/* Div de 2 columnas para que organices los resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">Componente 1</div>
        <div className="bg-white rounded shadow p-4">Componente 2</div>
      </div>
    </div>
  );
}
