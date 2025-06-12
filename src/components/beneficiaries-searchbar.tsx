import type { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface SearchCriteria {
  fullName: string;
  cedula: string;
  nit: string;
}

interface Props {
  criteria: SearchCriteria;
  onChange: (field: keyof SearchCriteria, value: string) => void;
  onSearch: () => void;
}

export function BeneficiariesSearchBar({
  criteria,
  onChange,
  onSearch,
}: Props) {
  const handleChange =
    (field: keyof SearchCriteria) => (e: ChangeEvent<HTMLInputElement>) =>
      onChange(field, e.currentTarget.value);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-6"
    >
      <div>
        <Label htmlFor="fullName">Nombre o Apellido</Label>
        <Input
          id="fullName"
          value={criteria.fullName}
          onChange={handleChange("fullName")}
          placeholder="Nombre o Apellido"
        />
      </div>

      <div>
        <Label htmlFor="cedula">Cédula de Ciudadanía</Label>
        <Input
          id="cedula"
          value={criteria.cedula}
          onChange={handleChange("cedula")}
          placeholder="Cédula de Ciudadanía"
        />
      </div>

      <div>
        <Label htmlFor="nit">NIT</Label>
        <Input
          id="nit"
          value={criteria.nit}
          onChange={handleChange("nit")}
          placeholder="NIT"
        />
      </div>
      <div>
        <Button type="submit" className="w-full sm:w-auto">
          Buscar
        </Button>
      </div>
    </form>
  );
}
