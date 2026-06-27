import { useEffect, useState } from "react";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";

const ROLES = ["admin", "dosen", "mahasiswa"];

const ROLE_COLOR = {
  admin:     "bg-purple-100 text-purple-700 border-purple-200",
  dosen:     "bg-green-100  text-green-700  border-green-200",
  mahasiswa: "bg-blue-100   text-blue-700   border-blue-200",
};

const UserModal = ({ isModalOpen, onClose, onSubmit, selectedUser }) => {
  const [form, setForm] = useState({
    id: "", name: "", email: "", password: "", role: "mahasiswa",
  });

  const isEdit = !!selectedUser;

  useEffect(() => {
    if (selectedUser) {
      setForm({
        id:         selectedUser.id       || "",
        name:       selectedUser.name     || "",
        email:      selectedUser.email    || "",
        password:   "",
        role:       selectedUser.role     || "mahasiswa",
        permission: selectedUser.permission ?? [],
      });
    } else {
      setForm({ id: "", name: "", email: "", password: "", role: "mahasiswa" });
    }
  }, [selectedUser, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (isEdit && !payload.password) {
      payload.password = selectedUser.password;
    }
    onSubmit(payload);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

        {/* Header gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-blue-100 text-xs font-medium uppercase tracking-wider">
                👤 Manajemen User
              </span>
              <h2 className="text-white text-xl font-bold mt-1">
                {isEdit ? "Edit User" : "Tambah User"}
              </h2>
              <p className="text-blue-100 text-xs mt-0.5">
                {isEdit ? "Perbarui data akun pengguna" : "Buat akun pengguna baru"}
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

          {/* Nama */}
          <div className="space-y-1.5">
            <Label htmlFor="user-name" className="text-gray-700 font-semibold text-sm">
              Nama Lengkap
            </Label>
            <Input
              type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Masukkan nama lengkap" required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="user-email" className="text-gray-700 font-semibold text-sm">
              Email
            </Label>
            <Input
              type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="Masukkan alamat email" required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="user-password" className="text-gray-700 font-semibold text-sm">
              Password
              {isEdit && (
                <span className="ml-1.5 text-xs text-gray-400 font-normal">
                  (kosongkan jika tidak ingin mengubah)
                </span>
              )}
            </Label>
            <Input
              type="password" name="password" value={form.password} onChange={handleChange}
              placeholder={isEdit ? "••••••••" : "Masukkan password"}
              {...(!isEdit && { required: true })}
            />
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <Label className="text-gray-700 font-semibold text-sm">Role</Label>
            <div className="flex gap-2 flex-wrap">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, role: r }))}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                    form.role === r
                      ? ROLE_COLOR[r] + " ring-2 ring-offset-1 ring-current"
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {r === "admin" ? "🛡️" : r === "dosen" ? "👨‍🏫" : "🎓"}
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-1" />

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button" onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              {isEdit ? "Simpan Perubahan" : "Tambah User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
