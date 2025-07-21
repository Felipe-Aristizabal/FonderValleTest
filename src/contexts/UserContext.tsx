import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserByEmail } from "@/hooks/use-users";

const UserContext = createContext<{ userId: string | null }>({ userId: null });

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth(); // extrae el email del token
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.email) return;

      const backendUser = await getUserByEmail(user.email);
      if (backendUser?.id) {
        setUserId(String(backendUser.id));
      } else {
        console.warn("No se pudo obtener el ID del usuario actual.");
        setUserId(null);
      }
    };

    fetchUserId();
  }, [user]);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
}

export function useUserId() {
  return useContext(UserContext).userId;
}
