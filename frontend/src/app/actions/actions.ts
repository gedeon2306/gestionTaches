'use server'
import api from '@/src/constants/api';
import { cookies } from 'next/headers';


async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) return null;

  try {
    const response = await api.post('token/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;

    cookieStore.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24
    });

    return newAccessToken;
  } catch (error) {
    console.error('Échec du renouvellement du token:', error);
    return null;
  }
}


const authConfig = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});
 

async function getToken(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) throw new Error("Non authentifié");
  return token;
}

async function readFetchResponseJson(response: Response): Promise<unknown | null> {
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function messageFromErrorBody(data: unknown): string {
  if (data == null) return "L’opération a échoué.";
  if (typeof data === "string") return data;
  if (typeof data !== "object") return "L’opération a échoué.";
  const o = data as Record<string, unknown>;
  if (typeof o.error === "string") return o.error;
  if (typeof o.message === "string") return o.message;
  if (typeof o.detail === "string") return o.detail;
  if (Array.isArray(o.detail) && o.detail.length > 0) {
    const first = o.detail[0];
    return typeof first === "string" ? first : String(first);
  }
  const parts: string[] = [];
  for (const v of Object.values(o)) {
    if (Array.isArray(v)) parts.push(...v.map(String));
    else if (typeof v === "string") parts.push(v);
  }
  if (parts.length) return parts.join(" ");
  return "L’opération a échoué.";
}

function messageFromSuccessBody(data: unknown): string | undefined {
  if (data && typeof data === "object" && "message" in data) {
    const m = (data as { message: unknown }).message;
    if (typeof m === "string" && m.trim()) return m;
  }
  return undefined;
}
