import { useQuery } from "@tanstack/react-query";
import { getAllChartData } from "@/Utils/Apis/ChartApi";

export const useChartData = () => {
  return useQuery({
    queryKey: ["chart", "all"],
    queryFn: getAllChartData,
    select: (res) => res.data,
  });
};
