import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import type { User } from "@/models/user";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export function UserDetailsDialog({ user, open, onClose }: Props) {
  if (!user) return null;
  const navigate = useNavigate();

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialogContent className="sm:max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Información del Usuario</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                ["Nombres", user.nombres],
                ["Apellidos", user.apellidos],
                ["Documento", user.documento],
                ["Correo", user.email],
                ["Celular", user.celular],
                ["Rol", user.rol],
                ["Estado", user.estado],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-slate-200">
                  <td className="py-2 pr-4 font-semibold text-slate-600">
                    {label}:
                  </td>
                  <td className="py-2 text-slate-800">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertDialogFooter className="mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(`/usuario-editar/${user.id}`)}
          >
            Editar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
