import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/interfaces/customer";

export function getCustomerColumns(): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: "firstname",
      header: "First Name",
    },
    {
      accessorKey: "lastname",
      header: "Last Name",
    },
    {
      accessorKey: "streetaddress",
      header: "Street Address",
    },
    {
      accessorKey: "postcode",
      header: "Postcode",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
  ];
}
