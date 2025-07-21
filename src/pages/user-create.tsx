import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useUsers } from "@/hooks/use-users";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import UserCreationForm from "@/containers/user-creation-form";
import { userSchema, type UserFormValues } from "@/lib/schemas/user-schema";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      username: "",
      documento: "",
      email: "",
      direccion: "",
      celular: "",
      departamento: "",
      ciudad: "",
      rol: "",
      estado: "Activo",
      profesion: "",
      niveleducativo: "",
      fechanacimiento: "",
      password: "",
    },
  });

  const { createUser } = useUsers();

  const submitUser = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      console.warn("Formulario inválido:", form.formState.errors);
      return;
    }

    const raw = form.getValues();

    const userData = {
      nombres: raw.nombres,
      apellidos: raw.apellidos,
      email: raw.email,
      username: raw.username,
      password: raw.password,
      documento: raw.documento,
      celular: raw.celular,
      rol: raw.rol,
      estado: "ACTIVO",

      direccion: raw.direccion || "",
      ciudad: raw.ciudad || "",
      departamento: raw.departamento || "",
      profesion: raw.profesion || "",
      niveleducativo: raw.niveleducativo || "",
      fechanacimiento: raw.fechanacimiento || "",

      iddepartamento: null,
      idciudad: null,
      idprofesion: null,
      tipodocumento: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await createUser(userData);
      form.reset();
      triggerRef.current?.click();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <FormProvider {...form}>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            submitUser();
          }}
        >
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
            <Button type="submit" className="w-full sm:w-auto">
              Crear Usuario
            </Button>
          </div>
        </form>
      </FormProvider>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button ref={triggerRef} className="hidden" />
        </AlertDialogTrigger>
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
