// This dialog component is a modified version of the one shadcn documentation provides https://ui.shadcn.com/docs/components/dialog
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllCustomers } from "@/api/customers";
import { toast } from "sonner";
import type { Customer } from "@/interfaces/customer";
import { AddNewTrainingFormInputs } from "./AddNewTrainingFormInputs";
import { createTraining } from "@/api/trainings";

export function AddNewTrainingDialog() {
  const [formState, setFormState] = useState({
    activity: "",
    duration: 0,
    date: "",
    customer: "",
  });

  const resetFormState = () => {
    setFormState({
      activity: "",
      duration: 0,
      date: "",
      customer: "",
    });
  };
  const queryClient = useQueryClient();

  const { isSuccess, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchAllCustomers,
  });

  const customers: Customer[] = isSuccess ? data._embedded.customers : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormState({
      ...formState,
      date: date ? date.toISOString() : "",
    });
  };
  const handleCustomerChange = (customerLink: string) => {
    setFormState({ ...formState, customer: customerLink });
  };

  const isFormValid =
    formState.activity.trim() !== "" &&
    formState.duration > 0 &&
    formState.date.trim() !== "" &&
    formState.customer.trim() !== "";

  const mutation = useMutation({
    mutationFn: createTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainings"] });
      toast.success("Training added!");
      resetFormState();
    },
    onError: (error: unknown) => {
      toast.error("Failed to add training!");
      console.error(error);
    },
  });
  const addNewTraining = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      activity: formState.activity,
      duration: Number(formState.duration),
      date: formState.date,
      customer: formState.customer,
    });
    resetFormState();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="max-w-fit">
          Add new training
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={addNewTraining}>
          <DialogHeader>
            <DialogTitle>New training information</DialogTitle>
            <DialogDescription>
              To create a new training, fill the fields below and press create
            </DialogDescription>
          </DialogHeader>
          <AddNewTrainingFormInputs
            formState={formState}
            customers={customers}
            handleInputChange={handleInputChange}
            handleDateChange={handleDateChange}
            handleCustomerChange={handleCustomerChange}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={resetFormState} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!isFormValid || mutation.isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
