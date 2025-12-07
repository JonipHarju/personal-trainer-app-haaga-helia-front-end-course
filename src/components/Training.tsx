import { deleteTraining, fetchAllTrainings } from "@/api/trainings";
import type { Training } from "@/interfaces/training";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { getTrainingColumns } from "../lib/trainingColumns";
import { useState } from "react";
import { DeleteTrainingDialog } from "./DeleteTrainingDialog";
import { toast } from "sonner";
import { AddNewTrainingDialog } from "./AddNewTrainingDialog";

export default function Training() {
  const [trainingToDelete, setTrainingToDelete] = useState<{
    id: string;
    training: Training;
  } | null>(null);

  const queryClient = useQueryClient();
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["trainings"],
    queryFn: fetchAllTrainings,
  });

  const trainings: Training[] = isSuccess ? data._embedded.trainings : [];

  // delete functionalities
  const handleDelete = (id: string, training: Training) => {
    console.log("Deleting training with id ", id, "it's data is:", training);
    setTrainingToDelete({ id, training });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainings"] });
      toast.success("Training Deleted!");
    },

    onError: (error: unknown) => {
      toast.error("Failed to delete the training!");
      console.error(error);
    },
  });

  const onDeleteCancel = () => setTrainingToDelete(null);

  const onDeleteConfirm = () => {
    if (trainingToDelete?.id) {
      deleteMutation.mutate(trainingToDelete.id);
    }
    setTrainingToDelete(null);
  };

  const trainingColumns = getTrainingColumns(handleDelete);
  console.log(data);
  return (
    <div className="flex flex-col gap-4 m-12 ">
      <AddNewTrainingDialog />
      <DataTable
        columns={trainingColumns}
        data={trainings}
        isLoading={isLoading}
      />

      <DeleteTrainingDialog
        open={!!trainingToDelete}
        id={trainingToDelete?.id ?? ""}
        activity={trainingToDelete?.training.activity ?? ""}
        customerName={trainingToDelete?.training.customerName ?? ""}
        onDeleteCancel={onDeleteCancel}
        onDeleteConfirm={onDeleteConfirm}
      />
    </div>
  );
}
