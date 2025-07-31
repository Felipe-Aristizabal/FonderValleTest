import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idbeneficiario: number;
  onSuccess: () => Promise<void>;
}

export function SmsVerificationDialog({
  open,
  onOpenChange,
  idbeneficiario,
  onSuccess,
}: Props) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleValidate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/advices/validate-sms-advice", {
        idbeneficiario,
        codigo: code,
      });

      if (response.data === true || response.data === "Código válido") {
        console.log("Código válido. Procediendo a guardar...");
        setLoading(false);
        setSubmitting(true);

        try {
          await onSuccess();
          onOpenChange(false);
          navigate(`/beneficiario-detalles/${idbeneficiario}`);
        } catch (saveError) {
          console.error("Error al guardar la visita:", saveError);
          setError("Hubo un error al guardar la visita.");
        }

        setSubmitting(false);
      } else {
        console.warn("Código inválido. Backend respondió:", response.data);
        setError("Código incorrecto. Intente de nuevo.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error validando código:", err);
      setError("Error al validar el código.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verificación por SMS</DialogTitle>
          <DialogDescription>
            Ingrese el código que fue enviado al celular del beneficiario.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Código de 4 dígitos"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {submitting && (
          <p className="text-sm text-gray-600">Guardando visita...</p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading || submitting}
          >
            Cancelar
          </Button>
          <Button onClick={handleValidate} disabled={loading || submitting}>
            {loading ? "Verificando..." : "Verificar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
