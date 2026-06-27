import AxiosInstance from "@/Utils/AxiosInstance";

export const getAllDosen = (params = {}) => {
  return AxiosInstance.get("/dosen", { params });
};

export const getDosen = (id) => {
  return AxiosInstance.get(`/dosen/${id}`);
};

export const storeDosen = (data) => {
  return AxiosInstance.post("/dosen", data);
};

export const updateDosen = (id, data) => {
  return AxiosInstance.put(`/dosen/${id}`, data);
};

export const deleteDosen = (id) => {
  return AxiosInstance.delete(`/dosen/${id}`);
};
