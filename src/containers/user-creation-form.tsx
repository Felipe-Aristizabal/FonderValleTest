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
import type { UserFormValues } from "@/lib/form-schema";

interface UserCreationFormProps {
  form: UseFormReturn<UserFormValues>;
}

export default function UserCreationForm({ form }: UserCreationFormProps) {
  return (
    <FormSection title="Información del Usuario" isExpanded onToggle={() => {}}>
      <FormRow>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Nombre completo</RequiredLabel>
              <FormControl>
                <Input placeholder="Ingrese el nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstSurname"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Primer apellido</RequiredLabel>
              <FormControl>
                <Input placeholder="Ingrese el primer apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>

      <FormRow>
        <FormField
          control={form.control}
          name="secondSurname"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel required={false}>Segundo apellido</RequiredLabel>
              <FormControl>
                <Input placeholder="Ingrese el segundo apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationalId"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Cédula</RequiredLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese la cédula"
                  type="number"
                  {...field}
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Teléfono</RequiredLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese el número"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
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
