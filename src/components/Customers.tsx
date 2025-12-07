import type { Customer } from "@/interfaces/customer";

import { useQuery } from "@tanstack/react-query";
import { fetchAllCustomers } from "@/api/customers";
import { DataTable } from "./DataTable";
import { AddNewCustomerDialog } from "./AddNewCustomerDialog";
import { getCustomerColumns } from "@/lib/customerColumns";

export default function Customers() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchAllCustomers,
  });

  const customers: Customer[] = isSuccess ? data._embedded.customers : [];

  const handleEdit = (customer: Customer, id: string) => {
    console.log("Editing customer with id ", id, "Customer info", customer);
  };

  const handleDelete = (id: string) => {
    console.log("Deleting customer with id ", id);
  };
  const customerColumns = getCustomerColumns(handleEdit, handleDelete);

  console.log(customers);
  return (
    <div className="flex flex-col gap-4 m-12 ">
      <AddNewCustomerDialog />
      <DataTable
        columns={customerColumns}
        data={customers}
        isLoading={isLoading}
      />
    </div>
  );
}
