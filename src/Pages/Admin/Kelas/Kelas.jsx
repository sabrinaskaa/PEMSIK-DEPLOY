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
  useKelas,
  useStoreKelas,
  useUpdateKelas,
  useDeleteKelas,
} from "@/Utils/Hooks/useKelas";
import KelasTable from "./KelasTable";
import KelasModal from "./KelasModal";

const SORT_OPTIONS = [
  { value: "nama", label: "Nama" },
];

const Kelas = () => {
  const { user } = useAuthStateContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { data: result = { data: [], total: 0 }, isLoading: isLoadingKelas } = useKelas({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: kelas = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const { mutate: store } = useStoreKelas();
  const { mutate: update } = useUpdateKelas();
  const { mutate: remove } = useDeleteKelas();

  const [selectedKelas, setSelectedKelas] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const resetForm = () => {
    setModalOpen(false);
    setSelectedKelas(null);
  };

  const openAddModal = () => {
    setSelectedKelas(null);
    setModalOpen(true);
  };

  const openEditModal = (k) => {
    setSelectedKelas({ id: k.id, nama: k.nama });
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (!formData.nama) {
      toastError("Nama Kelas wajib diisi");
      return;
    }
    const isEdit = !!formData.id;
    if (isEdit) {
      confirmUpdate(() => {
        update({ id: formData.id, data: formData });
        resetForm();
      });
    } else {
      store(formData);
      resetForm();
    }
  };

  const handleDelete = (id) => confirmDelete(() => remove(id));

  const resetPage = () => setPage(1);
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <Heading as="h2" className="mb-0 text-left">Daftar Kelas</Heading>
            <p className="text-sm text-gray-400 mt-0.5">Kelola data kode kelas</p>
          </div>
          {user?.permission?.includes("kelas.create") && (
            <button onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Kelas
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
          searchPlaceholder="Cari nama kelas..."
          sortOptions={SORT_OPTIONS}
        />

        {user?.permission?.includes("kelas.read") && (
          <KelasTable
            data={kelas}
            openEditModal={openEditModal}
            onDelete={handleDelete}
            isLoading={isLoadingKelas}
          />
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Card>

      <KelasModal
        isModalOpen={isModalOpen}
        onClose={resetForm}
        onSubmit={handleSubmit}
        selectedKelas={selectedKelas}
      />
    </div>
  );
};

export default Kelas;
