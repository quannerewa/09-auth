import axios from "axios";

export const nextServer = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
export async function GET() {
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
          "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
