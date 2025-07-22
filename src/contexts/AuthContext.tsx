import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axios"; // Usamos tu instancia configurada con baseURL

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function decodeJwt(token: string): any | null {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Error decodificando el token JWT:", error);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      const decoded = decodeJwt(storedToken);
      if (decoded) {
        const extractedUser = {
          name: decoded.sub.split("@")[0],
          email: decoded.sub,
          role: "Usuario",
          avatar: null,
        };
        setUser(extractedUser);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const decoded = decodeJwt(token);
    if (!decoded?.exp) return;

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp - now;

    if (expiresIn <= 0) {
      logout();
      window.location.href = "/ingreso";
    } else {
      const timeout = setTimeout(() => {
        logout();
        window.location.href = "/ingreso";
      }, expiresIn * 1000);

      return () => clearTimeout(timeout);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await axios.post("/auth/login", {
      username: email,
      password: password,
    });

    const { token } = res.data;
    setToken(token);
    localStorage.setItem("token", token);

    const decoded = decodeJwt(token);
    if (decoded) {
      const extractedUser = {
        name: decoded.sub.split("@")[0],
        email: decoded.sub,
        role: "Usuario",
        avatar: null,
      };
      setUser(extractedUser);
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
