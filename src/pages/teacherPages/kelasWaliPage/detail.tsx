import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import { CardDetailKelas } from "../../../features/teacherPages/kelasWaliPage/cardDetailKelas";
import { CardNilaiKelas } from "../../../features/teacherPages/jadwalMengajarPage/cardAbsensiKelas";
import { AxiosError } from "axios";
import ClassStudentService from "../../../services/classStudentService";
import { Class } from "../../../interface/studentClass.interface";
import { CardDaftarSiswaKelas } from "../../../features/teacherPages/kelasWaliPage/cardDaftarSiswaKelas";
import { getCurrentWeekDateRange, showConfirmationDialog, Toast } from "../../../utils/myFunctions";
import { NavSubMenu } from "../../../components/navSubmenu";
import { CardPerangkatKelas } from "../../../features/teacherPages/kelasWaliPage/cardPerangkatKelas";
import { StudentDetail } from "../../../interface/student.interface";
import { DaftarAbsensi } from "../../../features/teacherPages/jadwalMengajarPage/absensiSiswaPage/daftarAbsensiKelas";
import {
  IDataSummaryAttendance,
  IDetailStudentAttendance,
} from "../../../interface/studentAttendance.interface";
import StudentAttendanceService from "../../../services/studentAttendanceService";
import { CourseInClass, FormState } from "../../../interface/courseInClass.interface";
import CourseInClassService from "../../../services/courseInClassService";
import { Course } from "../../../interface/course.interface";
import { StaffDetail } from "../../../interface/staff.interface";
import { CardMatkulDetailKelas } from "../../../features/staffPages/managementSiswaPage/dataKelasPage/cardMatkul";
import StaffService from "../../../services/staffService";
import CourseService from "../../../services/courseService";

const subMenuItemsDetailKelasWaliGuru = [
  { label: "Daftar Siswa", key: "daftar-siswa" },
  { label: "Absensi Siswa", key: "absensi-siswa" },
  { label: "Nilai Akhir Siswa", key: "nilai-akhir-siswa" },
];

