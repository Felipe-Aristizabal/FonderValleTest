import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormRow } from "@/components/ui/form-row";
import { FormSection } from "@/components/ui/form-section";
import { RequiredLabel } from "@/components/ui/required-label";
import type { UserFormValues } from "@/lib/schemas/user-schema";

interface UserCreationFormProps {
  form: UseFormReturn<UserFormValues>;
}

export default function UserCreationForm({ form }: UserCreationFormProps) {
  return (
    <FormSection title="Información del Usuario" isExpanded onToggle={() => {}}>
      <FormRow>
        <FormField
          control={form.control}
          name="nombres"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Nombres</RequiredLabel>
              <FormControl>
                <Input placeholder="Ej: María Fernanda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apellidos"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Apellidos</RequiredLabel>
              <FormControl>
                <Input placeholder="Ej: Rodríguez Gómez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>
      <FormRow>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Nombre de usuario</RequiredLabel>
              <FormControl>
                <Input placeholder="ej: jpablo123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Contraseña</RequiredLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>

      <FormRow>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Email</RequiredLabel>
              <FormControl>
                <Input placeholder="correo@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="documento"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Documento</RequiredLabel>
              <FormControl>
                <Input
                  placeholder="Número de documento"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>

      <FormRow>
        <FormField
          control={form.control}
          name="celular"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Celular</RequiredLabel>
              <FormControl>
                <Input placeholder="Ej: 3001234567" {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rol"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Rol</RequiredLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Asesor">Asesor</SelectItem>
                  <SelectItem value="Beneficiario">Beneficiario</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>
    </FormSection>
  );
}
