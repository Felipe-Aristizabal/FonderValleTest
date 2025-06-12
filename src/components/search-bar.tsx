export interface SearchFieldConfig<T> {
  /**
   * Key in the criteria object, e.g. "fullName" or "username"
   */
  name: keyof T;
  /** Label text shown above the input */
  label: string;
  /** Placeholder text inside the input */
  placeholder: string;
}

/**
 * Generic SearchBar component.
 *
 * @template T  - Type of the criteria object (e.g. { fullName: string; cedula: string; nit: string })
 *
 * Props:
 *  - fields: array of field configurations (each with name, label, placeholder)
 *  - criteria: current values, indexed by field name
 *  - onChange: callback to update one field (fieldName, newValue)
 *  - onSearch: callback fired on form submit
 */
interface SearchBarProps<T extends { [K in keyof T]: string }> {
  fields: SearchFieldConfig<T>[];
  criteria: T;
  onChange: (field: keyof T, value: string) => void;
  onSearch: () => void;
}

export function SearchBar<T extends { [K in keyof T]: string }>({
  fields,
  criteria,
  onChange,
  onSearch,
}: SearchBarProps<T>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="flex flex-wrap gap-4 items-end"
    >
      {fields.map(({ name, label, placeholder }) => (
        <div key={String(name)} className="flex flex-col">
          <label htmlFor={String(name)} className="mb-1 text-sm font-medium">
            {label}
          </label>
          <input
            id={String(name)}
            type="text"
            value={criteria[name] ?? ""}
            onChange={(e) => onChange(name, e.currentTarget.value)}
            placeholder={placeholder}
            className="h-10 px-3 rounded-md border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      ))}

      <button
        type="submit"
        className="h-10 mt-6 bg-gray-800 text-primary-foreground rounded-md px-5 text-sm font-semibold hover:bg-gray-600 transition"
      >
        Buscar
      </button>
    </form>
  );
}
