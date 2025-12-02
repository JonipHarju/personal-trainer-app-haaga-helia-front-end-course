import type { Customer } from "@/interfaces/customer";
import { customerColumns } from "./CustomerColumns";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCustomers } from "@/api/customers";
import { DataTable } from "./DataTable";

export default function Customers() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchAllCustomers,
  });

  const customers: Customer[] = isSuccess ? data._embedded.customers : [];

  console.log(customers);
  return (
    <div className="m-12">
      <DataTable
        columns={customerColumns}
        data={customers}
        isLoading={isLoading}
      />
    </div>
  );
}
