import Select from "@/Pages/Admin/Components/Select";
import Button from "@/Pages/Admin/Components/Button";
import Label from "@/Pages/Admin/Components/Label";

const ModalRencanaStudi = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  form,
  dosen,
  mataKuliah,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* ── Header dengan gradient ── */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-blue-100 text-xs font-medium uppercase tracking-wider">
                  Rencana Studi
                </span>
              </div>
              <h2 className="text-white text-xl font-bold">Tambah Kelas Baru</h2>
              <p className="text-blue-100 text-xs mt-0.5">
                Pilih mata kuliah dan dosen pengampu
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors text-lg leading-none"
            >
              &times;
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <form onSubmit={onSubmit} className="p-6 space-y-5">

          {/* Mata Kuliah */}
          <div className="space-y-1.5">
            <Label htmlFor="mata_kuliah_id" className="text-gray-700 font-semibold text-sm">
              📚 Mata Kuliah
            </Label>
            <Select
              name="mata_kuliah_id"
              value={form.mata_kuliah_id}
              onChange={onChange}
              className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors"
            >
              <option value="">-- Pilih Mata Kuliah --</option>
              {mataKuliah.map((mk) => (
                <option key={mk.id} value={mk.id}>
                  [{mk.kode}] {mk.nama} ({mk.sks} SKS)
                </option>
              ))}
            </Select>
            {mataKuliah.length === 0 && (
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <span>⚠️</span> Semua mata kuliah sudah memiliki kelas.
              </p>
            )}
          </div>

          {/* Dosen */}
          <div className="space-y-1.5">
            <Label htmlFor="dosen_id" className="text-gray-700 font-semibold text-sm">
              👨‍🏫 Dosen Pengampu
            </Label>
            <Select
              name="dosen_id"
              value={form.dosen_id}
              onChange={onChange}
              className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors"
            >
              <option value="">-- Pilih Dosen --</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nama} — Max {d.max_sks} SKS
                </option>
              ))}
            </Select>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-1" />

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Simpan Kelas
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ModalRencanaStudi;
