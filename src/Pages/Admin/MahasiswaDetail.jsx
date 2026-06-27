import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getMahasiswa(id);
        setMahasiswa(response.data);
      } catch (error) {
        toastError("Gagal memuat detail mahasiswa");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <Card>
        <p>Memuat data...</p>
      </Card>
    );
  }

  if (!mahasiswa) {
    return (
      <Card>
        <Heading as="h2">Detail Mahasiswa</Heading>
        <p>Data tidak ditemukan.</p>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2">Detail Mahasiswa</Heading>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>

      <div className="space-y-3">
        <p>
          <strong>ID:</strong> {mahasiswa.id}
        </p>
        <p>
          <strong>NIM:</strong> {mahasiswa.nim}
        </p>
        <p>
          <strong>Nama:</strong> {mahasiswa.nama}
        </p>
        <p>
          <strong>Status:</strong> {mahasiswa.status ? "Aktif" : "Tidak Aktif"}
        </p>
      </div>
    </Card>
  );
};

export default MahasiswaDetail;
