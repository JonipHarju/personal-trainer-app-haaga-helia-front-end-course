import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/interfaces/customer";
import { Button } from "@/components/ui/button";

export function getCustomerColumns(
  handleEdit: (customer: Customer, id: string) => void,
  handleDelete: (id: string) => void
): ColumnDef<Customer>[] {
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
    {
      id: "actions",
      header: "Actions",

      cell: ({ row }) => {
        // row.original returns the original data that the row received
        const customer = row.original;
        // id is the last element of the url so split by / and get the last element
        const customerId = customer._links.self.href.split("/").pop() || "";

        return (
          <div className="flex gap-2">
            <Button onClick={() => handleEdit(customer, customerId)}>
              Edit
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => handleDelete(customerId)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
}
