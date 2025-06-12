"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface PieChartData {
  name: string
  value: number
}

interface PieChartComponentProps {
  data: PieChartData[]
  title: string
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

export default function PieChartComponent({ data, title }: PieChartComponentProps) {
  return (
    <Card className="h-full rounded-lg border-gray-200 shadow-sm">
      <CardHeader className=" border-b border-blue-200 px-4 py-2">
  <CardTitle className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
    {title}
  </CardTitle>
</CardHeader>

      <CardContent className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
        <div className="w-full sm:w-1/2 aspect-square min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 sm:mt-0 flex-1 space-y-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-800">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span>{entry.name}: {entry.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
