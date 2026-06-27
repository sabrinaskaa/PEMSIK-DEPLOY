import { Outlet } from "react-router-dom";
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
