import { useState } from "react";
import { confirmLogout } from "@/Utils/Helpers/SwalHelpers";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Header = ({ title = "Mahasiswa" }) => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuthStateContext();
  const handleLogout = () => {
    confirmLogout(() => {
      setUser(null);
      window.location.href = "/";
    });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

        <div className="flex items-center gap-4">
          {user?.role && (
            <span className="text-sm text-gray-500 capitalize">
              Role: <strong>{user.role}</strong>
            </span>
          )}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-8 h-8 rounded-full bg-gray-300 focus:outline-none"
            />

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
