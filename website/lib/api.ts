const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://keydrop-1wzo.onrender.com";

export async function apiRequest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("keydrop_token");
}

export function saveToken(token: string) {
  localStorage.setItem("keydrop_token", token);
}

export function clearToken() {
  localStorage.removeItem("keydrop_token");
}

export async function login(email: string, password: string) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveToken(data.token);
  return data;
}

export async function register(email: string, password: string) {
  const data = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  saveToken(data.token);
  return data;
}

export async function getProjects() {
  const token = getToken();
  return apiRequest("/projects", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getSecrets(projectKey: string) {
  return apiRequest("/secrets", {
    headers: { Authorization: `Bearer ${projectKey}` },
  });
}

export async function deleteProject(projectKey: string) {
  const token = getToken();
  return apiRequest(`/project/${projectKey}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function confirmCliToken(token: string, jwt: string) {
  return apiRequest("/auth/cli/confirm", {
    method: "POST",
    body: JSON.stringify({ token, jwt }),
  });
}