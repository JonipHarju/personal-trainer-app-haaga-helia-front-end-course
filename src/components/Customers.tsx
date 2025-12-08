import type { Customer, CustomerData } from "@/interfaces/customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCustomer,
  fetchAllCustomers,
  updateCustomer,
} from "@/api/customers";
import { DataTable } from "./DataTable";
import { AddNewCustomerDialog } from "./AddNewCustomerDialog";
import { getCustomerColumns } from "@/lib/customerColumns";
import { useState } from "react";
import { DeleteCustomerDialog } from "./DeleteCustomerDialog";
import { toast } from "sonner";
import { EditCustomerDialog } from "./EditCustomerDialog";
import ExportCustomersToCSV from "./ExportCustomersToCSV";

export default function Customers() {
  const [customerToDelete, setCustomerToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [customerToEdit, setCustomerToEdit] = useState<{
    customer: Customer;
    id: string;
  } | null>(null);

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchAllCustomers,
  });

  const queryClient = useQueryClient();

  const customers: Customer[] = isSuccess ? data._embedded.customers : [];

  // Edit functionalities
  const handleEdit = (customer: Customer, id: string) => {
    setCustomerToEdit({ customer, id });
  };

  const onEditCancel = () => setCustomerToEdit(null);

  const editMutation = useMutation({
    mutationFn: ({
      id,
      customerData,
    }: {
      id: string;
      customerData: CustomerData;
    }) => updateCustomer(id, customerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer updated!");
    },

    onError: (error: unknown) => {
      toast.error("Failed to update the customer!");
      console.error(error);
    },
  });

  const onEditConfirm = (formState: CustomerData) => {
    if (customerToEdit?.id) {
      editMutation.mutate({ id: customerToEdit.id, customerData: formState });
    }
    setCustomerToEdit(null);
  };
  // Delete functionalities
  const handleDelete = (id: string, customerName: string) => {
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

  return (
    <div className="flex flex-col gap-4 m-12 ">
      <div className="flex gap-4">
        <AddNewCustomerDialog />
        <ExportCustomersToCSV customers={customers} />
      </div>
      <DataTable
        columns={customerColumns}
        data={customers}
        isLoading={isLoading}
      />

      <DeleteCustomerDialog
        open={!!customerToDelete}
        id={customerToDelete?.id ?? ""}
        name={customerToDelete?.name ?? ""}
        onDeleteCancel={onDeleteCancel}
        onDeleteConfirm={onDeleteConfirm}
      />

      <EditCustomerDialog
        open={!!customerToEdit}
        customer={customerToEdit?.customer ?? null}
        pending={editMutation.isPending}
        onEditCancel={onEditCancel}
        onEditConfirm={onEditConfirm}
      />
    </div>
  );
}
