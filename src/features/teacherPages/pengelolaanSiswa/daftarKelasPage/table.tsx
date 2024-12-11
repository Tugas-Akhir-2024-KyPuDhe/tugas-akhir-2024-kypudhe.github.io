import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import StaffService from "../../../../services/staffService";
import { CourseInClass } from "../../../../interface/courseInClass.interface";
import { FaEye, FaListCheck, FaPenClip } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export const Table: React.FC = () => {
  const navigate = useNavigate();
  const teacherService = StaffService();
  const [data, setData] = useState<CourseInClass[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const getData = async () => {
    try {
      setLoading(true);
      const response = await teacherService.getClassOfTeacher(
        "198311182008042001"
      );
      setData(response.data.CourseInClass);
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
      cell: (_row: CourseInClass, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Kelas",
      selector: (row: CourseInClass) => row.class.name,
      width: "120px",
    },
    {
      name: "Mata Pelajaran",
      selector: (row: CourseInClass) => row.courseDetail.name,
    },
    {
      name: "Hari",
      selector: (row: CourseInClass) => row.day,
      width: "120px",
    },
    {
      name: "Jam Mulai",
      selector: (row: CourseInClass) => row.timeStart,
      width: "120px",
    },
    {
      name: "Jam Selesai",
      selector: (row: CourseInClass) => row.timeEnd,
      width: "120px",
    },
    {
      name: "Action",
      cell: (row: CourseInClass) => (
        <>
          <button
            className="btn btn-info btn-sm border-info me-2 text-light"
            onClick={() => navigate(`update/${row.id}`)}
            disabled={loading}
            id="tooltip-detail"
          >
            <FaEye className="" style={{ fontSize: "0.8rem" }} />
            <Tooltip anchorSelect="#tooltip-detail" className="text-light" style={{ backgroundColor: "var(--blue-color)" }} content="Detail" />
          </button>
          <button
            className="btn btn-success btn-sm me-2 text-light"
            // onClick={() => navigate(`update/${row.id}`)}
            disabled={loading}
            id="tooltip-absensi"
          >
            <FaListCheck className="" style={{ fontSize: "0.8rem" }} />
            <Tooltip anchorSelect="#tooltip-absensi" className="text-light" style={{ backgroundColor: "var(--blue-color)" }} content="Absensi" />
          </button>
          <button
            className="btn btn-primary btn-sm me-2 text-light"
            // onClick={() => navigate(`update/${row.id}`)}
            disabled={loading}
            id="tooltip-nilai"
          >
            <FaPenClip className="" style={{ fontSize: "0.8rem" }} />
            <Tooltip anchorSelect="#tooltip-nilai" className="text-light" style={{ backgroundColor: "var(--blue-color)" }} content="Nilai Siswa" />
          </button>
        </>
      ),
      width: "150px",
    },
  ];

  const filteredData = data?.filter((dt) =>
    dt.courseDetail.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  return (
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

      <div className="row d-flex justify-content-end">
        <div className="col-12 col-lg-4 col-md-3">
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

      <StyleSheetManager>
        <DataTable
          columns={columns}
          data={searchTerm ? filteredData : data}
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
  );
};
