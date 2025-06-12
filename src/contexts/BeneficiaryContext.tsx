import { createContext, useContext, useState } from "react";

const BeneficiaryContext = createContext<{
  beneficiaryId: string | null;
  setBeneficiaryId: (id: string | null) => void;
}>({
  beneficiaryId: null,
  setBeneficiaryId: () => {},
});

export function BeneficiaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [beneficiaryId, setBeneficiaryId] = useState<string | null>(null);

  return (
    <BeneficiaryContext.Provider value={{ beneficiaryId, setBeneficiaryId }}>
      {children}
    </BeneficiaryContext.Provider>
  );
}

export function useBeneficiary() {
  return useContext(BeneficiaryContext);
}
