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
import { useEffect, useState } from "react";
import type { Customer, CustomerData } from "@/interfaces/customer";

type EditCustomerDialogProps = {
  open: boolean;
  customer: Customer | null;
  pending: boolean;
  onEditCancel: () => void;
  onEditConfirm: (formState: CustomerData) => void;
};

export function EditCustomerDialog({
  open,
  customer,
  pending,
  onEditCancel,
  onEditConfirm,
}: EditCustomerDialogProps) {
  const [formState, setFormState] = useState<CustomerData>({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  // Purpose of the useEffect is to synch the form state with new customer when dialog opens
  // ESlint wanred about not using setState inside effects because it could cause cascading rerenders
  // I think that my dependencies here ensure that the useEffect is only ran initially when a new EditDialog is opened
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (open && customer) {
      setFormState({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
      });
    }
  }, [customer, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(formState).every(
    (value) => value.trim() !== ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditConfirm(formState);
  };

  return (
    <Dialog open={open} onOpenChange={onEditCancel}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Edit {customer?.firstname} {customer?.lastname}
            </DialogTitle>
            <DialogDescription>
              Change the information you want to update and press update
            </DialogDescription>
          </DialogHeader>
          <AddNewCustomerFormInputs
            formState={formState}
            handleInputChange={handleInputChange}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={onEditCancel}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!isFormValid || pending}
              className="cursor-pointer"
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
