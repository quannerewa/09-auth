import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "https://09-auth-kappa-taupe.vercel.app";

export const nextServer = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
