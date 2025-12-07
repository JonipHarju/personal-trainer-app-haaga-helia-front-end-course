import { fetchAllTrainings } from "@/api/trainings";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { ChartBarLabel } from "./ChartBarLabel";

export default function Statistics() {
  const { data } = useQuery({
    queryKey: ["trainings"],
    queryFn: fetchAllTrainings,
  });

  // group all same activies together and then sum their minutes durations together.
  const chartData = data?._embedded?.trainings
    ? Object.entries(_.groupBy(data._embedded.trainings, "activity")).map(
        ([activity, trainings]) => ({
          activity,
          minutes: _.sumBy(trainings, "duration"),
        })
      )
    : [];

  const totalMinutes = _.sumBy(chartData, "minutes");

  return (
    <div className="flex flex-col w-full max-w-7xl p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Statistics</h1>
        <p className="text-muted-foreground">
          See which activies are the most popular ones
        </p>
      </div>

      <ChartBarLabel totalMinutes={totalMinutes} chartData={chartData} />
    </div>
  );
}
