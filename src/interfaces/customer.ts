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

interface Links {
  self: { href: string };
  customer: { href: string };
  trainings: { href: string };
}
