import { useState } from "react";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Pagination from "@/Pages/Admin/Components/Pagination";
import TableControls from "@/Pages/Admin/Components/TableControls";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastError } from "@/Utils/Helpers/ToastHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import {
  useUser,
  useStoreUser,
  useUpdateUser,
  useDeleteUser,
} from "@/Utils/Hooks/useUser";
import UserTable from "./UserTable";
import UserModal from "./UserModal";

const SORT_OPTIONS = [
  { value: "name", label: "Nama" },
  { value: "email", label: "Email" },
  { value: "role", label: "Role" },
];

const User = () => {
  const { user: currentUser } = useAuthStateContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { data: result = { data: [], total: 0 }, isLoading: isLoadingUser } = useUser({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: users = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const { mutate: store } = useStoreUser();
  const { mutate: update } = useUpdateUser();
  const { mutate: remove } = useDeleteUser();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const resetForm = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const openEditModal = (u) => {
    setSelectedUser({
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      role: u.role,
      permission: u.permission ?? [],
    });
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (!formData.name || !formData.email) {
      toastError("Nama dan Email wajib diisi");
      return;
    }
    if (!formData.id && !formData.password) {
      toastError("Password wajib diisi untuk user baru");
      return;
    }

    const isEdit = !!formData.id;

    if (isEdit) {
      confirmUpdate(() => {
        update({ id: formData.id, data: formData });
        resetForm();
      });
    } else {
      const exists = users.find((u) => u.email === formData.email);
      if (exists) {
        toastError("Email sudah terdaftar");
        return;
      }
      // User baru tidak punya permission secara default — bisa diatur manual di db
      store({ ...formData, permission: [] });
      resetForm();
    }
  };

  const handleDelete = (id) => {
    if (id === currentUser?.id) {
      toastError("Tidak dapat menghapus akun sendiri");
      return;
    }
    confirmDelete(() => remove(id));
  };

  const resetPage = () => setPage(1);
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <Heading as="h2" className="mb-0 text-left">Manajemen User</Heading>
            <p className="text-sm text-gray-400 mt-0.5">Kelola akun dan hak akses pengguna</p>
          </div>
          {currentUser?.permission?.includes("user.create") && (
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah User
            </button>
          )}
        </div>

        <TableControls
          search={search}
          onSearch={(v) => { setSearch(v); resetPage(); }}
          sortBy={sortBy}
          onSortBy={(v) => { setSortBy(v); resetPage(); }}
          sortOrder={sortOrder}
          onSortOrder={(v) => { setSortOrder(v); resetPage(); }}
          limit={limit}
          onLimit={(v) => { setLimit(v); resetPage(); }}
          searchPlaceholder="Cari nama / email..."
          sortOptions={SORT_OPTIONS}
        />

        {currentUser?.permission?.includes("user.read") && (
          <UserTable
            data={users}
            openEditModal={openEditModal}
            onDelete={handleDelete}
            isLoading={isLoadingUser}
          />
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Card>

      <UserModal
        isModalOpen={isModalOpen}
        onClose={resetForm}
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default User;
