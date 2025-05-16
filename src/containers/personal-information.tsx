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
            <FormItem>
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
            <FormItem>
              <RequiredLabel>Género</RequiredLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el género" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                  <SelectItem value="LGBTIQ+">LGBTIQ+</SelectItem>
                  <SelectItem value="no answer">No responder</SelectItem>
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
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <DatePicker
                label="Fecha de Nacimiento"
                value={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="educationalProfile"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel>Nivel Educativo</RequiredLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el nivel educativo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="primary">Primaria</SelectItem>
                  <SelectItem value="secondary">Bachillerato</SelectItem>
                  <SelectItem value="technical">Técnico</SelectItem>
                  <SelectItem value="university">Profesional</SelectItem>
                  <SelectItem value="postgraduate">Posgrado</SelectItem>
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
            <FormItem>
              <RequiredLabel>Étnia</RequiredLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la étnia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NARP">NARP</SelectItem>
                  <SelectItem value="indigenous">Indígena</SelectItem>
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
            <FormItem>
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
            <FormItem>
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
