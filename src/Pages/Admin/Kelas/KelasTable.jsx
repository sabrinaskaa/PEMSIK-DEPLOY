import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const KelasTable = ({ data = [], openEditModal, onDelete, isLoading = false }) => {
  const { user } = useAuthStateContext();

  const empty = (msg) => (
    <tr>
      <td colSpan="2" className="px-5 py-10 text-center text-gray-400 text-sm">
        <div className="flex flex-col items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 opacity-25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
            <th className="px-5 py-3 text-left font-semibold">Kode Kelas</th>
            <th className="px-5 py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading
            ? empty("Memuat data...")
            : data.length > 0
            ? data.map((kelas) => (
                <tr key={kelas.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-mono px-2 py-0.5 rounded font-semibold">
                      {kelas.nama}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {user?.permission?.includes("kelas.update") && (
                        <button onClick={() => openEditModal(kelas)}
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-amber-200 hover:border-amber-300">
                          Edit
                        </button>
                      )}
                      {user?.permission?.includes("kelas.delete") && (
                        <button onClick={() => onDelete(kelas.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-red-200 hover:border-red-300">
                          Hapus
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            : empty("Data kelas belum ada.")}
        </tbody>
      </table>
    </div>
  );
};

export default KelasTable;
