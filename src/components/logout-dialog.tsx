import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";

interface LogoutDialogProps {
  open: boolean;
  onCancel: () => void;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void; // ✅ nueva prop opcional
}

export function LogoutDialog({
  open,
  onCancel,
  onOpenChange,
  onConfirm,
}: LogoutDialogProps) {
  const { logout } = useAuth();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      logout();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas cerrar sesión?</AlertDialogTitle>
          <AlertDialogDescription>
            Esto cerrará tu sesión actual y te llevará a la pantalla de inicio
            de sesión.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Sí, cerrar sesión
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
