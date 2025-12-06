import type { Customer } from "@/interfaces/customer";
import { getCustomerColumns } from "../lib/customerColumns";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCustomers } from "@/api/customers";
import { DataTable } from "./DataTable";
import { AddNewCustomerDialog } from "./AddNewCustomerDialog";

export default function Customers() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchAllCustomers,
  });

  const customers: Customer[] = isSuccess ? data._embedded.customers : [];

  const customerColumns = getCustomerColumns();

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
