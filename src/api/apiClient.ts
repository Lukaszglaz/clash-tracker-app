import axios from "axios";

const getBaseUrl = (): string => {
  try {
    const env = (globalThis as any).process?.env;
    return env?.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  } catch {
    return "http://localhost:3000/api";
  }
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
