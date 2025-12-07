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

export async function deleteCustomer(id: string) {
  const response = await fetch(`${BASE_URL}/customers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to delete customer ");

  return;
}

export async function updateCustomer(id: string, customerData: CustomerData) {
  const response = await fetch(`${BASE_URL}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) throw new Error("Failed to update customer");

  return response.json();
}
