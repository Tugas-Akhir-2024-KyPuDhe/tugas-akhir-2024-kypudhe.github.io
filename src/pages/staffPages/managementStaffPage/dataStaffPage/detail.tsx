import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import { formatGender, Toast } from "../../../../utils/myFunctions";
import noPhotoFemale from "./../../../../assets/images/profile-female.jpg";
import noPhotoMale from "./../../../../assets/images/profile-male.jpg";
import { AxiosError } from "axios";
import { CardProfil } from "../../../../features/staffPages/managementStaffPage/dataStaffPage/cardProfil";
import StaffService from "../../../../services/staffService";
import { StaffDetail } from "../../../../interface/staff.interface";
import { Course } from "../../../../interface/course.interface";
import CourseService from "../../../../services/courseService";
import { CourseInClass } from "../../../../interface/courseInClass.interface";
import { NavSubMenu } from "../../../../components/navSubmenu";
import { Class } from "../../../../interface/studentClass.interface";
import { CardRiwayatMengajar } from "../../../../features/staffPages/managementStaffPage/dataStaffPage/cardRiwayatMengajar";
import { CardDataAkademik } from "../../../../features/staffPages/managementStaffPage/dataStaffPage/cardDataAkademik";
import { CardKelasWali } from "../../../../features/staffPages/managementStaffPage/dataStaffPage/cardKelasWali";

const subMenuItems = [
  { label: "Data Akademik", key: "data-akademik" },
  { label: "Riwayat Mengajar", key: "riwayat-mengajar" },
  { label: "Kelas Wali", key: "kelas-wali" },
];

export const DetailStaffMangementSiswa: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const staffService = StaffService();
  const courseService = CourseService();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [data, setData] = useState<StaffDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [allCourse, setAllCourse] = useState<Course[]>([]);
  const [dataTeachTeacher, setDataTeachTeacher] = useState<CourseInClass[]>([]);
  const [dataWaliTeacher, setDataWaliTeacher] = useState<Class[]>([]);

  const getDataTeachTeacher = async (nip: string) => {
    try {
      setLoading(true);
      const response = await staffService.getClassOfTeacher(nip);
      setDataTeachTeacher(response.data.CourseInClass);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const [activeMenu, setActiveMenu] = useState("data-akademik");
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  useEffect(() => {
    const getDataPegawai = async () => {
      if (id) {
        try {
          const response = await staffService.getStaffByNip(id);
          const data = response.data;
          setData({
            id: data.id,
            uuid: data.uuid,
            name: data.name,
            birthPlace: data.birthPlace,
            address: data.address,
            phone: data.phone,
            email: data.email,
            gender: data.gender,
            mapel: data.mapel,
            nip: data.nip,
            type: data.type,
            position: data.position,
            startDate: data.startDate,
            endDate: data.endDate,
            mediaId: data.mediaId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            photo: data.photo,
          });
          setImageUrl(data.photo?.url);
          await getAllCourse();
          await getDataTeachTeacher(response.data.nip);
          await getDataWaliTeacher(response.data.id.toString());
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
      } else {
        setLoading(false);
      }
    };

    getDataPegawai();
  }, []);

  const getDataWaliTeacher = async (id: string) => {
    try {
      setLoading(true);
      const response = await staffService.getClassRoomOfTeacher(id.toString());
      setDataWaliTeacher(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCourse = async () => {
    setLoading(true);
    try {
      const response = await courseService.getAllCourses();
      if (response.data && response.data.length > 0) {
        setAllCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching Course data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderTitlePage
        title="Detail Pegawai"
        subTitle="Detail Pegawai SMKN 1 Lumban Julu"
        backDisplay={true}
        addDisplay={false}
        linkAdd=""
      />
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{ backgroundColor: "#fff", position: "relative" }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <CardProfil
          id={data?.id || 0}
          photo={
            imageUrl || (data?.gender === "L" ? noPhotoMale : noPhotoFemale)
          }
          name={data?.name || "-"}
          nip={data?.nip || "-"}
          email={data?.email || "-"}
          phone={data?.phone || "-"}
          address={data?.address || "-"}
          gender={formatGender(data?.gender || "-")}
          birthPlace={data?.birthPlace || "-"}
        />
      </div>

      <NavSubMenu
        menuItems={subMenuItems}
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
      />

      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{
          backgroundColor: "#fff",
          position: "relative",
          minHeight: "450px",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {activeMenu === "data-akademik" ? (
          <CardDataAkademik data={data!} allCourse={allCourse} />
        ) : activeMenu === "riwayat-mengajar" ? (
          <>
            <CardRiwayatMengajar data={dataTeachTeacher} />
          </>
        ) : activeMenu === "riwayat-akademik" ? (
          <p></p>
        ) : (
          <CardKelasWali data={dataWaliTeacher} />
        )}
      </div>
    </>
  );
};
