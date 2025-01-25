import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import StudentHistoryService from "../../../../services/studentHistoryService";
import { StudentHistory } from "../../../../interface/studentHistory.interface";
import { CardSumaryDetailKelas } from "../../../../features/studentPages/kelasPage/CardSumaryDetailKelas";
import { CardNilaiDetailKelas } from "../../../../features/studentPages/kelasPage/CardNilaiDetailKelas";
import { CardAbsensiDetailKelas } from "../../../../features/studentPages/kelasPage/CardAbsensiDetailKelas";
import { AxiosError } from "axios";
import {
  decodeToken,
  formatDate,
  showConfirmationDialog,
  Toast,
} from "../../../../utils/myFunctions";
import { CardPerangkatKelas } from "../../../../features/studentPages/kelasPage/CardPerangkatKelas";
import StudentPositionService from "../../../../services/studentPositionInClassService";
import { IStudentPositionInClass } from "../../../../interface/studentPosition.interface";
import { NavSubMenu } from "../../../../components/navSubmenu";
import { InputAbsensi } from "../../../../features/teacherPages/jadwalMengajarPage/absensiSiswaPage/detailContent";
import StudentAttendanceService from "../../../../services/studentAttendanceService";
import {
  IPayloadAttendance,
  UpdateStudentAttendance,
  IStudentAttendanceInClass,
  IUpdateAttendance,
} from "../../../../interface/studentAttendance.interface";
import useCookie from "react-use-cookie";
import ClassStudentService from "../../../../services/classStudentService";

