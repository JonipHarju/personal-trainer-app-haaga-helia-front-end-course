import type { Customer } from "@/interfaces/customer";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer, fetchAllCustomers } from "@/api/customers";
import { DataTable } from "./DataTable";
import { AddNewCustomerDialog } from "./AddNewCustomerDialog";
import { getCustomerColumns } from "@/lib/customerColumns";
import { useState } from "react";
import { DeleteCustomerDialog } from "./DeleteCustomerDialog";
import { toast } from "sonner";

export default function Customers() {
  const [customerToDelete, setCustomerToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchAllCustomers,
  });

  const queryClient = useQueryClient();

  const customers: Customer[] = isSuccess ? data._embedded.customers : [];

  const handleEdit = (customer: Customer, id: string, customerName: string) => {
    console.log(
      "Editing customer with id ",
      id,
      "whos name is",
      customerName,
      "Customer info",
      customer
    );
  };

  const handleDelete = (id: string, customerName: string) => {
    console.log("Deleting customer with id ", id, "whos name is", customerName);
    setCustomerToDelete({ id, name: customerName });
  };

  const onDeleteCancel = () => setCustomerToDelete(null);

  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer Deleted!");
    },

    onError: (error: unknown) => {
      toast.error("Failed deleting customer!");
      console.error(error);
    },
  });
  const onDeleteConfirm = () => {
    if (customerToDelete?.id) {
      deleteMutation.mutate(customerToDelete.id);
    }
    setCustomerToDelete(null);
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

      <DeleteCustomerDialog
        id={customerToDelete?.id ?? ""}
        name={customerToDelete?.name ?? ""}
        onDeleteCancel={onDeleteCancel}
        onDeleteConfirm={onDeleteConfirm}
      />
    </div>
  );
}
