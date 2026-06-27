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
  useMataKuliah,
  useStoreMataKuliah,
  useUpdateMataKuliah,
  useDeleteMataKuliah,
} from "@/Utils/Hooks/useMataKuliah";
import MataKuliahTable from "./MataKuliahTable";
import MataKuliahModal from "./MataKuliahModal";

const SORT_OPTIONS = [
  { value: "nama", label: "Nama" },
  { value: "kode", label: "Kode" },
  { value: "sks", label: "SKS" },
];

const MataKuliah = () => {
  const { user } = useAuthStateContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { data: result = { data: [], total: 0 }, isLoading: isLoadingMataKuliah } = useMataKuliah({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: mataKuliah = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const { mutate: store } = useStoreMataKuliah();
  const { mutate: update } = useUpdateMataKuliah();
  const { mutate: remove } = useDeleteMataKuliah();

  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const resetForm = () => {
    setModalOpen(false);
    setSelectedMataKuliah(null);
  };

  const openAddModal = () => {
    setSelectedMataKuliah(null);
    setModalOpen(true);
  };

  const openEditModal = (mk) => {
    setSelectedMataKuliah({ id: mk.id, kode: mk.kode, nama: mk.nama, sks: mk.sks });
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (!formData.kode || !formData.nama || !formData.sks) {
      toastError("Kode, Nama, dan SKS wajib diisi");
      return;
    }
    const isEdit = !!formData.id;
    if (isEdit) {
      confirmUpdate(() => {
        update({ id: formData.id, data: formData });
        resetForm();
      });
    } else {
      const exists = mataKuliah.find((mk) => mk.kode === formData.kode);
      if (exists) {
        toastError("Kode mata kuliah sudah terdaftar");
        return;
      }
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
            <Heading as="h2" className="mb-0 text-left">Daftar Mata Kuliah</Heading>
            <p className="text-sm text-gray-400 mt-0.5">Kelola data mata kuliah</p>
          </div>
          {user?.permission?.includes("mata-kuliah.create") && (
            <button onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Mata Kuliah
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
          searchPlaceholder="Cari nama / kode..."
          sortOptions={SORT_OPTIONS}
        />

        {user?.permission?.includes("mata-kuliah.read") && (
          <MataKuliahTable
            data={mataKuliah}
            openEditModal={openEditModal}
            onDelete={handleDelete}
            isLoading={isLoadingMataKuliah}
          />
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Card>

      <MataKuliahModal
        isModalOpen={isModalOpen}
        onClose={resetForm}
        onSubmit={handleSubmit}
        selectedMataKuliah={selectedMataKuliah}
      />
    </div>
  );
};

export default MataKuliah;
