const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchAllCustomers() {
  const response = await fetch(`${BASE_URL}/customers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Network error");
  return response.json();
}
