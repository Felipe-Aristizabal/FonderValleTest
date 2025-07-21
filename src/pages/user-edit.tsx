import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import UserCreationForm from "@/containers/user-creation-form";
import { userSchema, type UserFormValues } from "@/lib/schemas/user-schema";
import { useUsers } from "@/hooks/use-users";

export default function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Asume que tu ruta es algo como /usuarios/editar/:id
  const { all, updateUser } = useUsers();

  const user = all.find((u) => String(u.id) === id);

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

  // Cuando el usuario cargue, actualiza el formulario
  useEffect(() => {
    if (user) {
      form.reset({
        nombres: user.nombres,
        apellidos: user.apellidos,
        username: user.username,
        documento: user.documento,
        email: user.email,
        direccion: user.direccion,
        celular: user.celular,
        departamento: user.departamento,
        ciudad: user.ciudad,
        rol: user.rol,
        estado: user.estado,
        profesion: user.profesion ?? "",
        niveleducativo: user.niveleducativo ?? "",
        fechanacimiento: user.fechanacimiento ?? "",
        password: "", // puedes dejarla vacía o colocar un placeholder
      });
    }
  }, [user, form]);

  const submitUser = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const updatedData = form.getValues();

    try {
      if (user?.id === undefined) {
        throw new Error("El ID del usuario no está definido.");
      }
      await updateUser(user.id, updatedData);
      navigate("/usuarios");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Cargando usuario...</p>;
  }

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
              Editar Usuario
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Actualice la información del usuario.
            </p>

            <UserCreationForm form={form} />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Actualizar Usuario
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}