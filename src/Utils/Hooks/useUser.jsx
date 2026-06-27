import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  getAllUser,
  storeUser,
  updateUser,
  deleteUser,
} from "@/Utils/Apis/UserApi";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

export const useUser = (query = {}) => {
  return useQuery({
    queryKey: ["user", query],
    queryFn: () => getAllUser(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers["x-total-count"] ?? "0", 10),
    }),
    placeholderData: keepPreviousData,
  });
};

export const useStoreUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toastSuccess("User berhasil ditambahkan");
    },
    onError: () => {
      toastError("Gagal menambahkan user");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toastSuccess("User berhasil diperbarui");
    },
    onError: () => {
      toastError("Gagal memperbarui user");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toastSuccess("User berhasil dihapus");
    },
    onError: () => {
      toastError("Gagal menghapus user");
    },
  });
};
