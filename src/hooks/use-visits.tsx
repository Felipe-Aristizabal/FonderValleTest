import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import type { VisitValues } from "@/lib/schemas/visit-schema";

export function useVisits(beneficiaryId?: number) {
  const [all, setAll] = useState<VisitValues[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!beneficiaryId) return;

    const fetch = async () => {
      try {
        const res = await axios.get<VisitValues[]>(
          `/advices/getByBeneficiary/${beneficiaryId}`
        );
        setAll(res.data);
      } catch (err) {
        console.error("Error fetching visits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [beneficiaryId]);

  const createVisit = async (data: VisitValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof FileList) {
        Array.from(value).forEach((file) => formData.append(key, file));
      } else {
        if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      }
    });

    // for (const [key, val] of formData.entries()) {
    //   console.log(`${key}:`, val);
    // }

    try {
      const res = await axios.post("/advices", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAll((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Error creating visit:", err);
      throw err;
    }
  };

  return { all, loading, createVisit };
}
