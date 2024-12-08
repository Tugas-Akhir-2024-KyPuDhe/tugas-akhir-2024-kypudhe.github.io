import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaPen, FaTrash } from "react-icons/fa6";
import StudentService from "../../../../services/studentService";
import { StudentDetail } from "../../../../interface/student.interface";
import ClassStudentService from "../../../../services/classStudentService";
import { Class } from "../../../../interface/studentClass.interface";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { AxiosError } from "axios";
import { showConfirmationDialog, Toast } from "../../../../utils/myFunctions";
import Select from "react-select";
import { Course } from "../../../../interface/course.interface";
import CourseService from "../../../../services/courseService";
import { optionsDays } from "../../../../utils/optionsData";
import {
  CourseInClass,
  FormState,
} from "../../../../interface/courseInClass.interface";
import CourseInClassService from "../../../../services/courseInClassService";
import { StyleSheetManager } from "styled-components";
import { StaffDetail } from "../../../../interface/staff.interface";
import StaffService from "../../../../services/staffService";
import { IoMdPersonAdd } from "react-icons/io";

// - Mata Pelajaran
// - Guru
// - Kelas
// - Hari
// - Jam Mulai
// - Jam Selesai

export const DetailKelasMangementSiswaPage: React.FC = () => {
  const studentService = StudentService();
  const classService = ClassStudentService();
  const courseService = CourseService();
  const courseInClassService = CourseInClassService();
  const teacherService = StaffService();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<StudentDetail[]>([]);
  const [dataCourseInClass, setDataCourseInClass] = useState<CourseInClass[]>(
    []
  );
  const [dataCourse, setdataCourse] = useState<Course[]>([]);
  const [dataTeachers, setdataTeachers] = useState<StaffDetail[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFormMapel, setLoadingFormMapel] = useState<boolean>(false);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [dataClass, setDataClass] = useState<Class>();
  const [formCourse, setFormCourse] = useState<FormState>({
    courseCode: "",
    teacherId: 0,
    classId: 0,
    day: "",
    timeStart: "",
    timeEnd: "",
  });
  const optionsCourse = [
    ...dataCourse.map((data) => ({
      value: data.code,
      label: `${data.name} | ${data.grade}`,
    })),
  ];
  const optionsTeachers = [
    ...dataTeachers.map((data) => ({
      value: data.id.toString(),
      label: `${data.name}`,
    })),
  ];

  const getTeacher = async () => {
    try {
      const response = await teacherService.getStaff("TEACHER");
      setdataTeachers(response.data);
      if (!id) {
        if (response.data && response.data.length > 0) {
          setdataTeachers((prev) => ({
            ...prev,
            staffId: response.data[0]?.id.toString() || "",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    }
  };

  const getCourse = async () => {
    try {
      const response = await courseService.getAllCourses();
      setdataCourse(response.data);
      if (!id) {
        if (response.data && response.data.length > 0) {
          setdataCourse((prev) => ({
            ...prev,
            staffId: response.data[0]?.id.toString() || "",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    }
  };

  const getData = async (majorCode: string) => {
    // setLoading(true);
    try {
      const response = await studentService.getNewStudent(majorCode);
      if (response.data && response.data.length > 0) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    } finally {
      //   setLoading(false);
    }
  };

  const getDataClass = async () => {
    if (id) {
      try {
        const response = await classService.getClassById(parseInt(id));
        const data = response.data;
        setDataClass(data);
        setDataCourseInClass(data.CourseInClass!);
        setFormCourse({ ...formCourse, classId: data.id });
        await getCourse();
        await getTeacher();
        await getData(data.majorCode);
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

  const deleteCourseInclass = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Mapel ini dikelas ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true); // Set loading to true when deletion starts
      try {
        const response = await courseInClassService.deleteCourse(id);
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Baner berhasil dihapus",
            timer: 4000,
          });
          await getDataClass();
        }
      } catch (error) {
        console.error("Error deleting banner:", error);
        Toast.fire({
          icon: "error",
          title: "Terjadi Kesalahan saat mengghapus mapel di kelas",
          timer: 4000,
        });
      } finally {
        setLoading(false); // Set loading to false once the operation is complete
      }
    }
  };

  const columnsMapel = [
    {
      name: "No",
      cell: (_row: CourseInClass, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Kode Mapel",
      selector: (row: CourseInClass) => row.courseDetail.code,
      sortable: true,
      cell: (row: CourseInClass) => row.courseDetail.code,
      width: "120px",
    },
    {
      name: "Nama Mapel",
      selector: (row: CourseInClass) => row.courseDetail.name,
      sortable: true,
      cell: (row: CourseInClass) => row.courseDetail.name,
    },
    {
      name: "Hari",
      selector: (row: CourseInClass) => row.day,
      sortable: true,
      cell: (row: CourseInClass) => row.day,
      width: "130px",
    },
    {
      name: "Jam Mulai",
      selector: (row: CourseInClass) => row.timeStart,
      sortable: true,
      cell: (row: CourseInClass) => row.timeStart,
      width: "130px",
    },
    {
      name: "Jam Selesai",
      selector: (row: CourseInClass) => row.timeEnd,
      sortable: true,
      cell: (row: CourseInClass) => row.timeEnd,
      width: "130px",
    },
    {
      name: "Action",
      cell: (row: CourseInClass) => (
        <>
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.id}`)}
            disabled={loading}
          >
            <FaPen />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteCourseInclass(row.id)}
            disabled={loading}
          >
            <FaTrash />
          </button>
        </>
      ),
      width: "150px",
    },
  ];

  const columns = [
    {
      name: "No",
      cell: (_row: StudentDetail, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row: StudentDetail) => row.name,
      sortable: true,
      cell: (row: StudentDetail) => row.name,
    },
    {
      name: "NIS",
      selector: (row: StudentDetail) => row.nis,
      sortable: true,
      cell: (row: StudentDetail) => row.nis,
      width: "100px",
    },
    {
      name: "NISN",
      selector: (row: StudentDetail) => row.nisn,
      sortable: true,
      cell: (row: StudentDetail) => row.nisn,
      width: "100px",
    },
    {
      name: "Jurusan",
      selector: (row: StudentDetail) => row.Major.majorCode,
      sortable: true,
      cell: (row: StudentDetail) => row.Major.majorCode,
      width: "100px",
    },
    {
      name: "No.Telp",
      selector: (row: StudentDetail) => row.phone,
      sortable: true,
      cell: (row: StudentDetail) => row.phone,
      width: "120px",
    },
    {
      name: "Email",
      selector: (row: StudentDetail) => row.email,
      sortable: true,
      cell: (row: StudentDetail) => row.email,
    },
    {
      name: "Action",
      cell: (row: StudentDetail) => (
        <>
          <button
            className="btn btn-info btn-sm text me-2 text-light"
            onClick={() => navigate(`detail/${row.nis}`)}
            disabled={loading}
          >
            <FaEye />
          </button>
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.nis}`)}
            disabled={loading}
          >
            <FaPen />
          </button>
        </>
      ),
      width: "150px",
    },
  ];

  const filterData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterDataMapel =
    dataCourseInClass &&
    dataCourseInClass.filter((user) =>
      user.courseDetail.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSelectChangeMapel = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    setFormCourse((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
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
    getDataClass();
  }, []);

  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.log(error);
    } finally {
      setLoadingFormMapel(false);
    }
  };

  //   const handleSubmit = async () => {
  // try {
  //   setLoading(true);
  //   const response = await classStudentService.createClassInvStudent(
  //     kapasitasPerKelas,
  //     selectedMajor?.value || ""
  //   );
  //   if (response.status === 201) {
  //     Toast.fire({
  //       icon: "success",
  //       title: `Kelas Berhasil Dibuat & Siswa Berhasil Masuk Kedalam nya`,
  //     });
  //   }
  // } catch (error) {
  //   setLoading(false);
  //   Toast.fire({
  //     icon: "error",
  //     title: `${error}`,
  //   });
  //   console.error("Error processing banner:", error);
  // }finally{
  //   setLoading(false);
  // }
  //   };

  return (
    <>
      <HeaderTitlePage
        title={`Detail Data Kelas`}
        subTitle="Detail Data Kelas SMKN 1 Lumban Julu"
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
              zIndex: 9999,
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

        <div className="row g-3">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Informasi Kelas
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  height: "3px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="row mb-3">
              <div className="col-2 fw-medium">Tahun Ajaran</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{dataClass?.academicYear}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Nama Kelas</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{dataClass?.name}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Kapasitas </div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{dataClass?.capacity}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Wali Kelas </div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">
                {dataClass?.homeRoomTeacher.name}
              </div>
            </div>
          </div>
        </div>
      </div>

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
              zIndex: 9999,
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

        <form onSubmit={handleSubmitCourse}>
          <div className="row">
            <div className="col-12">
              <div className="fw-bold position-relative pb-2 mb-3">
                Mata Pelajaran DiKelas
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "50px",
                    height: "3px",
                    backgroundColor: "var(--blue-color)",
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Mata Pelajaran *</label>
                <Select
                  options={optionsCourse}
                  value={optionsCourse.find(
                    (option) => option.value === formCourse.courseCode
                  )}
                  onChange={(option) =>
                    handleSelectChangeMapel("courseCode", option)
                  }
                  placeholder="Pilih Mapel yang Ditambah"
                  className="form-control-lg px-0 pt-0"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: "0.955rem",
                      borderRadius: "8px",
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                  }}
                />
                {errorsForms.courseCode && (
                  <div className="invalid-form">Mapel Masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Guru Pengajar *</label>
                <Select
                  options={optionsTeachers}
                  value={optionsTeachers.find(
                    (option) =>
                      option.value.toString() ===
                      formCourse.teacherId.toString()
                  )}
                  onChange={(option) =>
                    handleSelectChangeMapel("teacherId", option)
                  }
                  placeholder="Pilih Guru Pengajar"
                  className="form-control-lg px-0 pt-0"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: "0.955rem",
                      borderRadius: "8px",
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                  }}
                />
                {errorsForms.teacherId && (
                  <div className="invalid-form">Guru Masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Jadwal Hari *</label>
                <Select
                  options={optionsDays}
                  value={optionsDays.find(
                    (option) => option.value === formCourse.day
                  )}
                  onChange={(option) => handleSelectChangeMapel("day", option)}
                  placeholder="Pilih Jadwal Mengajar"
                  className="form-control-lg px-0 pt-0"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: "0.955rem",
                      borderRadius: "8px",
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                  }}
                />
                {errorsForms.day && (
                  <div className="invalid-form">Jadwa Hari Masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Jam Mulai *</label>
                <input
                  type="time"
                  name="timeStart"
                  className={`form-control ${
                    errorsForms.timeStart ? "is-invalid" : ""
                  }`}
                  placeholder="Waktu Mulai.."
                  value={formCourse.timeStart}
                  onChange={handleInputChangeMapel}
                />
                {errorsForms.timeStart && (
                  <div className="invalid-form">Waktu Mulai Masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Jam Mulai *</label>
                <input
                  type="time"
                  name="timeEnd"
                  className={`form-control ${
                    errorsForms.timeEnd ? "is-invalid" : ""
                  }`}
                  placeholder="Waktu Selesai.."
                  value={formCourse.timeEnd}
                  onChange={handleInputChangeMapel}
                />
                {errorsForms.timeEnd && (
                  <div className="invalid-form">
                    Waktu Selesai Masih kosong!
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 d-flex">
              <button
                className={`btn btn-primary border-0 bg-blue`}
                type="submit"
                disabled={loadingFormMapel}
              >
                {loadingFormMapel ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : formCourse.id ? (
                  "Update"
                ) : (
                  "Tambah"
                )}
              </button>
            </div>
          </div>
        </form>
        <StyleSheetManager>
          <DataTable
            columns={columnsMapel}
            data={filterDataMapel}
            highlightOnHover
            customStyles={{
              rows: {
                style: {
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    color: "#007bff",
                  },
                },
              },
            }}
          />
        </StyleSheetManager>
      </div>

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
              zIndex: 9999,
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

        <div className="row g-3 mb-3 d-flex justify-content-end">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Daftar Siswa
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  height: "3px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            </div>
          </div>
          <div className="col-6 col-lg-9 col-md-3">
            <button className="btn border-primary text-blue">
              <IoMdPersonAdd className="me-2"/> Tambah Siswa
            </button>
          </div>
          <div className="col-6 col-lg-3 col-md-3">
            <input
              type="text"
              className="form-control border-dark"
              placeholder="Search.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: "1.1em" }}
            />
          </div>
        </div>
        <div className="row g-2">
          <div className="col-12">
            Total : <span className="fw-bold">{data.length}</span>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filterData}
          pagination
          highlightOnHover
          customStyles={{
            rows: {
              style: {
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  color: "#007bff",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};
