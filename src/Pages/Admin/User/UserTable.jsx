import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const ROLE_BADGE = {
  admin:     "bg-purple-100 text-purple-700",
  mahasiswa: "bg-blue-100   text-blue-700",
  dosen:     "bg-green-100  text-green-700",
};

const ROLE_ICON = {
  admin:     "🛡️",
  mahasiswa: "🎓",
  dosen:     "👨‍🏫",
};

const UserTable = ({ data = [], openEditModal, onDelete, isLoading = false }) => {
  const { user: currentUser } = useAuthStateContext();

  const empty = (msg) => (
    <tr>
      <td colSpan="4" className="px-5 py-10 text-center text-gray-400 text-sm">
        <div className="flex flex-col items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 opacity-25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
            <th className="px-5 py-3 text-left font-semibold">Nama</th>
            <th className="px-5 py-3 text-left font-semibold">Email</th>
            <th className="px-5 py-3 text-center font-semibold">Role</th>
            <th className="px-5 py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading
            ? empty("Memuat data...")
            : data.length > 0
            ? data.map((u) => (
                <tr
                  key={u.id}
                  className={`transition-colors ${
                    u.id === currentUser?.id ? "bg-blue-50/60" : "hover:bg-blue-50/40"
                  }`}
                >
                  {/* Nama + avatar */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold shrink-0 shadow-sm">
                        {u.name?.charAt(0)?.toUpperCase() ?? "?"}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{u.name}</p>
                        {u.id === currentUser?.id && (
                          <p className="text-xs text-blue-500 font-medium">Anda</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-3 text-gray-500">{u.email}</td>

                  {/* Role badge */}
                  <td className="px-5 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      ROLE_BADGE[u.role] ?? "bg-gray-100 text-gray-600"
                    }`}>
                      <span>{ROLE_ICON[u.role] ?? "👤"}</span>
                      {u.role}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {currentUser?.permission?.includes("user.update") && (
                        <button
                          onClick={() => openEditModal(u)}
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-amber-200 hover:border-amber-300"
                        >
                          Edit
                        </button>
                      )}
                      {currentUser?.permission?.includes("user.delete") && u.id !== currentUser?.id && (
                        <button
                          onClick={() => onDelete(u.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                        >
                          Hapus
                        </button>
                      )}
                      {u.id === currentUser?.id && (
                        <span className="text-xs text-gray-300 italic">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            : empty("Data user belum ada.")}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
