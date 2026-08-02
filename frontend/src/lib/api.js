// Empty string means "same origin" (production, behind the nginx reverse proxy).
// Only fall back to localhost when the env var was never defined at all —
// `||` would wrongly treat an intentionally empty string as "unset".
const API_BASE =
  import.meta.env.VITE_API_URL !== undefined
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000";

export async function submitContact(payload) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no body
  }

  if (!res.ok) {
    const message =
      (data && (data.detail || data.message)) ||
      "Something went wrong. Please try again.";
    throw new Error(typeof message === "string" ? message : "Request failed.");
  }

  return data;
}
