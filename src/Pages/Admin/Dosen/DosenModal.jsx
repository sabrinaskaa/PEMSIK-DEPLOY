import { useEffect, useState } from "react";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";

const DosenModal = ({ isModalOpen, onClose, onSubmit, selectedDosen }) => {
  const [form, setForm] = useState({ id: "", nidn: "", nama: "" });
  const isEdit = !!selectedDosen;

  useEffect(() => {
    if (selectedDosen) {
      setForm({ id: selectedDosen.id || "", nidn: selectedDosen.nidn || "", nama: selectedDosen.nama || "" });
    } else {
      setForm({ id: "", nidn: "", nama: "" });
    }
  }, [selectedDosen, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nidn.trim() || !form.nama.trim()) {
      alert("NIDN dan Nama wajib diisi");
      return;
    }
    onSubmit({ id: form.id, nidn: form.nidn.trim(), nama: form.nama.trim() });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-blue-100 text-xs font-medium uppercase tracking-wider">👨‍🏫 Dosen</span>
              <h2 className="text-white text-xl font-bold mt-1">
                {isEdit ? "Edit Dosen" : "Tambah Dosen"}
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">
                {isEdit ? "Perbarui data dosen" : "Masukkan data dosen baru"}
              </p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors text-lg">
              &times;
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="nidn" className="text-gray-700 font-semibold text-sm">NIDN</Label>
            <Input type="text" name="nidn" value={form.nidn} onChange={handleChange}
              readOnly={isEdit} placeholder="Contoh: 0630048802" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nama" className="text-gray-700 font-semibold text-sm">Nama Dosen</Label>
            <Input type="text" name="nama" value={form.nama} onChange={handleChange}
              placeholder="Masukkan nama dosen" required />
          </div>

          <div className="border-t border-gray-100 pt-1" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Batal
            </button>
            <button type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
              {isEdit ? "Simpan Perubahan" : "Tambah Dosen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DosenModal;
