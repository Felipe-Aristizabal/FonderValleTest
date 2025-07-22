import { useState, useEffect } from "react";
import { formSchema } from "@/lib/schemas/form-schema";
import type { Beneficiary } from "@/models/beneficiary";
import axios from "@/lib/axios";

// === Hook para todos los beneficiarios ===
export function useBeneficiaries() {
  const [all, setAll] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const resp = await axios.get<Beneficiary[]>("/beneficiarios");
        if (Array.isArray(resp.data)) {
          setAll(resp.data);
        } else {
          setAll([]);
        }
      } catch (error) {
        console.error("Error fetching beneficiaries from API:", error);
        setAll([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { all, loading };
}

// === Hook para un beneficiario específico con edición ===
export function useBeneficiary(id: string | undefined) {
  const [userData, setUserData] = useState<Beneficiary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      try {
        const res = await axios.get<Beneficiary>(`/beneficiarios/${id}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching beneficiary:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const updateField = async (field: string, value: any) => {
    if (!userData) return;

    // Validación con Zod
    const fieldSchema =
      formSchema.shape[field as keyof typeof formSchema.shape];
    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);
      if (!result.success) {
        setValidationError(result.error.errors[0]?.message || "Campo inválido");
        return;
      }
    }

    const updated = { ...userData, [field]: value };
    setUserData(updated);

    // Opcional: enviar patch al servidor
    try {
      await axios.patch(`/beneficiarios/${userData.idsolicitud}`, {
        [field]: value,
      });
    } catch (e) {
      console.error("Error updating beneficiary:", e);
    }
  };

  return {
    userData,
    updateField,
    loading,
    validationError,
    setValidationError,
  };
}
