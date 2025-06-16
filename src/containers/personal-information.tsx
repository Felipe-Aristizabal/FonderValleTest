import type { UseFormReturn } from "react-hook-form";

import { FormSection } from "@/components/ui/form-section";
import { FormRow } from "@/components/ui/form-row";
import { RequiredLabel } from "@/components/ui/required-label";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/ui/date-picker";
import type { FormValues } from "@/lib/form-schema";

interface PersonalInformationProps {
  form: UseFormReturn<FormValues>;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function PersonalInformation({
  form,
  isExpanded,
  onToggle,
}: PersonalInformationProps) {
  return (
    <FormSection
      title="1. Información personal"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <FormRow>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem id="fullName-field">
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
            <FormItem id="lastName-field">
              <RequiredLabel>Primer Apellido</RequiredLabel>
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
            <FormItem id="secondSurname-field">
              <RequiredLabel required={false}>Segundo Apellido</RequiredLabel>
              <FormControl>
                <Input placeholder="Ingrese el segundo apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem id="gender-field">
              <RequiredLabel>Género</RequiredLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el género" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="LGBTIQ+">LGBTIQ+</SelectItem>
                  <SelectItem value="no responde">No responder</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>

      <FormRow>
        <FormRow>
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col" id="dateOfBirth-field">
                <DatePicker
                  label="Fecha de Nacimiento"
                  value={field.value ?? null}
                  onChange={(date) => field.onChange(date ?? "")}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormRow>

        <FormField
          control={form.control}
          name="educationalProfile"
          render={({ field }) => (
            <FormItem id="educationalProfile-field">
              <RequiredLabel>Nivel Educativo</RequiredLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el nivel educativo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="primaria">Primaria</SelectItem>
                  <SelectItem value="bachillerato">Bachillerato</SelectItem>
                  <SelectItem value="tecnico">Técnico</SelectItem>
                  <SelectItem value="profesional">Profesional</SelectItem>
                  <SelectItem value="posgrado">Posgrado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>

      <FormRow>
        <FormField
          control={form.control}
          name="ethnicity"
          render={({ field }) => (
            <FormItem id="ethnicity-field">
              <RequiredLabel>Étnia</RequiredLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la étnia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NARP">NARP</SelectItem>
                  <SelectItem value="indigena">Indígena</SelectItem>
                  <SelectItem value="Rom">Rom</SelectItem>
                  <SelectItem value="Mestizo">Mestizo</SelectItem>
                  <SelectItem value="None">
                    Ninguno de los anteriores
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationalId"
          render={({ field }) => (
            <FormItem id="nationalId-field">
              <RequiredLabel>Cédula</RequiredLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Ingrese la cédula"
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
            <FormItem id="phoneNumber-field">
              <RequiredLabel>Teléfono / Celular</RequiredLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Ingrese un número de contacto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>
    </FormSection>
  );
}
