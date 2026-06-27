import AxiosInstance from "@/Utils/AxiosInstance";

export const getAllUser = (params = {}) => {
  return AxiosInstance.get("/user", { params });
};

export const getUser = (id) => {
  return AxiosInstance.get(`/user/${id}`);
};

export const storeUser = (data) => {
  return AxiosInstance.post("/user", data);
};

export const updateUser = (id, data) => {
  return AxiosInstance.put(`/user/${id}`, data);
};

export const deleteUser = (id) => {
  return AxiosInstance.delete(`/user/${id}`);
};
