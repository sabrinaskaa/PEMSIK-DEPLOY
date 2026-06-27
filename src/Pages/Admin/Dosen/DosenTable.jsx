import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const DosenTable = ({ data = [], openEditModal, onDelete, onDetail, isLoading = false }) => {
  const { user } = useAuthStateContext();

  const empty = (msg) => (
    <tr>
      <td colSpan="3" className="px-5 py-10 text-center text-gray-400 text-sm">
        <div className="flex flex-col items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 opacity-25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
            <th className="px-5 py-3 text-center font-semibold">NIDN</th>
            <th className="px-5 py-3 text-left font-semibold">Nama</th>
            <th className="px-5 py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading
            ? empty("Memuat data...")
            : data.length > 0
            ? data.map((dosen) => (
                <tr key={dosen.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <span className="bg-blue-50 text-blue-700 text-xs font-mono px-2 py-0.5 rounded">
                      {dosen.nidn}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">{dosen.nama}</td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => onDetail(dosen.id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-blue-200 hover:border-blue-300">
                        Detail
                      </button>
                      {user?.permission?.includes("dosen.update") && (
                        <button onClick={() => openEditModal(dosen)}
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-amber-200 hover:border-amber-300">
                          Edit
                        </button>
                      )}
                      {user?.permission?.includes("dosen.delete") && (
                        <button onClick={() => onDelete(dosen.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-red-200 hover:border-red-300">
                          Hapus
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            : empty("Data dosen belum ada.")}
        </tbody>
      </table>
    </div>
  );
};

export default DosenTable;
