import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type DeleteCustomerDialogProps = {
  id: string;
  name: string;
  onDeleteCancel: () => void;
  onDeleteConfirm: () => void;
};

export function DeleteCustomerDialog({
  id,
  name,
  onDeleteCancel,
  onDeleteConfirm,
}: DeleteCustomerDialogProps) {
  if (!id) return null;

  return (
    // convert the id to boolean with !! so that if its null this dialog is closed
    <Dialog open={!!id} onOpenChange={onDeleteCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {name} from customers? </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {name}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={onDeleteCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" type="button" onClick={onDeleteConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
