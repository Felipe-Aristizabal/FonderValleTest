import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import type { User } from "@/models/user";

export function useUsers() {
  const [all, setAll] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>("/users");
        setAll(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (data: Partial<User>) => {
    console.log("Creating...");

    const payload = {
      ...data,
      iddepartamento: null,
      idciudad: null,
      idprofesion: null,
      tipodocumento: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const res = await axios.post("/users", payload);
    return res.data;
  };

  const updateUser = async (id: string | number, data: Partial<User>) => {

    const mapRole = (role: string) => {
      switch (role) {
        case "Administrador":
          return "ADMIN";
        case "Asesor":
          return "ASESOR";
        case "Beneficiario":
          return "BENEFICIARIO";
        default:
          return role; // En caso de algún valor inesperado
      }
    };
    const mapEstado = (estado: string) => {
  switch (estado?.toLowerCase()) {
    case "activo":
      return "ACTIVO";
    case "inactivo":
      return "INACTIVO";
    default:
      return estado; 
  }
};
    const payload = {
    id,  
    ...data,
    rol: mapRole(data.rol || ""),
    estado: mapEstado(data.estado || ""),
    updatedAt: new Date().toISOString(),
  };

  const res = await axios.put(`/users/${id}`, payload);

  setAll((prev) =>
    prev.map((user) =>
      user.id === Number(id) ? { ...user, ...payload, id: Number(id) } : user
    )
  );

  return res.data;
};


  return { all, loading, createUser, updateUser };
}

export async function getUserByEmail(email: string) {
  try {
    const res = await axios.get<User>(`/users/username/${email}`);
    return res.data;
  } catch (err) {
    console.error(`No se pudo obtener el usuario con username ${email}:`, err);
    return null;
  }
}

