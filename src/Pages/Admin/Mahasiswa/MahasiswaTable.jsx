import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const MahasiswaTable = ({ data = [], openEditModal, onDelete, onDetail, isLoading = false, getTotalSks }) => {
  const { user } = useAuthStateContext();

  const empty = (msg) => (
    <tr>
      <td colSpan="6" className="px-5 py-10 text-center text-gray-400 text-sm">
        <div className="flex flex-col items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 opacity-25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{msg}</span>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-200">
            <th className="px-5 py-3 text-center font-semibold">NIM</th>
            <th className="px-5 py-3 text-left font-semibold">Nama</th>
            <th className="px-5 py-3 text-center font-semibold">Status</th>
            <th className="px-5 py-3 text-center font-semibold">Max SKS</th>
            <th className="px-5 py-3 text-center font-semibold">SKS Terpakai</th>
            <th className="px-5 py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading
            ? empty("Memuat data...")
            : data.length > 0
            ? data.map((mhs) => {
                const totalSks = getTotalSks ? getTotalSks(String(mhs.id)) : 0;
                const pct = mhs.max_sks ? Math.min((totalSks / mhs.max_sks) * 100, 100) : 0;
                const barColor = pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-yellow-400" : "bg-green-500";

                return (
                  <tr key={mhs.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-5 py-3 text-center">
                      <span className="bg-blue-50 text-blue-700 text-xs font-mono px-2 py-0.5 rounded">
                        {mhs.nim}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800">{mhs.nama}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        mhs.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {mhs.status ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center font-semibold text-gray-700">{mhs.max_sks ?? "-"}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold text-gray-700 text-xs">
                          {totalSks}
                          <span className="text-gray-400 font-normal ml-1">/ {mhs.max_sks ?? "?"}</span>
                        </span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <button onClick={() => onDetail(mhs.id)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-blue-200 hover:border-blue-300">
                          Detail
                        </button>
                        {user?.permission?.includes("mahasiswa.update") && (
                          <button onClick={() => openEditModal(mhs)}
                            className="text-amber-600 hover:text-amber-800 hover:bg-amber-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-amber-200 hover:border-amber-300">
                            Edit
                          </button>
                        )}
                        {user?.permission?.includes("mahasiswa.delete") && (
                          <button onClick={() => onDelete(mhs.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-red-200 hover:border-red-300">
                            Hapus
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            : empty("Data mahasiswa belum ada.")}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaTable;
