import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { AuthProvider } from "./Utils/Contexts/AuthContext";
import AuthLayout from "./Pages/Auth/AuthLayout";
import Login from "./Pages/Auth/Login/Login";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail";
import Dosen from "./Pages/Admin/Dosen/Dosen";
import MataKuliah from "./Pages/Admin/MataKuliah/MataKuliah";
import Kelas from "./Pages/Admin/Kelas/Kelas";
import Krs from "./Pages/Admin/Krs/Krs";
import User from "./Pages/Admin/User/User";
import RencanaStudi from "./Pages/Admin/RencanaStudi/RencanaStudi";
import ProtectedRoute from "./Pages/Admin/Components/ProtectedRoute";
import PageNotFound from "./Pages/Error/PageNotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "mahasiswa",
        element: <Mahasiswa />,
      },
      {
        path: "mahasiswa/:id",
        element: <MahasiswaDetail />,
      },
      {
        path: "krs",
        element: <Krs />,
      },
      {
        path: "dosen",
        element: <Dosen />,
      },
      {
        path: "mata-kuliah",
        element: <MataKuliah />,
      },
      {
        path: "kelas",
        element: <Kelas />,
      },
      {
        path: "rencana-studi",
        element: <RencanaStudi />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
