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
import type { FormValues } from "@/lib/form-schema";

import municipiosValle from "@/data/municipios-valle.json";
import economicSectorArea from "@/data/economic-sectors.json";

interface CompanyInformationProps {
  form: UseFormReturn<FormValues>;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CompanyInformation({
  form,
  isExpanded,
  onToggle,
}: CompanyInformationProps) {
  return (
    <FormSection
      title="2.  Información de la empresa"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <FormRow>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem id="companyName-field">
              <RequiredLabel>Nombre de la Empresa</RequiredLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese el nombre de la empresa"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nit"
          render={({ field }) => (
            <FormItem  id="nit-field">
              <RequiredLabel>RUT</RequiredLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese RUT, no se olvide del dígito de verificación"
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
          name="economicSector"
          render={({ field }) => (
            <FormItem id="economicSector-field">
              <RequiredLabel>Nivel del Sector Económico</RequiredLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el Nivel del sector económico" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="primario">Primario</SelectItem>
                  <SelectItem value="secundario">Secundario</SelectItem>
                  <SelectItem value="terciario">Terciario</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainSector"
          render={({ field }) => (
            <FormItem id="mainSector-field">
              <RequiredLabel>Actividad económica</RequiredLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la Actividad económica" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {economicSectorArea.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id}>
                      {sector.name}
                    </SelectItem>
                  ))}
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
          name="city"
          render={({ field }) => (
            <FormItem id="city-field">
              <RequiredLabel>Ciudad</RequiredLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la ciudad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {municipiosValle.map((municipio) => (
                    <SelectItem key={municipio.id} value={municipio.id}>
                      {municipio.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="otra">Otra</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem id="address-field">
              <RequiredLabel>Dirección de la empresa</RequiredLabel>
              <FormControl>
                <Input placeholder="Ingrese la dirección" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRow>
    </FormSection>
  );
}
