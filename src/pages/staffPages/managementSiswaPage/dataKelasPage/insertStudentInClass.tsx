import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight, FaEye, FaPen } from "react-icons/fa6";
import StudentService from "../../../../services/studentService";
import { StudentDetail } from "../../../../interface/student.interface";
import ClassStudentService from "../../../../services/classStudentService";
import { Class } from "../../../../interface/studentClass.interface";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { SiGoogleclassroom } from "react-icons/si";
import { AxiosError } from "axios";
import { Toast } from "../../../../utils/myFunctions";

export const InserStudentInClassMangementSiswaPage: React.FC = () => {
  const studentService = StudentService();
  const classService = ClassStudentService();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<StudentDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [dataClass, setDataClass] = useState<Class>();

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

  useEffect(() => {
    const getDataClass = async () => {
      if (id) {
        try {
          const response = await classService.getClassById(parseInt(id));
          const data = response.data;
          setDataClass(data);
          await getData(data.majorCode);
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            Toast.fire({
              icon: "error",
              title: `Data Tidak Ditemukan!`,
              timer: 4000,
            });
navigate(-1)
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getDataClass();
  }, []);

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
        title={`Pembagian Kelas Siswa`}
        subTitle="Masukkan siswa baru kedalam kelas yang dipilih"
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

        <div className="row g-2">
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
          <div className="col-6 col-lg-3">
            <div className="fw-medium mt-2 m-auto">Tahun Ajaran :</div>
          </div>
          <div className="col-6 col-lg-9">{dataClass?.academicYear}</div>
          <div className="col-6 col-lg-3">
            <div className="fw-medium m-auto">Nama Kelas :</div>
          </div>
          <div className="col-6 col-lg-9 d-flex">{dataClass?.name}</div>
          <div className="col-6 col-lg-3">
            <div className="fw-medium">Kapasitas :</div>
          </div>
          <div className="col-6 col-lg-9">{dataClass?.capacity}</div>
          <div className="col-6 col-lg-3">
            <div className="fw-medium">Wali Kelas :</div>
          </div>
          <div className="col-6 col-lg-9">
            {dataClass?.homeRoomTeacher.name}
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

        <div className="row g-3 mb-3 d-flex justify-content-end">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Siswa Baru
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
            <button className="btn btn-success">
              Masukkan Siswa Kedalam Kelas
            </button>
            <FaArrowRight className="mx-4" />
            <SiGoogleclassroom className="fs-3 me-2" /> <span>{dataClass?.name}</span>
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
