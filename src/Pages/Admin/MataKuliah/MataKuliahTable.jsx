import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const MataKuliahTable = ({ data = [], openEditModal, onDelete, isLoading = false }) => {
  const { user } = useAuthStateContext();

  const empty = (msg) => (
    <tr>
      <td colSpan="4" className="px-5 py-10 text-center text-gray-400 text-sm">
        <div className="flex flex-col items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 opacity-25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
            <th className="px-5 py-3 text-center font-semibold">Kode</th>
            <th className="px-5 py-3 text-left font-semibold">Nama Mata Kuliah</th>
            <th className="px-5 py-3 text-center font-semibold">SKS</th>
            <th className="px-5 py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading
            ? empty("Memuat data...")
            : data.length > 0
            ? data.map((mk) => (
                <tr key={mk.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <span className="bg-purple-50 text-purple-700 text-xs font-mono px-2 py-0.5 rounded">
                      {mk.kode}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">{mk.nama}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {mk.sks} SKS
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {user?.permission?.includes("mata-kuliah.update") && (
                        <button onClick={() => openEditModal(mk)}
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-amber-200 hover:border-amber-300">
                          Edit
                        </button>
                      )}
                      {user?.permission?.includes("mata-kuliah.delete") && (
                        <button onClick={() => onDelete(mk.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-red-200 hover:border-red-300">
                          Hapus
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            : empty("Data mata kuliah belum ada.")}
        </tbody>
      </table>
    </div>
  );
};

export default MataKuliahTable;
