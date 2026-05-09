const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`MobilCharge API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
