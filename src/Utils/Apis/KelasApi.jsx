import AxiosInstance from "@/Utils/AxiosInstance";

export const getAllKelas = (params = {}) => {
  return AxiosInstance.get("/kelas", { params });
};

export const getKelas = (id) => {
  return AxiosInstance.get(`/kelas/${id}`);
};

export const storeKelas = (data) => {
  return AxiosInstance.post("/kelas", data);
};

export const updateKelas = (id, data) => {
  return AxiosInstance.put(`/kelas/${id}`, data);
};

export const deleteKelas = (id) => {
  return AxiosInstance.delete(`/kelas/${id}`);
};
