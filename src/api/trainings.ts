import type { Customer } from "@/interfaces/customer";
import type { Training } from "@/interfaces/training";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchAllTrainings() {
  const response = await fetch(`${BASE_URL}/trainings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Network error");

  const data = await response.json();

  /**
   * By using Promise.all we run all of htese operartions in pararell and we wait until all of team has finnished.
   * Wthitout this we would run one at a time and that would take much longer.
   * Promise.all() will result in an array of the promises
   *
   * We map map over all the training training ojbects and fetch the customer names.
   * we assign the customer first and last name into customerName variable
   * Then we return a new object that spreads the old training data and includes the customersName into that data.
   *
   * Then we return the original data object and replace the _embedded property with new one that includes the new training objects array.
   *
   */
  const trainings = await Promise.all(
    data._embedded.trainings.map(async (training: Training) => {
      const customerUrl = training._links.customer.href;
      let customerName = "customer unknonw";
      if (customerUrl) {
        try {
          const res = await fetch(customerUrl);
          if (res.ok) {
            const customer: Customer = await res.json();
            customerName = `${customer.firstname} ${customer.lastname}`;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return { ...training, customerName };
    })
  );
  return { ...data, _embedded: { trainings } };
}
