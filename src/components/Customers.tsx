import { Customer } from "@/interfaces/customer";
import { customerColumns } from "./CustomerColumns";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCustomers } from "@/api/customers";
import { DataTable } from "./DataTable";

export default function Customers() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchAllCustomers,
  });

  //TODO Change this into skeleton ui when table is ready.
  if (isLoading) return <div>Loading</div>;

  const customers: Customer[] = data._embedded.customers;

  console.log(customers);
  return (
    <div className="m-12">
      <DataTable columns={customerColumns} data={customers} />
    </div>
  );
}
