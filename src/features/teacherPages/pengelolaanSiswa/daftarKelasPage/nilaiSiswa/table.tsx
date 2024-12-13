import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import StaffService from "../../../../../services/staffService";
import { CourseInClass } from "../../../../../interface/courseInClass.interface";
import { decodeToken } from "../../../../../utils/myFunctions";
import useCookie from "react-use-cookie";
import { useParams } from "react-router-dom";
import { StudentDetail } from "../../../../../interface/student.interface";

export const Table: React.FC = () => {
  const teacherService = StaffService();
  const [data, setData] = useState<CourseInClass>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const { id } = useParams<{ id: string }>();

  const getData = async () => {
    const dtoken = decodeToken(userLoginCookie.token);
    try {
      setLoading(true);
      const response = await teacherService.getClassOfTeacher(
        dtoken.username,
        id
      );
      console.log(response);

      setData(response.data.CourseInClass[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (kelas: Kelas) => {
  //   const result = await showConfirmationDialog({
  //     title: "Ingin menghapus kelas ini?",
  //     icon: "warning",
  //     confirmButtonText: "Ya, Hapus!",
  //     cancelButtonText: "Batal",
  //   });

  //   if (result.isConfirmed) {
  //     setLoading(true); // Set loading to true when deletion starts
  //     try {
  //       // const response = await jurusanService.destroy(id);
  //       // if (response.status === 200) {
  //       //   getData();
  //         Toast.fire({
  //           icon: "success",
  //           title: "kelas berhasil dihapus",
  //           timer: 4000,
  //         });
  //       // }
  //     } catch (error) {
  //       console.error("Error deleting kelas:", error);
  //       Swal.fire("Gagal", "Terjadi kesalahan saat menghapus kelas", "error");
  //     } finally {
  //       setLoading(false); // Set loading to false once the operation is complete
  //     }
  //   }
  // };

  const columns = [
    {
      name: "No",
      cell: (_row: StudentDetail, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nim",
      selector: (row: StudentDetail) => row.nis,
      width: "120px",
    },
    {
      name: "Nama",
      selector: (row: StudentDetail) => row.name,
    },
    {
      name: "Tugas",
      selector: (row: StudentDetail) => row.id,
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center"
            value={row.id}
          />
        </>
      ),
      width: "100px",
    },
    {
      name: "UTS",
      selector: (row: StudentDetail) => row.id,
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center"
            value={row.id}
          />
        </>
      ),
      width: "100px",
    },
    {
      name: "UAS",
      selector: (row: StudentDetail) => row.id,
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center"
            value={row.id}
          />
        </>
      ),
      width: "100px",
    },
  ];

  const filteredData =
    data?.class.student.filter((dt) =>
      dt.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
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
              Detail Kelas
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
              <div className="col-2 fw-medium">Nama Kelas</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{data && data.class.name}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Mata Pelajaran</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">
                {data && data.courseDetail.name}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Jadwal</div>
              <div className="col-auto">:</div>
              {/* <div className="col-9 fw-medium">{formData.prioritas}</div> */}
              <div className="col-9 fw-medium">
                {data && data.day}, {data && data.timeStart} -{" "}
                {data && data.timeEnd}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{ backgroundColor: "#fff", position: "relative" }}
      >
        {/* Show the loader overlay when loading */}
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

        <div className="row g-3 d-flex justify-content-between">
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
          <div className="col-6 col-lg-3 col-md-3">
            <button className="btn border-success text-success">
              Export to Excel
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
        <div className="col-12">
          <div className="pt-2">
            {/* Total : <span className="fw-bold">{data.length}</span> */}
          </div>
        </div>

        <StyleSheetManager>
          <DataTable
            columns={columns}
            data={searchTerm ? filteredData : data?.class.student || []}
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
        </StyleSheetManager>
      </div>
    </>
  );
};
