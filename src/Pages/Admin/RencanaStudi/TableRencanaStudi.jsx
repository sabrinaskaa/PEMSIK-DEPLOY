import Select from "@/Pages/Admin/Components/Select";
import Button from "@/Pages/Admin/Components/Button";

const TableRencanaStudi = ({
  kelas,
  mahasiswa,
  dosen,
  mataKuliah,
  selectedMhs,
  setSelectedMhs,
  selectedDsn,
  setSelectedDsn,
  handleAddMahasiswa,
  handleDeleteMahasiswa,
  handleChangeDosen,
  handleDeleteKelas,
}) => {
  if (kelas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mb-4 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <p className="text-base font-medium">Belum ada kelas</p>
        <p className="text-sm mt-1 opacity-70">
          Klik tombol &quot;+ Tambah Kelas&quot; untuk memulai.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {kelas.map((kls) => {
        const matkul = mataKuliah.find((mk) => mk.id === kls.mata_kuliah_id);
        const dosenPengampu = dosen.find((d) => d.id === kls.dosen_id);
        const mhsInClass = (kls.mahasiswa_ids || [])
          .map((id) => mahasiswa.find((m) => m.id === id))
          .filter(Boolean);

        return (
          <div
            key={kls.id}
            className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white"
          >
            {/* ── Card Header ────────────────────────────── */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4">
              <div className="flex justify-between items-start flex-wrap gap-3">
                {/* Info kelas */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {kls.nama}
                    </span>
                    <span className="bg-blue-400/40 text-white text-xs px-2 py-0.5 rounded-full">
                      {matkul ? `${matkul.sks} SKS` : "? SKS"}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-lg mt-1">
                    {matkul ? matkul.nama : (
                      <span className="italic opacity-70">Mata Kuliah tidak ditemukan</span>
                    )}
                  </h3>
                  {matkul && (
                    <p className="text-blue-100 text-xs mt-0.5">
                      Kode: {matkul.kode}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-blue-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <p className="text-sm text-blue-100">
                      {dosenPengampu ? dosenPengampu.nama : (
                        <span className="italic opacity-70">Belum ada dosen</span>
                      )}
                      {dosenPengampu && (
                        <span className="opacity-60 ml-1">
                          ({dosenPengampu.nidn})
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Ganti Dosen + Hapus Kelas */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Select
                    size="sm"
                    value={selectedDsn[kls.id] || ""}
                    onChange={(e) =>
                      setSelectedDsn((prev) => ({
                        ...prev,
                        [kls.id]: e.target.value,
                      }))
                    }
                    className="bg-white/95 text-gray-700 w-48 text-sm rounded-lg border-0 shadow-sm"
                  >
                    <option value="">-- Ganti Dosen --</option>
                    {dosen.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nama}
                      </option>
                    ))}
                  </Select>

                  <button
                    onClick={() => handleChangeDosen(kls)}
                    className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors border border-white/30"
                  >
                    Simpan
                  </button>

                  {mhsInClass.length === 0 && (
                    <button
                      onClick={() => handleDeleteKelas(kls.id)}
                      className="bg-red-500/80 hover:bg-red-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Hapus Kelas
                    </button>
                  )}
                </div>
              </div>

              {/* Stat bar */}
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-blue-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-blue-100 text-xs">
                    <span className="font-bold text-white">{mhsInClass.length}</span>{" "}
                    mahasiswa terdaftar
                  </span>
                </div>
              </div>
            </div>

            {/* ── Tabel Mahasiswa ──────────────────────────── */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-200">
                    <th className="px-5 py-3 text-center font-semibold w-10">#</th>
                    <th className="px-5 py-3 text-left font-semibold">Nama Mahasiswa</th>
                    <th className="px-5 py-3 text-center font-semibold">NIM</th>
                    <th className="px-5 py-3 text-center font-semibold">Total SKS</th>
                    <th className="px-5 py-3 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mhsInClass.length > 0 ? (
                    mhsInClass.map((m, index) => {
                      const totalSks = kelas
                        .filter((k) => (k.mahasiswa_ids || []).includes(m.id))
                        .map((k) => {
                          const mk = mataKuliah.find((mk) => mk.id === k.mata_kuliah_id);
                          return mk ? mk.sks : 0;
                        })
                        .reduce((acc, sks) => acc + sks, 0);

                      const pctSks = m.max_sks ? Math.min((totalSks / m.max_sks) * 100, 100) : 0;
                      const barColor =
                        pctSks >= 90
                          ? "bg-red-500"
                          : pctSks >= 70
                          ? "bg-yellow-400"
                          : "bg-green-500";

                      return (
                        <tr
                          key={m.id}
                          className="hover:bg-blue-50/40 transition-colors"
                        >
                          <td className="px-5 py-3 text-center text-gray-400 font-medium">
                            {index + 1}
                          </td>
                          <td className="px-5 py-3">
                            <div className="font-medium text-gray-800">{m.nama}</div>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <span className="bg-blue-50 text-blue-700 text-xs font-mono px-2 py-0.5 rounded">
                              {m.nim}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-semibold text-gray-700">
                                {totalSks}
                                <span className="text-gray-400 font-normal text-xs ml-1">
                                  / {m.max_sks ?? "?"}
                                </span>
                              </span>
                              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${barColor}`}
                                  style={{ width: `${pctSks}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <button
                              onClick={() => handleDeleteMahasiswa(kls, m.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-5 py-8 text-center text-gray-400 text-sm">
                        <div className="flex flex-col items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Belum ada mahasiswa di kelas ini</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Footer: Tambah Mahasiswa ─────────────────── */}
            <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center gap-3 flex-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <Select
                size="sm"
                value={selectedMhs[kls.id] || ""}
                onChange={(e) =>
                  setSelectedMhs((prev) => ({
                    ...prev,
                    [kls.id]: e.target.value,
                  }))
                }
                className="flex-1 min-w-[200px]"
              >
                <option value="">-- Pilih Mahasiswa untuk ditambahkan --</option>
                {mahasiswa.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nama} — {m.nim}
                  </option>
                ))}
              </Select>

              <Button
                size="sm"
                onClick={() => handleAddMahasiswa(kls, selectedMhs[kls.id])}
              >
                + Tambah
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRencanaStudi;
