import React, { useState } from "react";
import { StudentDetail } from "../../../../interface/student.interface";
import { CourseInClass } from "../../../../interface/courseInClass.interface";
import DataTable from "react-data-table-component";
import { FaSave } from "react-icons/fa";

interface CardProps {
  loading: boolean;
  data: CourseInClass;
}

export const CardNilaiKelas: React.FC<CardProps> = ({ loading, data }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  return (
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
      <div className="row g-3 d-flex justify-content-between">
        <div className="col-12">
          <div className="fw-bold position-relative pb-2">
            Daftar Nilai Siswa
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
          Total : <span className="fw-bold">{data.class.student.length}</span>
        </div>
      </div>

      <div className="col-12">
        <DataTable
          columns={columns}
          data={searchTerm ? filteredData : data?.class.student || []}
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
      </div>
      <div className="col-12">
        <button className="btn btn-success"> <FaSave className="me-2"/> Simpan</button>
      </div>
    </div>
  );
};
