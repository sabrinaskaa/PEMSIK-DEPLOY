import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";
import Pagination from "@/Pages/Admin/Components/Pagination";
import TableControls from "@/Pages/Admin/Components/TableControls";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastError } from "@/Utils/Helpers/ToastHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "@/Utils/Hooks/useMahasiswa";
import { useKelas } from "@/Utils/Hooks/useKelas";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";

import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

const SORT_OPTIONS = [
  { value: "name", label: "Nama" },
  { value: "nim", label: "NIM" },
  { value: "max_sks", label: "Max SKS" },
];

const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { data: result = { data: [], total: 0 }, isLoading: isLoadingMahasiswa } = useMahasiswa({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: mahasiswa = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  // useKelas & useMataKuliah tanpa query (load semua untuk keperluan modal)
  const { data: kelasResult = { data: [] } } = useKelas();
  const { data: mkResult = { data: [] } } = useMataKuliah();
  const kelas = kelasResult.data ?? [];
  const mataKuliah = mkResult.data ?? [];

  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const resetForm = () => {
    setModalOpen(false);
    setSelectedMahasiswa(null);
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa({ id: mhs.id, nim: mhs.nim, nama: mhs.nama, max_sks: mhs.max_sks ?? 0 });
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (!formData.nim || !formData.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }
    const isEdit = !!formData.id;
    if (isEdit) {
      confirmUpdate(() => {
        update({ id: formData.id, data: formData });
        resetForm();
      });
    } else {
      const exists = mahasiswa.find((mhs) => mhs.nim === formData.nim);
      if (exists) {
        toastError("NIM sudah terdaftar");
        return;
      }
      store(formData);
      resetForm();
    }
  };

  const handleDelete = (id) => confirmDelete(() => remove(id));

  // Hitung total SKS mahasiswa berdasarkan id dari semua kelas yang diikutinya
  const getTotalSks = (mhsId) => {
    return kelas
      .filter((k) => (k.mahasiswa_ids || []).includes(String(mhsId)))
      .map((k) => {
        const mk = mataKuliah.find((m) => String(m.id) === String(k.mata_kuliah_id));
        return mk?.sks ?? 0;
      })
      .reduce((acc, val) => acc + val, 0);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMahasiswa(null);
  };

  const resetPage = () => setPage(1);
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
            <p className="text-sm text-gray-400 mt-0.5">Kelola data mahasiswa terdaftar</p>
          </div>
          {user?.permission?.includes("mahasiswa.create") && (
            <button onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Mahasiswa
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
          searchPlaceholder="Cari nama / NIM..."
          sortOptions={SORT_OPTIONS}
        />

        {user?.permission?.includes("mahasiswa.read") && (
          <MahasiswaTable
            data={mahasiswa}
            openEditModal={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
            isLoading={isLoadingMahasiswa}
            getTotalSks={getTotalSks}
          />
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Card>

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </div>
  );
};

export default Mahasiswa;
