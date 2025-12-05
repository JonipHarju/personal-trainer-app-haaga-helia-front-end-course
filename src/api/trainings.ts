const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchAllTrainings() {
  const response = await fetch(`${BASE_URL}/trainings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Network error");
  return response.json();
}
