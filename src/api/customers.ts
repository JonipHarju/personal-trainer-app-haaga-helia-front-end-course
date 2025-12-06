import type { CustomerData } from "@/interfaces/customer";

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

export async function createCustomer(customerData: CustomerData) {
  const response = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) throw new Error("Customer creation faield ");

  return response.json();
}
