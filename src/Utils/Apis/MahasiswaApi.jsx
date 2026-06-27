import AxiosInstance from "@/Utils/AxiosInstance";

export const getAllMahasiswa = (params = {}) => {
  return AxiosInstance.get("/mahasiswa", { params });
};

export const getMahasiswa = (id) => {
  return AxiosInstance.get(`/mahasiswa/${id}`);
};

export const storeMahasiswa = (data) => {
  return AxiosInstance.post("/mahasiswa", data);
};

export const updateMahasiswa = (id, data) => {
  return AxiosInstance.put(`/mahasiswa/${id}`, data);
};

export const deleteMahasiswa = (id) => {
  return AxiosInstance.delete(`/mahasiswa/${id}`);
};
