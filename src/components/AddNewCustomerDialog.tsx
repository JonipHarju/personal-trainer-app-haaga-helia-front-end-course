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
import { AddNewCustomerFormInputs } from "./AddNewCustomerFormInputs";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "@/api/customers";

export function AddNewCustomerDialog() {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // a bit lackluster validation but it atleast prevents the user from sending incomplete forms.
  // better validation should anyway be done server side, because the POST request can be sent via other means or my modyfying the html
  const isFormValid = Object.values(formState).every(
    (value) => value.trim() !== ""
  );

  // Used linkes below as a reference
  // https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  //https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });

  const addNewCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formState);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="max-w-fit">
          Add new customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={addNewCustomer}>
          <DialogHeader>
            <DialogTitle>New customer information</DialogTitle>
            <DialogDescription>
              To create a new customer, fill the fields below and press create
            </DialogDescription>
          </DialogHeader>
          <AddNewCustomerFormInputs
            formState={formState}
            handleInputChange={handleInputChange}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
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
