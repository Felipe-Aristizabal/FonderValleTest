import axios from "axios";

const instance = axios.create({
  baseURL: "https://ec2-3-22-100-200.us-east-2.compute.amazonaws.com:8009",
});

// Agrega el token a cada request automáticamente
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
