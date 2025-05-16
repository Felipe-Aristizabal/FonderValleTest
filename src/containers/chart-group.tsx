import BarChartComponent from "@/components/bar-chart-component"
import PieChartComponent from "@/components/pie-chart-component"
import { formatDate } from "@/lib/utils"

interface Visit {
  date: string
  monthlyIncome?: string
  fixedCosts?: string
  variableCosts?: string
  monthlyPayment?: string
  emergencyReserve?: string
  totalSalesValue?: string
  averageSalePrice?: string
  monthlyClients?: string
  monthlySales?: string
  salesChannels?: string[]
}

interface ChartGroupProps {
  visits: Visit[]
}

export function ChartGroup({ visits }: ChartGroupProps) {
  if (!visits || visits.length === 0) return null

  const mapMetric = (key: keyof Visit) =>
    visits.map((v) => ({
      name: formatDate(v.date),
      value: Number(v[key] ?? 0),
    }))

  return (
    <div className="space-y-10 mt-12">
      {/* Financial Diagnosis */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Diagnóstico Financiero</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <BarChartComponent
            data={mapMetric("monthlyIncome")}
            title="Ingresos mensuales"
          />
          <BarChartComponent
            data={mapMetric("fixedCosts")}
            title="Costos fijos"
          />
          <BarChartComponent
            data={mapMetric("variableCosts")}
            title="Costos variables"
          />
          <BarChartComponent
            data={mapMetric("monthlyPayment")}
            title="Pago mensual del crédito"
          />
          <BarChartComponent
            data={mapMetric("emergencyReserve")}
            title="Reserva para imprevistos"
          />
        </div>
      </section>

      {/* Comercial Diagnosis */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Diagnóstico Comercial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <BarChartComponent
            data={mapMetric("monthlySales")}
            title="Ventas mensuales"
          />
          <PieChartComponent 
            data={mapMetric("monthlyClients")} 
            title="Clientes mensuales" 
          />
          <PieChartComponent 
            data={mapMetric("totalSalesValue")} 
            title="Valor total de ventas" 
          />
          <BarChartComponent
            data={mapMetric("averageSalePrice")}
            title="Precio promedio de venta"
          />
        </div>
      </section>
    </div>
  )
}
