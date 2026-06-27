import { useState, useEffect } from "react";

import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

import { getAllKelas, storeKelas, updateKelas, deleteKelas } from "@/Utils/Apis/KelasApi";
import { getAllDosen } from "@/Utils/Apis/DosenApi";
import { getAllMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { getAllMataKuliah } from "@/Utils/Apis/MataKuliahApi";

import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import { confirmDelete } from "@/Utils/Helpers/SwalHelpers";

import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import TableRencanaStudi from "./TableRencanaStudi";
import ModalRencanaStudi from "./ModalRencanaStudi";

const RencanaStudi = () => {
  const { user } = useAuthStateContext();

  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});

  const [form, setForm] = useState({ mata_kuliah_id: "", dosen_id: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [resKelas, resDosen, resMahasiswa, resMataKuliah] = await Promise.all([
      getAllKelas(),
      getAllDosen(),
      getAllMahasiswa(),
      getAllMataKuliah(),
    ]);
    setKelas(resKelas.data);
    setDosen(resDosen.data);
    setMahasiswa(resMahasiswa.data);
    setMataKuliah(resMataKuliah.data);
  };

  // Mata kuliah yang sudah punya kelas
  const mataKuliahSudahDipakai = kelas.map((k) => k.mata_kuliah_id);

  // Mata kuliah yang belum punya kelas (untuk dropdown di modal)
  const mataKuliahBelumAdaKelas = mataKuliah.filter(
    (mk) => !mataKuliahSudahDipakai.includes(mk.id)
  );

  // Mendapatkan max_sks mahasiswa berdasarkan id
  const getMaxSks = (mhsId) => {
    const mhs = mahasiswa.find((m) => m.id === mhsId);
    return mhs ? mhs.max_sks : 0;
  };

  // Mendapatkan max_sks dosen berdasarkan id
  const getDosenMaxSks = (dosenId) => {
    const d = dosen.find((d) => d.id === dosenId);
    return d ? d.max_sks : 0;
  };

  // Handler: tambah mahasiswa ke kelas
  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    if (!mhsId) {
      toastError("Pilih mahasiswa terlebih dahulu");
      return;
    }

    // Cari sks mata kuliah dari kelas ini
    const mk = mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id);
    const sks = mk ? mk.sks : 0;

    // Hitung total SKS mahasiswa saat ini di semua kelas
    const totalSksMahasiswa = kelas
      .filter((k) => (k.mahasiswa_ids || []).includes(mhsId))
      .map((k) => {
        const mk = mataKuliah.find((m) => m.id === k.mata_kuliah_id);
        return mk ? mk.sks : 0;
      })
      .reduce((acc, val) => acc + val, 0);

    const maxSks = getMaxSks(mhsId);

    if (totalSksMahasiswa + sks > maxSks) {
      toastError(
        `SKS melebihi batas maksimal (Max: ${maxSks} SKS, saat ini: ${totalSksMahasiswa} SKS, ditambah: ${sks} SKS)`
      );
      return;
    }

    if ((kelasItem.mahasiswa_ids || []).includes(mhsId)) {
      toastError("Mahasiswa sudah terdaftar di kelas ini");
      return;
    }

    const updated = {
      ...kelasItem,
      mahasiswa_ids: [...(kelasItem.mahasiswa_ids || []), mhsId],
    };

    await updateKelas(kelasItem.id, updated);
    toastSuccess("Mahasiswa ditambahkan");

    setSelectedMhs((prev) => ({ ...prev, [kelasItem.id]: "" }));
    fetchData();
  };

  // Handler: hapus mahasiswa dari kelas
  const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
    const updated = {
      ...kelasItem,
      mahasiswa_ids: (kelasItem.mahasiswa_ids || []).filter((id) => id !== mhsId),
    };

    await updateKelas(kelasItem.id, updated);
    toastSuccess("Mahasiswa dihapus");
    fetchData();
  };

  // Handler: ganti dosen kelas
  const handleChangeDosen = async (kelasItem) => {
    const dsnId = selectedDsn[kelasItem.id];
    if (!dsnId) {
      toastError("Pilih dosen terlebih dahulu");
      return;
    }

    // Hitung total SKS dosen di semua kelas yang dia ampu
    const totalSksDosen = kelas
      .filter((k) => k.dosen_id === dsnId)
      .map((k) => {
        const mk = mataKuliah.find((m) => m.id === k.mata_kuliah_id);
        return mk ? mk.sks : 0;
      })
      .reduce((acc, val) => acc + val, 0);

    // SKS dari kelas yang sedang diubah
    const kelasMk = mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id);
    const kelasSks = kelasMk ? kelasMk.sks : 0;

    const maxSks = getDosenMaxSks(dsnId);

    if (totalSksDosen + kelasSks > maxSks) {
      toastError(
        `Dosen melebihi batas maksimal SKS (Max: ${maxSks} SKS, saat ini: ${totalSksDosen} SKS, ditambah: ${kelasSks} SKS)`
      );
      return;
    }

    await updateKelas(kelasItem.id, { ...kelasItem, dosen_id: dsnId });
    toastSuccess("Dosen diperbarui");
    fetchData();
  };

  // Handler: hapus kelas (hanya jika tidak ada mahasiswa)
  const handleDeleteKelas = (kelasId) => {
    confirmDelete(async () => {
      await deleteKelas(kelasId);
      toastSuccess("Kelas dihapus");
      fetchData();
    });
  };

  // Buka modal tambah kelas
  const openAddModal = () => {
    setForm({ mata_kuliah_id: "", dosen_id: "" });
    setIsModalOpen(true);
  };

  // Helper to generate next class name
  const getNextClassName = (kelasItems) => {
    if (!kelasItems || kelasItems.length === 0) {
      return "A11.4411";
    }
    const namePattern = /^([A-Za-z]+\d*\.)(\d+)$/;
    let maxNum = 0;
    let prefix = "A11.";

    kelasItems.forEach((k) => {
      if (k.nama) {
        const match = k.nama.match(namePattern);
        if (match) {
          const num = parseInt(match[2], 10);
          if (num > maxNum) {
            maxNum = num;
            prefix = match[1];
          }
        }
      }
    });

    if (maxNum === 0) {
      // Fallback: check for any trailing digits
      kelasItems.forEach((k) => {
        if (k.nama) {
          const match = k.nama.match(/^(.*?)(\d+)$/);
          if (match) {
            const num = parseInt(match[2], 10);
            if (num > maxNum) {
              maxNum = num;
              prefix = match[1];
            }
          }
        }
      });
    }

    if (maxNum === 0) {
      return "A11.4411";
    }

    const nextNum = maxNum + 1;
    return `${prefix}${nextNum}`;
  };

  // Handler: submit form tambah kelas
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.mata_kuliah_id || !form.dosen_id) {
      toastError("Form tidak lengkap. Pilih mata kuliah dan dosen.");
      return;
    }

    const nextId = String(
      kelas.reduce((max, k) => Math.max(max, parseInt(k.id, 10) || 0), 0) + 1
    );
    const nextNama = getNextClassName(kelas);

    try {
      await storeKelas({
        id: nextId,
        nama: nextNama,
        mata_kuliah_id: form.mata_kuliah_id,
        dosen_id: form.dosen_id,
        mahasiswa_ids: [],
      });
      setIsModalOpen(false);
      toastSuccess("Kelas ditambahkan");
      fetchData();
    } catch (error) {
      toastError("Gagal menambahkan kelas");
      console.error(error);
    }
  };

  // Handler: perubahan form
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Card>
        {/* ── Page Header ─────────────────────────────────── */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Heading as="h2" className="mb-0 text-left">
              Rencana Studi
            </Heading>
            <p className="text-sm text-gray-400 mt-0.5">
              Kelola kelas, dosen pengampu, dan pendaftaran mahasiswa
            </p>
          </div>

          {user?.permission?.includes("rencana-studi.create") && (
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Kelas
            </button>
          )}
        </div>

        {/* ── Summary Chips ────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
            🏫 {kelas.length} Kelas Aktif
          </span>
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
            👨‍🏫 {dosen.length} Dosen
          </span>
          <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full">
            📚 {mataKuliah.length} Mata Kuliah
          </span>
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-full">
            🎓 {mahasiswa.length} Mahasiswa
          </span>
        </div>

        <TableRencanaStudi
          kelas={kelas}
          mahasiswa={mahasiswa}
          dosen={dosen}
          mataKuliah={mataKuliah}
          selectedMhs={selectedMhs}
          setSelectedMhs={setSelectedMhs}
          selectedDsn={selectedDsn}
          setSelectedDsn={setSelectedDsn}
          handleAddMahasiswa={handleAddMahasiswa}
          handleDeleteMahasiswa={handleDeleteMahasiswa}
          handleChangeDosen={handleChangeDosen}
          handleDeleteKelas={handleDeleteKelas}
        />
      </Card>

      <ModalRencanaStudi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        form={form}
        dosen={dosen}
        mataKuliah={mataKuliahBelumAdaKelas}
      />
    </>
  );
};

export default RencanaStudi;
