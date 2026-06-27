import AxiosInstance from "@/Utils/AxiosInstance";

export const login = async (email, password) => {
  const response = await AxiosInstance.get("/user", {
    params: { email },
  });

  const data = response.data[0];

  if (!data) {
    throw new Error("User tidak ditemukan");
  }

  if (data.password !== password) {
    throw new Error("Password salah");
  }

  return data;
};
