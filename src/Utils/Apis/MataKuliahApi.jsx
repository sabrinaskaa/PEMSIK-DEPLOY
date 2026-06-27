import AxiosInstance from "@/Utils/AxiosInstance";

export const getAllMataKuliah = (params = {}) => {
  return AxiosInstance.get("/mata-kuliah", { params });
};

export const getMataKuliah = (id) => {
  return AxiosInstance.get(`/mata-kuliah/${id}`);
};

export const storeMataKuliah = (data) => {
  return AxiosInstance.post("/mata-kuliah", data);
};

export const updateMataKuliah = (id, data) => {
  return AxiosInstance.put(`/mata-kuliah/${id}`, data);
};

export const deleteMataKuliah = (id) => {
  return AxiosInstance.delete(`/mata-kuliah/${id}`);
};
