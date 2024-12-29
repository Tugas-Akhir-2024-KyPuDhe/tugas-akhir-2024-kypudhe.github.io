import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import { CardDetailKelas } from "../../../features/teacherPages/kelasWaliPage/cardDetailKelas";
import { CardAbsensiKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardAbsensiKelas";
import { AxiosError } from "axios";
import ClassStudentService from "../../../services/classStudentService";
import { Class } from "../../../interface/studentClass.interface";
import { CardDaftarSiswaKelas } from "../../../features/teacherPages/kelasWaliPage/cardDaftarSiswaKelas";
import { Toast } from "../../../utils/myFunctions";

export const DetailKelasWaliPage: React.FC = () => {
  const navigate = useNavigate();
  const classService = ClassStudentService();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Class>();

  const [activeMenu, setActiveMenu] = useState("daftar-siswa");
  const handleMenuClick = (menu: string) => {
    if (!loading) {
      // Only allow menu click if not loading
      setActiveMenu(menu);
    }
  };

  const getData = async () => {
    if (id) {
      try {
        setLoading(true);
        const response = await classService.getClassById(parseInt(id));
        setData(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          Toast.fire({
            icon: "error",
            title: `Data Tidak Ditemukan!`,
            timer: 4000,
          });
          navigate("/");
          return;
        }
        Toast.fire({
          icon: "error",
          title: `Terjadi Kesalahan Mengambil Data!`,
          timer: 4000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HeaderTitlePage
        title="Detail Kelas Wali Guru"
        subTitle="Detail Kelas Wali Guru"
        backDisplay={true}
        addDisplay={false}
        linkAdd="tambah"
      />

      <CardDetailKelas loading={loading} data={data!} />

      <div className="m-lg-4 m-md-4 my-4 rounded">
        <ul
          className="nav nav-underline"
          style={{ borderBottom: "0.5px solid grey" }}
        >
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${loading ? "disabled" : ""} ${
                activeMenu === "daftar-siswa" ? "active text-blue" : "text-dark"
              }`}
              aria-disabled="true"
              onClick={() => handleMenuClick("daftar-siswa")}
            >
              Daftar Siswa
            </a>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${loading ? "disabled" : ""} ${
                activeMenu === "absensi" ? "active text-blue" : "text-dark"
              }`}
              onClick={() => handleMenuClick("absensi")}
            >
              Mata Pelajaran Dikelas
            </a>
          </li>
        </ul>
      </div>

      {data &&
        (activeMenu === "daftar-siswa" ? (
          <CardDaftarSiswaKelas
            refreshData={getData}
            loading={loading}
            data={data!}
          />
        ) : activeMenu === "absensi" ? (
          <CardAbsensiKelas loading={loading} />
        ) : (
          <p></p>
          // <CardNilaiKelas
          //   refreshData={getData}
          //   loading={loading}
          //   data={data!}
          // />
        ))}
    </>
  );
};
