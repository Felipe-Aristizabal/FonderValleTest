import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import { Button } from "@/components/ui/button";
import { MoreVertical, Loader2 } from "lucide-react";

import { useBeneficiaries } from "@/hooks/use-beneficiaries";
import { useFilteredPagination } from "@/hooks/use-filtered-pagination";
import { SearchBar } from "@/components/search-bar";
import type { SearchFieldConfig } from "@/components/search-bar";
import { TABLE_HEADERS_BENEFICIARIES } from "@/constants/tableHeaders";
import { useBeneficiary } from "@/contexts/BeneficiaryContext";

export function BeneficiariesPage() {
  const navigate = useNavigate();
  const { setBeneficiaryId } = useBeneficiary();
  const { all, loading } = useBeneficiaries();
  const [pageSize, setPageSize] = useState<number>(10);

  interface BeneficiaryCriteria {
    fullName: string;
    cedula: string;
    nit: string;
  }

  // Define search criteria type for beneficiaries
  const [criteria, setCriteria] = useState<BeneficiaryCriteria>({
    fullName: "",
    cedula: "",
    nit: "",
  });

  // Hook for filter + pagination
  const { current, pageCount, pageIndex, setPageIndex } = useFilteredPagination(
    all,
    (item, crit) => {
      const matchName = crit.fullName
        ? item.fullName.toLowerCase().includes(crit.fullName.toLowerCase())
        : true;
      const matchCedula = crit.cedula
        ? item.nationalId.includes(crit.cedula)
        : true;
      const matchNit = crit.nit
        ? item.nit === "NIT" && item.nit.includes(crit.nit)
        : true;
      return matchName && matchCedula && matchNit;
    },
    criteria,
    pageSize
  );

  // Update one field in criteria
  const handleChange = (field: keyof BeneficiaryCriteria, value: string) => {
    setCriteria((prev) => ({ ...prev, [field]: value }));
  };

  // Field configurations for the generic SearchBar
  const fields: SearchFieldConfig<BeneficiaryCriteria>[] = [
    {
      name: "fullName",
      label: "Nombre o Apellido",
      placeholder: "Nombre o Apellido",
    },
    { name: "cedula", label: "Cédula", placeholder: "Cédula" },
    { name: "nit", label: "NIT", placeholder: "NIT" },
  ];

  if (loading) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        <span className="mt-4 text-lg font-medium text-slate-700">
          Loading beneficiaries...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto px-6 py-4">
      {/* ─── SearchBar + New Beneficiary button ─────────────────────────────────────── */}
      <div className="flex flex-wrap justify-between  items-end gap-4 mb-6">
        <div className="flex items-center mb-4">
          <label htmlFor="rowsPerPage" className="mr-2 text-sm font-medium">
            Filas por página:
          </label>
          <select
            id="rowsPerPage"
            value={pageSize}
            onChange={(e) => {
              const newSize = parseInt(e.currentTarget.value, 10);
              setPageSize(newSize);
              setPageIndex(0);
            }}
            className="h-8 px-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <SearchBar
          fields={fields}
          criteria={criteria}
          onChange={handleChange}
          onSearch={() => setPageIndex(0)}
        />
        <button
          onClick={() => navigate("/nuevo-beneficiario")}
          className="h-10 bg-secondary text-secondary-foreground border-2 border-gray-800  rounded-md px-5 text-sm font-semibold hover:bg-secondary/70 transition"
        >
          Nuevo beneficiario
        </button>
      </div>

      {/* ─── Table of Beneficiaries ──────────────────────────────────────────────────── */}
      <table className="min-w-full divide-y divide-slate-200 border rounded-md text-sm bg-white">
        <thead className="bg-slate-100">
          <tr>
            {TABLE_HEADERS_BENEFICIARIES.map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left font-semibold text-slate-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {current.map((b, idx) => (
            <motion.tr
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="odd:bg-white even:bg-slate-50 hover:bg-slate-300 cursor-pointer"
              onClick={() => {
                setBeneficiaryId(b.id);
                navigate(`/beneficiario-detalles/${b.id}`);
              }}
            >
              <td className="px-4 py-2 whitespace-nowrap">
                {pageIndex * 10 + idx + 1}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{b.fullName}</td>
              <td className="px-4 py-2 whitespace-nowrap">{b.nationalId}</td>
              <td className="px-4 py-2 whitespace-nowrap">{b.nit}</td>
              <td className="px-4 py-2 whitespace-nowrap">{b.address}</td>
              <td className="px-4 py-2 whitespace-nowrap">{b.phoneNumber}</td>
              <td className="px-4 py-2 whitespace-nowrap">{b.gender}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {b.educationalProfile}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{b.appState}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Button
                  variant="outline"
                  size="icon"
                  className="border rounded-full hover:bg-muted/80"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </td>
            </motion.tr>
          ))}

          {current.length === 0 && (
            <tr>
              <td
                colSpan={TABLE_HEADERS_BENEFICIARIES.length}
                className="p-4 text-center italic text-slate-500"
              >
                No se encontraron beneficiarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ─── Pagination ───────────────────────────────────────────────────────────────── */}
      <ReactPaginate
        forcePage={pageIndex}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={({ selected }) => setPageIndex(selected)}
        containerClassName="flex justify-center gap-2 py-4"
        pageLinkClassName="px-3 py-1 rounded text-gray-400 hover:bg-slate-300 hover:text-slate-800 transition"
        activeLinkClassName="bg-gray-800 text-primary-foreground"
        previousLabel="<"
        nextLabel=">"
        disabledClassName="opacity-50 pointer-events-none"
        previousLinkClassName="px-3 py-1 rounded text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition"
        nextLinkClassName="px-3 py-1 rounded text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition"
        breakLabel="…"
        activeClassName="font-bold"
      />
    </div>
  );
}
