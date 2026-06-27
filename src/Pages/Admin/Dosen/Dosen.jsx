import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Pagination from "@/Pages/Admin/Components/Pagination";
import TableControls from "@/Pages/Admin/Components/TableControls";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastError } from "@/Utils/Helpers/ToastHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import {
  useDosen,
  useStoreDosen,
  useUpdateDosen,
  useDeleteDosen,
} from "@/Utils/Hooks/useDosen";
import DosenTable from "./DosenTable";
import DosenModal from "./DosenModal";

const SORT_OPTIONS = [
  { value: "nama", label: "Nama" },
  { value: "nidn", label: "NIDN" },
];

const Dosen = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { data: result = { data: [], total: 0 }, isLoading: isLoadingDosen } = useDosen({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: dosen = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const { mutate: store } = useStoreDosen();
  const { mutate: update } = useUpdateDosen();
  const { mutate: remove } = useDeleteDosen();

  const [selectedDosen, setSelectedDosen] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const resetForm = () => {
    setModalOpen(false);
    setSelectedDosen(null);
  };

  const openAddModal = () => {
    setSelectedDosen(null);
    setModalOpen(true);
  };

  const openEditModal = (d) => {
    setSelectedDosen({ id: d.id, nidn: d.nidn, nama: d.nama });
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (!formData.nidn || !formData.nama) {
      toastError("NIDN dan Nama wajib diisi");
      return;
    }
    const isEdit = !!formData.id;
    if (isEdit) {
      confirmUpdate(() => {
        update({ id: formData.id, data: formData });
        resetForm();
      });
    } else {
      const exists = dosen.find((d) => d.nidn === formData.nidn);
      if (exists) {
        toastError("NIDN sudah terdaftar");
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
            <Heading as="h2" className="mb-0 text-left">Daftar Dosen</Heading>
            <p className="text-sm text-gray-400 mt-0.5">Kelola data dosen pengajar</p>
          </div>
          {user?.permission?.includes("dosen.create") && (
            <button onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Dosen
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
          searchPlaceholder="Cari nama / NIDN..."
          sortOptions={SORT_OPTIONS}
        />

        {user?.permission?.includes("dosen.read") && (
          <DosenTable
            data={dosen}
            openEditModal={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/dosen/${id}`)}
            isLoading={isLoadingDosen}
          />
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Card>

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={resetForm}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />
    </div>
  );
};

export default Dosen;
