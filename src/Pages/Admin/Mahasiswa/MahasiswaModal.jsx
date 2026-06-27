import { useEffect, useState } from "react";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";

const MahasiswaModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
}) => {
  const [form, setForm] = useState({
    id: "", nim: "", nama: "", max_sks: 0, status: true,
  });

  const isEdit = !!selectedMahasiswa;

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        id: selectedMahasiswa.id || "",
        nim: selectedMahasiswa.nim || "",
        nama: selectedMahasiswa.nama || "",
        max_sks: selectedMahasiswa.max_sks ?? 0,
        status: selectedMahasiswa.status ?? true,
      });
    } else {
      setForm({ id: "", nim: "", nama: "", max_sks: 0, status: true });
    }
  }, [selectedMahasiswa, isModalOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nim.trim() || !form.nama.trim()) {
      alert("NIM dan Nama wajib diisi");
      return;
    }
    onSubmit({
      id: form.id, nim: form.nim.trim(), nama: form.nama.trim(),
      max_sks: Number(form.max_sks), status: form.status,
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

        {/* Header gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-100 text-xs font-medium uppercase tracking-wider">
                  🎓 Mahasiswa
                </span>
              </div>
              <h2 className="text-white text-xl font-bold">
                {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">
                {isEdit ? "Perbarui data mahasiswa" : "Masukkan data mahasiswa baru"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors text-lg"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="nim" className="text-gray-700 font-semibold text-sm">NIM</Label>
            <Input type="text" name="nim" value={form.nim} onChange={handleChange}
              readOnly={isEdit} placeholder="Contoh: A11.2023.15264" required />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nama" className="text-gray-700 font-semibold text-sm">Nama Lengkap</Label>
            <Input type="text" name="nama" value={form.nama} onChange={handleChange}
              placeholder="Masukkan nama lengkap" required />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="max_sks" className="text-gray-700 font-semibold text-sm">Max SKS</Label>
            <Input type="number" name="max_sks" value={form.max_sks} onChange={handleChange}
              placeholder="Contoh: 24" required />
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
            <input
              type="checkbox" name="status" id="status"
              checked={form.status} onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
            <label htmlFor="status" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
              {form.status
                ? <span className="text-green-600">✓ Mahasiswa Aktif</span>
                : <span className="text-gray-400">Tidak Aktif</span>}
            </label>
          </div>

          <div className="border-t border-gray-100 pt-1" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Batal
            </button>
            <button type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
              {isEdit ? "Simpan Perubahan" : "Tambah Mahasiswa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MahasiswaModal;
