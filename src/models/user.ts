export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  username: string;
  documento: string;
  password: string;
  email: string;
  direccion: string | null;
  celular: string;
  departamento: string | null;
  ciudad: string | null;
  iddepartamento: number | null;
  idciudad: number | null;
  profesion: string | null;
  idprofesion: number | null;
  rol: string;
  tipodocumento: string | null;
  estado: string;
  niveleducativo: string | null;
  fechanacimiento: string | null;
  createdAt: string;
  updatedAt: string;
}
