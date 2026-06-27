import AxiosInstance from "@/Utils/AxiosInstance";

export const getAllChartData = () => {
  return AxiosInstance.get("/chart");
};
