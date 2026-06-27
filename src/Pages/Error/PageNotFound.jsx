import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="mt-2 mb-4 text-gray-600">Halaman tidak ditemukan</p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">
        Kembali ke Login
      </Link>
    </div>
  );
};

export default PageNotFound;
