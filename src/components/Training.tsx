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
  return (
    <div className="flex flex-col gap-4 w-[98%] max-w-600 overflow-hidden mt-12">
      <div className="flex flex-col gap-4 w-full items-center md:items-start text-center">
        <div>
          <h1 className="text-2xl font-bold">Training data</h1>
          <p className="text-muted-foreground">Manage your training sessions</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <AddNewTrainingDialog />
        </div>
      </div>

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
