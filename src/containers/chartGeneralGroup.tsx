import { useEffect, useState } from "react";
import PieChartComponent from "@/components/pie-chart-component";
import BarChartComponent from "@/components/bar-chart-component";

interface ChartGeneralGroupProps {
  storageKey: string;
}

function getDistributionDataByField(
  storageKey: string,
  field: string
): { name: string; value: number }[] {
  const raw = localStorage.getItem(storageKey) ?? "[]";
  const data = JSON.parse(raw);

  const counter: Record<string, number> = {};

  const users = Array.isArray(data) ? data : [data];
  for (const user of users) {
    const visits = user.visits ?? [];
    const lastVisit = visits[visits.length - 1];

    if (
      lastVisit &&
      typeof lastVisit[field] === "string" &&
      lastVisit[field].trim() !== ""
    ) {
      const value = lastVisit[field];
      counter[value] = (counter[value] || 0) + 1;
    }
  }

  return Object.entries(counter).map(([name, value]) => ({ name, value }));
}

export function ChartGeneralGroup({ storageKey }: ChartGeneralGroupProps) {
  const [satisfactionData, setSatisfactionData] = useState<
    { name: string; value: number }[]
  >([]);
  const [paymentsData, setPaymentsData] = useState<
    { name: string; value: number }[]
  >([]);
  const [needCreditData, setNeedCreditData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    setSatisfactionData(getDistributionDataByField(storageKey, "satisfaction"));
    setPaymentsData(
      getDistributionDataByField(storageKey, "paymentsOnSchedule")
    );
    setNeedCreditData(
      getDistributionDataByField(storageKey, "needAnotherCredit")
    );
  }, [storageKey]);

  return (
    <div className="w-full h-full flex-1 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg">
      <PieChartComponent
        title="Nivel de Satisfacción"
        data={satisfactionData}
      />
      <PieChartComponent title="Pagos al Día" data={paymentsData} />
      <PieChartComponent
        title="¿Necesita Otro Crédito?"
        data={needCreditData}
      />
      <BarChartComponent
        title="Distribución de Satisfacción"
        data={satisfactionData}
      />
    </div>
  );
}
