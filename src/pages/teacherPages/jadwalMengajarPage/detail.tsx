import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import { decodeToken, Toast } from "../../../utils/myFunctions";
import StaffService from "../../../services/staffService";
import useCookie from "react-use-cookie";
import { CourseInClass } from "../../../interface/courseInClass.interface";
import { CardDetailKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardDetailKelas";
import { CardAbsensiKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardAbsensiKelas";
import { CardNilaiKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardNilaiKelas";
import { CardDaftarSiswaKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardDaftarSiswaKelas";
import { AxiosError } from "axios";

export const DetailJadwalMengajarPage: React.FC = () => {
  const navigate = useNavigate();
  const teacherService = StaffService();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CourseInClass>();
  const [teacherName, setTeacherName] = useState("");

  const [activeMenu, setActiveMenu] = useState("daftar-siswa");
  const handleMenuClick = (menu: string) => {
    if (!loading) {
      setActiveMenu(menu);
    }
  };

  const getData = async () => {
    if (id) {
      const dtoken = decodeToken(userLoginCookie.token);
      try {
        setLoading(true);
        const response = await teacherService.getClassOfTeacher(
          dtoken.username,
          id
        );
        setTeacherName(response.data.name);
        setData(response.data.CourseInClass[0]);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          Toast.fire({
            icon: "error",
            title: `Data Tidak Ditemukan!`,
            timer: 4000,
          });
          navigate("/");
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
        title="Detail Kelas Guru"
        subTitle="Detail Kelas Guru SMKN 1 Lumban Julu"
        backDisplay={true}
        addDisplay={false}
        linkAdd="tambah"
      />

      <CardDetailKelas
        loading={loading}
        data={data!}
        teacherName={teacherName}
      />

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
              Absensi
            </a>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${loading ? "disabled" : ""} ${
                activeMenu === "nilai" ? "active text-blue" : "text-dark"
              }`}
              onClick={() => handleMenuClick("nilai")}
            >
              Nilai
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
          <CardNilaiKelas
            refreshData={getData}
            loading={loading}
            data={data!}
          />
        ))}
    </>
  );
};