export const DetailKelasSiswaPage: React.FC = () => {
  const [subMenuItemsAbsensi, setSubMenuItemsAbsensi] = useState([
    { label: "Absensi Siswa", key: "absensi-siswa" },
  ]);

  const navigate = useNavigate();
  const studentHistory = StudentHistoryService();
  const studentPosition = StudentPositionService();
  const studentAttendance = StudentAttendanceService();
  const studentClass = ClassStudentService();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(false);
  const [data, setData] = useState<StudentHistory>();
  const [dataPosition, setDataPosition] = useState<IStudentPositionInClass[]>(
    []
  );
  const [dataAttendance, setDataAttendance] =
    useState<IStudentAttendanceInClass | null>();
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const dtoken = decodeToken(userLoginCookie.token);

  const [activeMenu, setActiveMenu] = useState("absensi-siswa");
  const handleMenuClick = (menu: string) => {
    if (!loading) {
      setActiveMenu(menu);
    }
  };

  useEffect(() => {
    const getDataSiswa = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await studentHistory.getStudentHistoryDetail(id);
          setData(response.data);
          await getPositionInClass(parseInt(response.data.currentClassId));

          const today = new Date();
          today.setHours(today.getHours() + 7);
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, "0");
          const day = String(today.getDate()).padStart(2, "0");
          const formattedDateToday = `${year}-${month}-${day}`;
          await handleGetAttendance(
            parseInt(response.data.currentClassId),
            formattedDateToday
          );
          getClass(parseInt(response.data.currentClassId));
        } catch (error) {
          console.error(error);
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            Toast.fire({
              icon: "error",
              title: `Data Tidak Ditemukan!`,
              timer: 4000,
            });
            navigate("/");
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getDataSiswa();
  }, []);

  const getClass = async (id: number) => {
    try {
      setLoading(true);
      const response = await studentClass.getClassById(id);
      const data = response.data;
      const havePosition = data?.StudentPositionInClass.filter(
        (dt) => dt.student.nis == dtoken.nis
      );
      if (havePosition.length > 0) {
        setSubMenuItemsAbsensi([
          ...subMenuItemsAbsensi,
          { label: "Buat Absensi", key: "buat-absensi" },
        ]);
      }
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
    } finally {
      setLoading(false);
    }
  };

  const handleGetAttendance = async (classId: number, dateAtt: string) => {
    try {
      setLoadingAttendance(true);
      const response = await studentAttendance.getAttendanceInClass(
        classId,
        dateAtt
      );
      if (response.status === 200) {
        if (response.data!.detailAttendanceStudents.length > 0) {
          setDataAttendance(response.data);
        } else {
          setDataAttendance(null);
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        setDataAttendance(null);
      }
      console.error(error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleCreateAttendance = async (classId: number, dateAtt: string) => {
    try {
      setLoadingAttendance(true);
      const payloadData: IPayloadAttendance = {
        classId: classId,
        date: dateAtt,
        createdBy: userLoginCookie.name,
        notes: "",
      };
      const response = await studentAttendance.createAttendanceInClass(
        payloadData
      );
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Absensi ${formatDate(new Date(dateAtt))} berhasil dibuat`,
          timer: 4000,
        });
        handleGetAttendance(classId, dateAtt);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        Toast.fire({
          icon: "error",
          title: `Absensi ${dateAtt} sudah ada!`,
          timer: 4000,
        });
      }
      if (axiosError.response?.status === 404) {
        setDataAttendance(null);
      }
      console.error(error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleUpdateAttendance = async (
    dataUpdateAtt: UpdateStudentAttendance[],
    dateAtt: string,
    classId: number,
    attendanceId: number
  ) => {
    try {
      setLoadingAttendance(true);
      const payload: IUpdateAttendance = {
        attendanceId: classId,
        data: dataUpdateAtt,
      };
      const response = await studentAttendance.updateStudentAttendanceInClass(
        attendanceId,
        payload
      );

      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Absensi ${formatDate(new Date(dateAtt))} berhasil diupdate`,
          timer: 4000,
        });
        handleGetAttendance(classId, dateAtt);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        setDataAttendance(null);
      }
      console.error(error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleUpdateFinalAttendance = async (
    classId: number,
    attendanceId: number,
    dateAtt: string
  ) => {
    const result = await showConfirmationDialog({
      title:
        "<b>Apakah Absensi Sudah Final?</b> <br /> Absensi yang sudah final tidak dapat diupdate kembali",
      icon: "warning",
      confirmButtonText: "Ya, Sudah!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoadingAttendance(true);
      try {
        setLoadingAttendance(true);
        const response = await studentAttendance.updateFinalAttendanceInClass(
          attendanceId
        );

        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: `Absensi ${formatDate(new Date(dateAtt))} berhasil diupdate`,
            timer: 4000,
          });
          handleGetAttendance(classId, dateAtt);
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          setDataAttendance(null);
        }
        Toast.fire({
          icon: "error",
          title: `Terjadi kesalah ketika update absensi`,
          timer: 4000,
        });
        console.error(error);
      } finally {
        setLoadingAttendance(false);
      }
    }
  };

  const getPositionInClass = async (id: number) => {
    try {
      const response = await studentPosition.getAllPositionByClass(id);
      setDataPosition(response.data!);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HeaderTitlePage
        title="Detail Riwayat Kelas Siswa"
        subTitle="Detail Riwayat Kelas Siswa Selama Belajar"
        backDisplay={true}
        addDisplay={false}
        linkAdd=""
      />
      <CardSumaryDetailKelas loading={loading} data={data!} />
      <CardPerangkatKelas loading={loading} data={dataPosition || []} />
      <CardNilaiDetailKelas loading={loading} data={data!} />

      <NavSubMenu
        menuItems={subMenuItemsAbsensi}
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
      />

      {data &&
        (activeMenu === "absensi-siswa" ? (
          <CardAbsensiDetailKelas loading={loading} data={data!} />
        ) : activeMenu === "buat-absensi" ? (
          <InputAbsensi
            loading={loading || loadingAttendance}
            data={dataAttendance!}
            kelas={data.currentClass}
            getAttendance={handleGetAttendance}
            createNewAttendace={handleCreateAttendance}
            updateStatusAttendace={handleUpdateAttendance}
            updateFinalAttendance={handleUpdateFinalAttendance}
          />
        ) : (
          ""
        ))}
    </>
  );
};
