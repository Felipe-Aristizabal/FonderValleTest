import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import UserCreationForm from "@/containers/user-creation-form"; // Asegúrate de crear este archivo
import { userSchema, type UserFormValues } from "@/lib/form-schema";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY_USERS ?? "usersData";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      firstSurname: "",
      secondSurname: "",
      nationalId: "",
      phoneNumber: "",
      role: "",
    },
  });

  const submitUser = async () => {
    console.log("Valores del formulario:", form.getValues());
    const isValid = await form.trigger();
    console.log("¿Formulario válido?:", isValid);

    if (!isValid) {
      const e = form.formState.errors;
      console.log("Errores de validación:", e);

      // setExpandedSections(prev => ({
      //   ...prev,
      //   personal: prev.personal || !!(e.fullName || e.firstSurname || e.nationalId),
      // }));

      return;
    }

    const entry = {
      id: uuidv4(),
      ...form.getValues(),
      appState: "Activo",
    };

    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    prev.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));

    form.reset();
    setDialogOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <FormProvider {...form}>
        <form className="space-y-8">
          <div className="space-y-6 border-t pt-6 mt-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Crear Usuario
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Complete los datos básicos del usuario.
            </p>

            <UserCreationForm form={form} />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={submitUser}
              className="w-full sm:w-auto"
            >
              Crear Usuario
            </Button>
          </div>
        </form>
      </FormProvider>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Usuario creado</AlertDialogTitle>
            <AlertDialogDescription>
              El usuario ha sido guardado correctamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => navigate("/usuarios")}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
