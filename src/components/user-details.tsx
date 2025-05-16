import { useEffect, useState } from "react"
import { UserDataTable } from "@/components/user-data-table"
import { UserVisitsTable } from "@/components/user-visits-table"
import { ChartGroup } from "@/containers/chart-group"

export interface ExportItem {
  userId: string
  campo: string
  valor: string | number | boolean | null
}

const sectionedFieldLabels: Record<string, Record<string, string>> = 
{
  "Información Personal": {
    fullName: "Nombre",
    firstSurname: "Primer Apellido",
    secondSurname: "Segundo Apellido",
    gender: "Género",
    dateOfBirth: "Fecha de Nacimiento",
    educationalProfile: "Nivel Educativo",
    ethnicity: "Étnia",
    nationalId: "Cédula",
    phoneNumber: "Teléfono / Celular",
  },
  "Información de la Empresa": {
    companyName: "Nombre de la Empresa",
    nit: "RUT",
    economicSector: "Nivel del Sector económico",
    mainSector: "Actividad económica",
    city: "Ciudad",
    address: "Dirección de la empresa",
  },
  "Información del Crédito": {
    approvedCreditValue: "Valor aprobado del crédito",
    disbursementDate: "Fecha de desembolso",
  },
  "Observaciones del Evaluador": {
    evaluatorObservations: "Observaciones del evaluador",
  },
}

type FormValues = Record<string, any>

export interface UserDetailsExport {
  storageKey?: string
  userId: string
  onExportData?: (data: ExportItem[]) => void
}

export function UserDetails({
  storageKey = "fallbackKey",
  userId,
  onExportData,
}: UserDetailsExport) {
  const [userData, setUserData] = useState<FormValues | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey) ?? "[]"
      const arr = JSON.parse(raw)
      const found = Array.isArray(arr) ? arr.find((e: any) => e.id === userId) : null
      setUserData(found ?? null)
    } catch {
      setUserData(null)
    }
  }, [storageKey, userId])

  const visits = Array.isArray(userData?.visits) ? userData.visits : []

  useEffect(() => {
    if (!userData || !onExportData) return

    const exportItems: ExportItem[] = []

    Object.entries(userData).forEach(([key, val]) => {
      if (key === "visits" || key === "id") return
      exportItems.push({
        userId,
        campo: key,
        valor: val as any,
      })
    })

    visits.forEach((vis: any, idx: number) => {
      Object.entries(vis).forEach(([visitKey, visitVal]) => {
        exportItems.push({
          userId,
          campo: `visits[${idx}].${visitKey}`,
          valor: visitVal as any,
        })
      })
    })

    onExportData(exportItems)
  }, [userData, visits, onExportData])

  if (!userData) {
    return <p className="text-center py-4 text-red-500">Usuario no encontrado.</p>
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="text-center border-b pb-4">
        <h2 className="text-3xl font-bold">
          Detalle de {userData.fullName}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="md:col-span-4 bg-white rounded-lg shadow-md p-6 space-y-6">
          {Object.entries(sectionedFieldLabels).map(([sectionTitle, fieldsMap]) => (
          <UserDataTable
            key={sectionTitle}
            sectionTitle={sectionTitle}
            fields={fieldsMap}
            userData={userData}
          />
        ))}
        </div>

        <div className="bg-white rounded-lg md:col-span-2 shadow-md p-6 space-y-8">
          <UserVisitsTable userId={userId} visits={visits} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ChartGroup visits={visits} />
      </div>
    </div>
  )
}