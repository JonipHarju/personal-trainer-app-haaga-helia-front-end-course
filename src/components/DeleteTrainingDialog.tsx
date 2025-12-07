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

type DeleteTrainingDialogProps = {
  open: boolean;
  id: string;
  activity: string;
  customerName: string;
  onDeleteCancel: () => void;
  onDeleteConfirm: () => void;
};

export function DeleteTrainingDialog({
  open,
  id,
  activity,
  customerName,
  onDeleteCancel,
  onDeleteConfirm,
}: DeleteTrainingDialogProps) {
  if (!id) return null;

  return (
    <Dialog open={open} onOpenChange={onDeleteCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {activity} </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {activity} with {customerName}
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
