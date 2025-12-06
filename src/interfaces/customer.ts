import type { Links } from "./links";
export interface Customer {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  _links: Links;
}

// Used for actions where _links is not included like creating a customer
export type CustomerData = Omit<Customer, "_links">;
