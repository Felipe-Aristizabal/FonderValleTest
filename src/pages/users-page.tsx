import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import { Button } from "@/components/ui/button";
import { MoreVertical, Loader2 } from "lucide-react";

import { useUsers } from "@/hooks/use-users";
import { useFilteredPagination } from "@/hooks/use-filtered-pagination";
import { SearchBar } from "@/components/search-bar";
import type { SearchFieldConfig } from "@/components/search-bar";
import { TABLE_HEADERS_USERS } from "@/constants/tableHeaders";

interface UsersTableCriteria {
  fullName: string;
  cedula: string;
  role: "Administrador" | "Beneficiario" | "Asesor" | "";
  appState: "active" | "inactive" | "";
}

export function UsersPage() {
  const navigate = useNavigate();
  const { all, loading } = useUsers();
  const [pageSize, setPageSize] = useState<number>(10);

  // Search criteria state for users
  const [criteria, setCriteria] = useState<UsersTableCriteria>({
    fullName: "",
    cedula: "",
    role: "",
    appState: "",
  });

  // Filter + paginate the users list
  const { current, pageCount, pageIndex, setPageIndex } = useFilteredPagination(
    all,
    (user, crit: UsersTableCriteria) => {
      const matchName = crit.fullName
        ? user.fullName.toLowerCase().includes(crit.fullName.toLowerCase())
        : true;
      const matchUsername = crit.cedula
        ? user.nationalId.includes(crit.cedula)
        : true;
      const matchRole = crit.role ? user.role === crit.role : true;
      const matchState = crit.appState ? user.appState === crit.appState : true;
      return matchName && matchUsername && matchRole && matchState;
    },
    criteria,
    pageSize
  );

  /**
   * Update one field in criteria
   * @param field - "fullName" | "username" | "email"
   * @param value - new search value
   */
  const handleChange = (field: keyof UsersTableCriteria, value: string) => {
    setCriteria((prev) => ({ ...prev, [field]: value }));
  };

  // Configure which fields to render in SearchBar
  const fields: SearchFieldConfig<UsersTableCriteria>[] = [
    {
      name: "fullName",
      label: "Nombre o Apellido",
      placeholder: "Nombre o Apellido",
    },
    { name: "cedula", label: "Cédula", placeholder: "Cédula" },
    { name: "role", label: "Rol", placeholder: "Rol" },
    { name: "appState", label: "Estado", placeholder: "Estado" },
  ];

  if (loading) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        <span className="mt-4 text-lg font-medium text-slate-700">
          Loading users...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto px-6 py-4">
      {/* ─── SearchBar + New User button ───────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
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
          onClick={() => navigate("/nuevo-usuario")}
          className="h-10 bg-secondary text-secondary-foreground border-2 border-gray-800  rounded-md px-5 text-sm font-semibold hover:bg-secondary/70 transition"
        >
          Nuevo usuario
        </button>
      </div>

      {/* ─── Table of Users ─────────────────────────────────────────────────────────── */}
      <table className="min-w-full divide-y divide-slate-200 border rounded-md text-sm bg-white">
        <thead className="bg-slate-100">
          <tr>
            {TABLE_HEADERS_USERS.map((header) => (
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
          {current.map((u, idx) => (
            <motion.tr
              key={u.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="odd:bg-white even:bg-slate-50 hover:bg-slate-100 cursor-pointer"
            >
              <td className="px-4 py-2 whitespace-nowrap">
                {pageIndex * 10 + idx + 1}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{u.fullName}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.nationalId}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.role}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.appState}</td>
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
                colSpan={TABLE_HEADERS_USERS.length}
                className="p-4 text-center italic text-slate-500"
              >
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ─── Pagination ──────────────────────────────────────────────────────────────── */}
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
