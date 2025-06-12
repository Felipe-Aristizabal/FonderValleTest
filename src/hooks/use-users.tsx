import { useState, useEffect } from "react";
// import axios from "axios";

export interface ApiUser {
  id: string;
  fullName: string;
  nationalId: string;
  role: string;
  appState: string;
}

export interface User {
  id: string;
  fullName: string;
  nationalId: string;
  role: string;
  appState: string;
}

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY_USERS ?? "dataUsers";

export function useUsers() {
  const [all, setAll] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const mapApiToUser = (u: ApiUser): User => ({
  //   id: u.id,
  //   fullName: u.fullName,
  //   nationalId: u.nationalId,
  //   role: u.role,
  //   appState: u.appState,
  // });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      let apiUsers: User[] = [];
      let localUsers: User[] = [];

      // try {
      //   const res = await axios.get<ApiUser[]>("/api/users");
      //   if (Array.isArray(res.data)) {
      //     apiUsers = res.data.map(mapApiToUser);
      //   }
      // } catch (error) {
      //   console.error("Error fetching users:", error);
      // }

      try {
        const raw = localStorage.getItem(STORAGE_KEY) ?? "[]";
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          localUsers = parsed;
        }
      } catch (e) {
        console.error("Error parsing local users:", e);
      }

      // Eliminar duplicados por ID
      const combined = [...apiUsers, ...localUsers].reduce<User[]>(
        (acc, user) => {
          if (!acc.some((u) => u.id === user.id)) acc.push(user);
          return acc;
        },
        []
      );

      setAll(combined);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { all, loading };
}
