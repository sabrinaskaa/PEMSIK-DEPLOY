import React from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";

import Card from "@/Pages/Admin/Components/Card";
import { useChartData } from "@/Utils/Hooks/useChart";
import { useMahasiswa } from "@/Utils/Hooks/useMahasiswa";
import { useDosen } from "@/Utils/Hooks/useDosen";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";
import { useKelas } from "@/Utils/Hooks/useKelas";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const StatCard = ({ label, value, color, icon, sub }) => (
  <div className={`bg-white rounded-xl shadow-sm border-l-4 ${color} px-5 py-4 flex items-center gap-4`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value ?? "—"}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow px-3 py-2 text-sm">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-blue-600">{payload[0].value} data</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { data = {}, isLoading: chartLoading } = useChartData();
  const { data: mhsResult = { data: [], total: 0 } } = useMahasiswa();
  const { data: dosenResult = { data: [], total: 0 } } = useDosen();
  const { data: mkResult = { data: [], total: 0 } } = useMataKuliah();
  const { data: kelasResult = { data: [], total: 0 } } = useKelas();

  const mahasiswa = mhsResult.data ?? [];
  const totalMhs = mhsResult.total || mahasiswa.length;
  const totalDosen = dosenResult.total || 0;
  const totalMk = mkResult.total || 0;
  const totalKelas = kelasResult.total || 0;

  const {
    students = [], genderRatio = [], registrations = [],
    gradeDistribution = [], lecturerRanks = [],
  } = data;

  if (chartLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Memuat data dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Ringkasan data akademik dan statistik sistem</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Mahasiswa" value={totalMhs} color="border-blue-600" icon="🎓" sub="Terdaftar" />
        <StatCard label="Total Dosen" value={totalDosen} color="border-green-600" icon="👨‍🏫" sub="Pengajar aktif" />
        <StatCard label="Mata Kuliah" value={totalMk} color="border-purple-600" icon="📚" sub="Tersedia" />
        <StatCard label="Total Kelas" value={totalKelas} color="border-amber-500" icon="🏫" sub="Berjalan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <Card>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Mahasiswa per Fakultas</h3>
              <p className="text-xs text-gray-400 mt-0.5">Distribusi berdasarkan fakultas</p>
            </div>
            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">Bar</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={students} barSize={44}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="faculty" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Rasio Gender Mahasiswa</h3>
              <p className="text-xs text-gray-400 mt-0.5">Perbandingan jenis kelamin</p>
            </div>
            <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2 py-0.5 rounded-full">Pie</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={genderRatio} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={90}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#9ca3af" }}>
                {genderRatio.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Tren Pendaftaran Mahasiswa</h3>
              <p className="text-xs text-gray-400 mt-0.5">Jumlah per tahun</p>
            </div>
            <span className="bg-green-50 text-green-600 text-xs font-medium px-2 py-0.5 rounded-full">Line</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={registrations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={2.5}
                dot={{ r: 4, fill: "#16a34a" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Distribusi Nilai per Jurusan</h3>
              <p className="text-xs text-gray-400 mt-0.5">Grade A, B, C per prodi</p>
            </div>
            <span className="bg-amber-50 text-amber-600 text-xs font-medium px-2 py-0.5 rounded-full">Radar</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={gradeDistribution}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fontSize: 10, fill: "#9ca3af" }} />
              <Radar name="A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
              <Radar name="C" dataKey="C" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Distribusi Pangkat Dosen</h3>
                <p className="text-xs text-gray-400 mt-0.5">Jumlah dosen per jabatan akademik</p>
              </div>
              <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full">Area</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={lecturerRanks}>
                <defs>
                  <linearGradient id="colorLecturer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="rank" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLecturer)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Daftar Mahasiswa (5 Teratas)</h3>
            <p className="text-xs text-gray-400 mt-0.5">{totalMhs} total mahasiswa terdaftar</p>
          </div>
          <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
            🎓 {totalMhs} total
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-200">
                <th className="px-5 py-3 text-center font-semibold">NIM</th>
                <th className="px-5 py-3 text-left font-semibold">Nama</th>
                <th className="px-5 py-3 text-center font-semibold">Max SKS</th>
                <th className="px-5 py-3 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mahasiswa.slice(0, 5).length > 0
                ? mahasiswa.slice(0, 5).map((mhs) => (
                    <tr key={mhs.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-5 py-3 text-center">
                        <span className="bg-blue-50 text-blue-700 text-xs font-mono px-2 py-0.5 rounded">
                          {mhs.nim}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-800">{mhs.nama}</td>
                      <td className="px-5 py-3 text-center font-semibold text-gray-700">{mhs.max_sks ?? "—"}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          mhs.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {mhs.status ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </td>
                    </tr>
                  ))
                : (
                  <tr>
                    <td colSpan="4" className="px-5 py-8 text-center text-gray-400 text-sm">
                      Data mahasiswa belum ada.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
