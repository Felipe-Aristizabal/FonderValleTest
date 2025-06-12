export interface Visit {
  date: string; // ya convertido desde Date
  creditUsedAsApproved: string;
  creditUsageDescription: string;
  improvements: string[];
  otherImprovement?: string;
  timeToResults: string;
  resultsAsExpected: string;
  resultsExplanation?: string;
  financialRecords: string;
  creditEvidenceFiles?: File[];
  resourceManager: string;
  otherResourceManager?: string;
  paymentsOnSchedule: string;
  paymentExplanation?: string;
  satisfaction: string;
  needAnotherCredit: string;
  creditIntendedUse?: string;
  monthlyIncome: string;
  fixedCosts: string;
  variableCosts: string;
  debtLevel: string;
  creditUsedPercentage: string;
  monthlyPayment: string;
  emergencyReserve: string;
  monthlyClients: string;
  monthlySales: string;
  totalSalesValue: string;
  currentEmployees: string;
  salesChannels: string[];
  otherSalesChannel?: string;
  evidenceVisitFile?: File[];
}
