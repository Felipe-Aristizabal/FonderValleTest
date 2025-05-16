"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  label?: string
  required?: boolean
  value?: Date
  onChange?: (date: Date | undefined) => void
}

export function DatePicker({ label = "Fecha de Nacimiento", required = true, value, onChange }: DatePickerProps) {
  const [month, setMonth] = React.useState<number>((value ?? new Date()).getMonth())
  const [year, setYear] = React.useState<number>((value ?? new Date()).getFullYear())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ]

  const handleMonthChange = (value: string) => {
    const monthIndex = months.findIndex((m) => m === value)
    setMonth(monthIndex)
  }

  const handleYearChange = (value: string) => {
    setYear(Number.parseInt(value))
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="dob" className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="dob"
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "d 'de' MMMM, yyyy", { locale: es }) : "Seleccionar fecha"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b flex justify-between items-center">
            <Select value={months[month]} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Mes" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={year.toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            month={new Date(year, month)}
            onMonthChange={(newDate) => {
              setMonth(newDate.getMonth())
              setYear(newDate.getFullYear())
            }}
            locale={es}
            disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
