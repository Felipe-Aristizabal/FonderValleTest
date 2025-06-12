import { useState, useEffect } from "react";
import { formSchema } from "@/lib/form-schema";
// import axios from "axios";
import type { Visit } from "@/types/visit";

// === Modelo de Beneficiario ===
export interface Beneficiary {
  id: string;
  fullName: string;
  firstSurname: string;
  secondSurname: string;
  gender: string;
  dateOfBirth: string;
  educationalProfile: string;
  ethnicity: string;
  nationalId: string;
  phoneNumber: string;
  companyName: string;
  nit: string;
  economicSector: string;
  mainSector: string;
  city: string;
  address: string;
  approvedCreditValue: string;
  disbursementDate: string;
  creditDestination: string[];
  otherCreditDestination: string;
  evaluatorObservations: string;
  appState: string;
  visits: Visit[];
  source?: "api" | "json" | "local";
}

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY_BENEFICIARIES;

// === Hook para todos los beneficiarios ===
export function useBeneficiaries() {
  const [all, setAll] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      let apiData: Beneficiary[] = [];
      let localData: Beneficiary[] = [];

      // try {
      //   const resp = await axios.get<Beneficiary[]>("/api/beneficiaries");
      //   if (Array.isArray(resp.data)) {
      //     apiData = resp.data.map((b) => ({ ...b, source: "api" }));
      //   }
      // } catch (error) {
      //   console.error("Error fetching beneficiaries from API:", error);
      // }

      try {
        const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          localData = parsed.map((b) => ({ ...b, source: "local" }));
        }
      } catch (e) {
        console.error("Error parsing local beneficiaries:", e);
      }

      setAll([...apiData, ...localData]);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { all, loading };
}

// const validateField = (field: string, value: any): string | null => {
//   const fieldSchema = formSchema.shape[field as keyof typeof formSchema.shape];
//   if (!fieldSchema) return null;
//   const result = fieldSchema.safeParse(value);
//   return result.success ? null : result.error.errors[0].message;
// };
// === Hook para un beneficiario específico con edición ===
export function useBeneficiary(id: string | undefined) {
  const [userData, setUserData] = useState<Beneficiary | null>(null);
  const [source, setSource] = useState<"api" | "local" | "unknown">("unknown");
  const [loading, setLoading] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setLoading(true);

      // try {
      //   const res = await axios.get<Beneficiary>(`/api/beneficiaries/${id}`);
      //   if (res.data) {
      //     setUserData({ ...res.data, source: "api" });
      //     setSource("api");
      //     setLoading(false);
      //     return;
      //   }
      // } catch {
      //   console.warn("Fallo al obtener desde API, se intenta localStorage");
      // }

      try {
        const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
        const arr = JSON.parse(raw);
        const found = Array.isArray(arr)
          ? arr.find((b: any) => b.id === id)
          : null;
        if (found) {
          setUserData({ ...found, source: "local" });
          setSource("local");
        } else {
          setUserData(null);
          setSource("unknown");
        }
      } catch {
        setUserData(null);
        setSource("unknown");
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  const updateField = async (field: string, value: any) => {
    if (!userData) return;

    const fieldSchema =
      formSchema.shape[field as keyof typeof formSchema.shape];
    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);
      if (!result.success) {
        const message = result.error.errors[0]?.message || "Campo inválido";
        setValidationError(message); // dispara AlertDialog
        return;
      }
    }

    const updated = { ...userData, [field]: value };

    if (source === "api") {
      try {
        // await axios.patch(`/api/beneficiaries/${userData.id}`, { [field]: value });
        setUserData(updated);
        return;
      } catch (e) {
        console.error("Error al actualizar en API, fallback local:", e);
      }
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
      const arr = JSON.parse(raw);
      const index = arr.findIndex((b: any) => b.id === userData.id);
      if (index !== -1) {
        arr[index][field] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        setUserData(updated);
      }
    } catch (e) {
      console.error("Error al actualizar localStorage:", e);
    }
  };

  return {
    userData,
    updateField,
    loading,
    source,
    validationError,
    setValidationError,
  };
}
