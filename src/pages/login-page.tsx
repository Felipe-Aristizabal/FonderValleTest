import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { Header } from "@/containers/Header";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/inicio");
    } catch {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 h-20 bg-white shadow flex items-center px-4 sm:px-8">
        <Header />
      </header>

      <div className="flex-1 flex items-center justify-center bg-blue-100 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
          <h1 className="text-3xl font-bold text-left text-gray-900">
            Ingresar
          </h1>
          <p className="text-left text-gray-600">
            Inicia sesión en tu cuenta para continuar.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleLogin();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@fondervalle.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full bg-gray-800" disabled={loading}>
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                    <circle
                      className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                <>
                  <LogIn className="mr-2" />
                  Ingresar
                </>
              )}
            </Button>
          </form>

        </div>
      </div>

      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © 2025 FonderValle - Gobernación del Valle del Cauca
      </footer>
    </div>
  );
}
