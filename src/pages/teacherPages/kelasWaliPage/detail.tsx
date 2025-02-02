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
import { NavSubMenu } from "../../../components/navSubmenu";
import { CardPerangkatKelas } from "../../../features/teacherPages/kelasWaliPage/cardPerangkatKelas";
import { StudentDetail } from "../../../interface/student.interface";
import { DaftarAbsensi } from "../../../features/teacherPages/jadwalMengajarPage/absensiSiswaPage/daftarAbsensiKelas";
import {
  IDataSummaryAttendance,
  IDetailStudentAttendance,
} from "../../../interface/studentAttendance.interface";
import StudentAttendanceService from "../../../services/studentAttendanceService";

const subMenuItemsDetailKelasWaliGuru = [
  { label: "Daftar Siswa", key: "daftar-siswa" },
  { label: "Absensi Siswa", key: "absensi-siswa" },
  { label: "Mata Pelajaran Dikelas", key: "mata-pelajaran-dikelas" },
  { label: "Nilai Akhir Siswa", key: "nilai-akhir-siswa" },
];

export const DetailKelasWaliPage: React.FC = () => {
  const navigate = useNavigate();
  const classService = ClassStudentService();
  const studentAttendance = StudentAttendanceService();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(false);

  const [data, setData] = useState<Class>();
  const [students, setstudents] = useState<StudentDetail[]>([]);
  const [listAllStudentsAttendanceHeader, setListAllStudentsAttendanceHeader] =
    useState<IDetailStudentAttendance[] | null>([]);
  const [listAllStudentsAttendance, setListAllStudentsAttendance] = useState<
    IDataSummaryAttendance[] | null
  >([]);

  const [activeMenu, setActiveMenu] = useState("daftar-siswa");
  const handleMenuClick = (menu: string) => {
    if (!loading) {
      setActiveMenu(menu);
    }
  };

  const getData = async () => {
    if (id) {
      try {
        setLoading(true);
        const response = await classService.getClassById(parseInt(id));
        setData(response.data);
        setstudents(response.data.student);
        await handleGetSummaryAttendance(parseInt(id));
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

  const optionsStudents = [
    ...students.map((data) => ({
      value: data.nis,
      label: data.name,
    })),
  ];

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

      {data && (
        <>
          <CardDetailKelas loading={loading} data={data!} />
          <CardPerangkatKelas
            refreshData={getData}
            loading={loading}
            optionsStudents={optionsStudents}
            classId={data.id}
            data={data?.StudentPositionInClass || []} // Tambahkan fallback ke array kosong jika null
          />
        </>
      )}

      <NavSubMenu
        menuItems={subMenuItemsDetailKelasWaliGuru}
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
        ) : activeMenu === "absensi-siswa" ? (
          <DaftarAbsensi
            loading={loading || loadingAttendance}
            data={listAllStudentsAttendance!}
            dataHeader={listAllStudentsAttendanceHeader!}
          />
        ) : activeMenu === "mata-pelajaran-dikelas" ? (
          <CardAbsensiKelas loading={loading} />
        ) : activeMenu === "nilai-akhir-siswa" ? (
          <CardAbsensiKelas loading={loading} />
        ) : (
          "lorem"
        ))}
    </>
  );
};
