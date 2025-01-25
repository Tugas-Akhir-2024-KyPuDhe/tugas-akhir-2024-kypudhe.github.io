import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import StudentHistoryService from "../../../../services/studentHistoryService";
import { StudentHistory } from "../../../../interface/studentHistory.interface";
import { CardSumaryDetailKelas } from "../../../../features/studentPages/kelasPage/CardSumaryDetailKelas";
import { CardNilaiDetailKelas } from "../../../../features/studentPages/kelasPage/CardNilaiDetailKelas";
import { CardAbsensiDetailKelas } from "../../../../features/studentPages/kelasPage/CardAbsensiDetailKelas";
import { AxiosError } from "axios";
import { formatDate, Toast } from "../../../../utils/myFunctions";
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

const subMenuItemsAbsensi = [
  { label: "Absensi Siswa", key: "absensi-siswa" },
  { label: "Buat Absensi", key: "buat-absensi" },
];

export const DetailKelasSiswaPage: React.FC = () => {
  const navigate = useNavigate();
  const studentHistory = StudentHistoryService();
  const studentPosition = StudentPositionService();
  const studentAttendance = StudentAttendanceService();

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

          const today = new Date().toISOString().split("T")[0];
          await handleGetAttendance(
            parseInt(response.data.currentClassId),
            today
          );
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
    classId: number
  ) => {
    try {
      setLoadingAttendance(true);
      const payload: IUpdateAttendance = {
        attendanceId: classId,
        data: dataUpdateAtt,
      };
      const response = await studentAttendance.updateStudentAttendanceInClass(
        classId,
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
          />
        ) : (
          ""
        ))}
    </>
  );
};
