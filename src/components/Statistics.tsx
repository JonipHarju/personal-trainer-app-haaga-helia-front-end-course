import { fetchAllTrainings } from "@/api/trainings";
import { useQuery } from "@tanstack/react-query";

export default function Statistics() {
  const { data } = useQuery({
    queryKey: ["trainings"],
    queryFn: fetchAllTrainings,
  });

  return <div>Statistics</div>;
}