export const DetailKelasWaliPage: React.FC = () => {
  const navigate = useNavigate();
  const classService = ClassStudentService();
  const studentAttendance = StudentAttendanceService();
  const courseService = CourseService();
  const teacherService = StaffService();
  const courseInClassService = CourseInClassService();
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

  const [dataCourseInClass, setDataCourseInClass] = useState<CourseInClass[]>(
    []
  );
  const [loadingFormMapel, setLoadingFormMapel] = useState<boolean>(false);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [dataAllCourse, setDataAllCourse] = useState<Course[]>([]);
  const [dataAllTeachers, setDataAllTeachers] = useState<StaffDetail[]>([]);
  const optionsCourse = [
    ...dataAllCourse.map((data) => ({
      value: data.code,
      label: `${data.name} (${data.grade})`,
    })),
  ];
  const optionsTeachers = [
    ...dataAllTeachers.map((data) => ({
      value: data.id.toString(),
      label: `${data.name}`,
    })),
  ];
  const [formCourse, setFormCourse] = useState<FormState>({
    courseCode: "",
    teacherId: 0,
    classId: parseInt(id || "0"),
    day: "",
    timeStart: "",
    timeEnd: "",
  });

  // const [dataMapel, setDataMapel] = useState<CourseInClass[]>([]);

  const [activeMenu, setActiveMenu] = useState("daftar-siswa");
  const handleMenuClick = (menu: string) => {
    if (!loading) {
      setActiveMenu(menu);
    }
  };

  const handleGetAttendanceWeekly = async (
    classId: number,
    date_start: string,
    date_end: string
  ) => {
    try {
      setLoadingAttendance(true);
      const response = await studentAttendance.getAttendanceInClassWeekly(
        classId,
        date_start,
        date_end
      );
      if (response.status === 200) {
        setListAllStudentsAttendance(response.data);
        setListAllStudentsAttendanceHeader(response.data[0]?.absensi || []);
        // setDateRange({ startDate, endDate }); // Simpan date range terakhir
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        setListAllStudentsAttendance([]);
        setListAllStudentsAttendanceHeader([]);
      }
      console.error(error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleDateRangeChange = async (startDate: string, endDate: string) => {
    if (id) {
      await handleGetAttendanceWeekly(
        parseInt(id),
        startDate,
        endDate
      );
    }
  };

  const getData = async () => {
    if (id) {
      try {
         
        setLoading(true);
        const response = await classService.getClassById(parseInt(id));
        setData(response.data);
        setstudents(response.data.student);
        // await handleGetSummaryAttendance(parseInt(id));
        const { startDate, endDate } = getCurrentWeekDateRange();
        await handleGetAttendanceWeekly(
          parseInt(id),
          startDate,
          endDate
        );
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

  // const handleGetSummaryAttendance = async (classId: number) => {
  //   try {
  //     setLoadingAttendance(true);
  //     const response = await studentAttendance.getAttendanceSummaryInClass(
  //       classId
  //     );
  //     if (response.status === 200) {
  //       setListAllStudentsAttendance(response.data);
  //       setListAllStudentsAttendanceHeader(response.data[0].absensi);
  //     }
  //   } catch (error) {
  //     const axiosError = error as AxiosError;
  //     if (axiosError.response?.status === 404) {
  //       setListAllStudentsAttendance(null);
  //     }
  //     console.error(error);
  //   } finally {
  //     setLoadingAttendance(false);
  //   }
  // };

  const optionsStudents = [
    ...students.map((data) => ({
      value: data.nis,
      label: data.name,
    })),
  ];

  const getAllCourse = async () => {
    try {
      const response = await courseService.getAllCourses();
      setDataAllCourse(response.data);
      if (!id) {
        if (response.data && response.data.length > 0) {
          setDataAllCourse((prev) => ({
            ...prev,
            staffId: response.data[0]?.id.toString() || "",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    }
  };

  const getAllTeacher = async () => {
    try {
      const response = await teacherService.getStaff("TEACHER");
      setDataAllTeachers(response.data);
      if (!id) {
        if (response.data && response.data.length > 0) {
          setDataAllTeachers((prev) => ({
            ...prev,
            staffId: response.data[0]?.id.toString() || "",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    }
  };

  const getDataClass = async () => {
    if (id) {
      try {
        setLoading(true);
        setLoadingFormMapel(true);
        const response = await classService.getClassById(parseInt(id));
        const data = response.data;
        setDataCourseInClass(data.CourseInClass!);
        setFormCourse({ ...formCourse, classId: data.id });
        await getAllCourse();
        await getAllTeacher();
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
        setLoadingFormMapel(false);
        setLoading(false);
      }
    } else {
      setLoadingFormMapel(false);
      setLoading(false);
    }
  };

  const handleSubmitCourse = async (formCourse: FormState) => {
    const requiredFields = [
      "courseCode",
      "teacherId",
      "classId",
      "day",
      "timeStart",
      "timeEnd",
    ];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formCourse[field as keyof typeof formCourse]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrorsForms(newErrors);
      return;
    }

    try {
      setLoadingFormMapel(true);
      const modalElement = document.getElementById(
        "modalAddMatkul"
      ) as HTMLDivElement | null;
      if (modalElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const modalInstance = (window as any).bootstrap.Modal.getInstance(
          modalElement
        );
        if (modalInstance) modalInstance.hide();
      }
      const response = await courseInClassService.addCourse(formCourse);
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          timer: 5000,
          title: `Mata Pelajaran Berhasil ${
            formCourse.id ? "Diupdate" : "Ditambah"
          }`,
        });
        await getDataClass();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFormMapel(false);
    }
  };

  const deleteCourseInclass = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Mapel ini dikelas ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoadingFormMapel(true);
      try {
        const response = await courseInClassService.deleteCourse(id);
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Mapel berhasil dihapus dari kelas",
            timer: 4000,
          });
          await getDataClass();
        }
      } catch (error) {
        console.error(error);
        Toast.fire({
          icon: "error",
          title: "Terjadi Kesalahan saat mengghapus mapel di kelas",
          timer: 4000,
        });
      } finally {
        setLoadingFormMapel(false);
      }
    }
  };

  const handleSelectChangeMapel = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    setFormCourse((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleInputChangeMapel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormCourse((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  useEffect(() => {
    getData();
    getDataClass()
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
            optionsStudents={optionsStudents || []}
            classId={data.id}
            data={data?.StudentPositionInClass || []} // Tambahkan fallback ke array kosong jika null
          />
          <CardMatkulDetailKelas
            data={dataCourseInClass}
            loading={loading}
            submitCourse={handleSubmitCourse}
            deleteCourse={deleteCourseInclass}
            loadingFormMapel={loadingFormMapel}
            optionsCourse={optionsCourse}
            optionsTeachers={optionsTeachers}
            formCourse={formCourse}
            errorsForms={errorsForms}
            handleSelectChangeMapel={handleSelectChangeMapel}
            handleInputChangeMapel={handleInputChangeMapel}
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
            onDateChange={handleDateRangeChange}
          />
        ) : activeMenu === "nilai-akhir-siswa" ? (
          <CardNilaiKelas loading={loading} data={data!} />
        ) : (
          "lorem"
        ))}
    </>
  );
};
