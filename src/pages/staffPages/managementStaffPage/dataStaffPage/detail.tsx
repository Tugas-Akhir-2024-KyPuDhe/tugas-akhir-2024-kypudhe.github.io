import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatGender, Toast } from "../../../../utils/myFunctions";
import noPhotoFemale from "./../../../../assets/images/profile-female.jpg";
import noPhotoMale from "./../../../../assets/images/profile-male.jpg";
import { AxiosError } from "axios";
import { CardProfil } from "../../../../features/staffPages/managementStaffPage/dataStaffPage/cardProfil";
import StaffService from "../../../../services/staffService";
import { StaffDetail } from "../../../../interface/staff.interface";
import { Course } from "../../../../interface/course.interface";
import CourseService from "../../../../services/courseService";
import { FaCircle } from "react-icons/fa6";
import { CourseInClass } from "../../../../interface/courseInClass.interface";
import DataTable from "react-data-table-component";

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

  const columns = [
    {
      name: "No",
      cell: (_row: CourseInClass, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Mata Pelajaran",
      cell: (row: CourseInClass) => row.courseDetail.name,
      selector: (row: CourseInClass) => row.courseDetail.name,
      sortable: true,
    },
    {
      name: "Kelas",
      selector: (row: CourseInClass) => row.class.name,
      cell: (row: CourseInClass) => row.class.name,
      sortable: true,
    },
    {
      name: "Tahun Ajaran",
      selector: (row: CourseInClass) => row.class.academicYear,
      cell: (row: CourseInClass) => row.class.academicYear,
      sortable: true,
    },
  ];

  return (
    <>
      <HeaderTitlePage
        title="Detail Siswa"
        subTitle="Detail Siswa SMKN 1 Lumban Julu"
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

      <div className="m-lg-4 m-md-4 my-4 rounded">
        <ul
          className="nav nav-underline"
          style={{ borderBottom: "0.5px solid grey" }}
        >
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${
                activeMenu === "data-akademik"
                  ? "active text-blue"
                  : "text-dark"
              }`}
              onClick={() => handleMenuClick("data-akademik")}
            >
              Data Akademik
            </a>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${
                activeMenu === "riwayat-mengajar"
                  ? "active text-blue"
                  : "text-dark"
              }`}
              onClick={() => handleMenuClick("riwayat-mengajar")}
            >
              Riwayat Mengajar
            </a>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${
                activeMenu === "kelas-wali" ? "active text-blue" : "text-dark"
              }`}
              onClick={() => handleMenuClick("kelas-wali")}
            >
              Kelas Wali
            </a>
          </li>
        </ul>
      </div>

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
          <>
            <div className="fw-bold fs-5 mb-4 text-dark-soft position-relative pb-2">
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  height: "5px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
              Data Akademik
            </div>
            <div className="row">
              <div className="col-12 col-md-5">
                <div className="mb-3">
                  <label className="fw-bold">Nomor Induk Pegawai</label>
                  <div className="fw-medium">{data?.nip}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Status Pegawai</label>
                  <div className="fw-medium">{data?.type}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Jabatan</label>
                  <div className="fw-medium">{data?.position}</div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Tahun Mulai</label>
                  <div className="fw-medium">
                    {data?.startDate && formatDate(new Date(data?.startDate))}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5">
                <div className="mb-3">
                  <label className="fw-bold">Mata Pelajaran</label>
                  <div className="fw-medium">
                    {allCourse.map((course) => {
                      const isCourseInMyList = data?.mapel.includes(
                        course.code
                      );
                      return (
                        <div key={course.code} className="mb-2">
                          {isCourseInMyList && (
                            <div>
                              <FaCircle
                                className="mx-2"
                                style={{ fontSize: "0.4rem" }}
                              />{" "}
                              {course.name}{" "}
                              <sup className="text-muted">
                                Kelas: {course.grade}
                              </sup>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeMenu === "riwayat-mengajar" ? (
          <>
            <div className="fw-bold fs-5 mb-4 text-dark-soft position-relative pb-2">
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  height: "5px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
              Riwayat Mengejar Guru
            </div>
            <DataTable
              columns={columns}
              data={dataTeachTeacher}
              pagination
              highlightOnHover
              className="mt-3"
              customStyles={{
                rows: {
                  style: {
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      color: "#007bff",
                    },
                  },
                },
                headCells: {
                  style: {
                    backgroundColor: "var(--blue-color)",
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "0.1px solid #ddd",
                  },
                },
              }}
            />
          </>
        ) : activeMenu === "riwayat-akademik" ? (
          <p></p>
        ) : (
          <div>Halaman tidak ditemukan</div>
        )}
      </div>
    </>
  );
};
