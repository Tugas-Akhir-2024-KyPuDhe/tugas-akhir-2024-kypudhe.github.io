import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import { decodeToken, Toast } from "../../../utils/myFunctions";
import StaffService from "../../../services/staffService";
import useCookie from "react-use-cookie";
import { CourseInClass } from "../../../interface/courseInClass.interface";
import { CardDetailKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardDetailKelas";
import { CardNilaiKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardNilaiKelas";
import { CardDaftarSiswaKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardDaftarSiswaKelas";
import { AxiosError } from "axios";
import { NavSubMenu } from "../../../components/navSubmenu";
import { DaftarAbsensi } from "../../../features/teacherPages/jadwalMengajarPage/absensiSiswaPage/daftarAbsensiKelas";
import {
  IDataSummaryAttendance,
  IDetailStudentAttendance,
} from "../../../interface/studentAttendance.interface";
import StudentAttendanceService from "../../../services/studentAttendanceService";

const subMenuItemsDetailKelasGuru = [
  { label: "Daftar Siswa", key: "daftar-siswa" },
  { label: "Absensi", key: "absensi" },
  { label: "Nilai", key: "nilai" },
];

export const DetailJadwalMengajarPage: React.FC = () => {
  const navigate = useNavigate();
  const teacherService = StaffService();
  const studentAttendance = StudentAttendanceService();

  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(false);
  const [listAllStudentsAttendanceHeader, setListAllStudentsAttendanceHeader] =
    useState<IDetailStudentAttendance[] | null>([]);
  const [listAllStudentsAttendance, setListAllStudentsAttendance] = useState<
    IDataSummaryAttendance[] | null
  >([]);
  const [data, setData] = useState<CourseInClass>();
  const [teacherName, setTeacherName] = useState("");

  const [activeMenu, setActiveMenu] = useState("daftar-siswa");
  const handleMenuClick = (menu: string) => {
    if (!loading) {
      setActiveMenu(menu);
    }
  };

  const handleGetSummaryAttendance = async (classId: number) => {
    try {
      setLoadingAttendance(true);
      const response = await studentAttendance.getAttendanceSummaryInClass(
        classId
      );
      if (response.status === 200) {
        setListAllStudentsAttendance(response.data);
        setListAllStudentsAttendanceHeader(response.data[0].absensi);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        setListAllStudentsAttendance(null);
      }
      console.error(error);
    } finally {
      setLoadingAttendance(false);
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
        await handleGetSummaryAttendance(
          response.data.CourseInClass[0].class.id
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

      <NavSubMenu
        menuItems={subMenuItemsDetailKelasGuru}
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
      />

      {data &&
        (activeMenu === "daftar-siswa" ? (
          <CardDaftarSiswaKelas
            refreshData={getData}
            loading={loading}
            data={data!}
          />
        ) : activeMenu === "absensi" ? (
          <DaftarAbsensi
            loading={loading || loadingAttendance}
            data={listAllStudentsAttendance!}
            dataHeader={listAllStudentsAttendanceHeader!}
          />
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
