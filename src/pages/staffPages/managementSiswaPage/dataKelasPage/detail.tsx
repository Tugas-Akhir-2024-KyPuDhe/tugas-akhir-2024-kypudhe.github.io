import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentService from "../../../../services/studentService";
import { StudentDetail } from "../../../../interface/student.interface";
import ClassStudentService from "../../../../services/classStudentService";
import { Class } from "../../../../interface/studentClass.interface";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { AxiosError } from "axios";
import { showConfirmationDialog, Toast } from "../../../../utils/myFunctions";
import { Course } from "../../../../interface/course.interface";
import CourseService from "../../../../services/courseService";
import {
  CourseInClass,
  FormState,
} from "../../../../interface/courseInClass.interface";
import CourseInClassService from "../../../../services/courseInClassService";
import { StaffDetail } from "../../../../interface/staff.interface";
import StaffService from "../../../../services/staffService";

import { CardInformasiDetailkelas } from "../../../../features/staffPages/managementSiswaPage/dataKelasPage/cardInformasiKelas";
import { CardMatkulDetailKelas } from "../../../../features/staffPages/managementSiswaPage/dataKelasPage/cardMatkul";
import { CardDaftarSiswaDetailKelas } from "../../../../features/staffPages/managementSiswaPage/dataKelasPage/cardDaftarSiswa";

export const DetailKelasMangementSiswaPage: React.FC = () => {
  const studentService = StudentService();
  const classService = ClassStudentService();
  const courseService = CourseService();
  const courseInClassService = CourseInClassService();
  const teacherService = StaffService();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [dataStudentsInClass, setDataStudentsInClass] = useState<
    StudentDetail[]
  >([]);
  const [dataAllStudents, setDataAllStudents] = useState<StudentDetail[]>([]);
  const [dataCourseInClass, setDataCourseInClass] = useState<CourseInClass[]>(
    []
  );
  const [dataCourse, setdataCourse] = useState<Course[]>([]);
  const [dataTeachers, setdataTeachers] = useState<StaffDetail[]>([]);
  const [dataClass, setDataClass] = useState<Class>();

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFormMapel, setLoadingFormMapel] = useState<boolean>(false);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
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

  const [formCourse, setFormCourse] = useState<FormState>({
    courseCode: "",
    teacherId: 0,
    classId: parseInt(id || "0"),
    day: "",
    timeStart: "",
    timeEnd: "",
  });

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

  const getAllStudents = async (majorCode: string) => {
    try {
      const response = await studentService.getAllStudent(
        "not_registered",
        majorCode,
        dataClass?.name.split("-")[0]
      );
      if (response.data && response.data.length > 0) {
        setDataAllStudents(response.data);
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    }
  };

  const getDataClass = async () => {
    if (id) {
      try {
        setLoading(true);
        const response = await classService.getClassById(parseInt(id));
        const data = response.data;
        setDataClass(data);
        setDataStudentsInClass(response.data.student);
        setDataCourseInClass(data.CourseInClass!);
        setFormCourse({ ...formCourse, classId: data.id });
        await getCourse();
        await getTeacher();
        await getAllStudents(data.majorCode);
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

  useEffect(() => {
    getDataClass();
  }, []);

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
      console.log(error);
    } finally {
      setLoadingFormMapel(false);
    }
  };

  return (
    <>
      <HeaderTitlePage
        title={`Detail Data Kelas`}
        subTitle="Detail Data Kelas SMKN 1 Lumban Julu"
        backDisplay={true}
        addDisplay={false}
        linkAdd=""
      />

      <CardInformasiDetailkelas dataClass={dataClass} loading={loading} />
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
      <CardDaftarSiswaDetailKelas
        dataStudentsInClass={dataStudentsInClass}
        dataAllStudents={dataAllStudents}
        dataClass={dataClass!}
        loading={loading}
      />
    </>
  );
};
