import { useQuery } from "@tanstack/react-query";
import { fetchAllCustomers } from "@/api/customers";

export default function Customers() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchAllCustomers,
  });

  console.log(data);
  return <div>Customers page</div>;
}
