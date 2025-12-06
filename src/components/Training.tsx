import { fetchAllTrainings } from "@/api/trainings";
import type { Training } from "@/interfaces/training";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { getTrainingColumns } from "../lib/trainingColumns";

export default function Training() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["trainings"],
    queryFn: fetchAllTrainings,
  });

  const trainings: Training[] = isSuccess ? data._embedded.trainings : [];
  const trainingColumns = getTrainingColumns();

  console.log(data);
  return (
    <div className="m-12">
      <DataTable
        columns={trainingColumns}
        data={trainings}
        isLoading={isLoading}
      />
    </div>
  );
}
