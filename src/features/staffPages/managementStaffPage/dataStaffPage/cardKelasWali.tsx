import React from "react";
import DataTable from "react-data-table-component";
import { Class } from "../../../../interface/studentClass.interface";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface CardProps {
  data: Class[];
}

export const CardKelasWali: React.FC<CardProps> = ({ data }) => {
  const navigate = useNavigate();
  const columns = [
    {
      name: "No",
      cell: (_row: Class, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "TA",
      selector: (row: Class) => row.academicYear,
      cell: (row: Class) => row.academicYear,
      sortable: true,
      width: "115px",
    },
    {
      name: "Kelas",
      selector: (row: Class) => row.name,
      cell: (row: Class) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Jurusan",
      selector: (row: Class) => row.major.name,
      cell: (row: Class) => row.major.name,
      sortable: true,
    },
    {
      name: <div className="w-100 text-center">Total Siswa</div>,
      selector: (row: Class) => row.totalStudent,
      cell: (row: Class) => (
        <>
          <div className="text-center w-100">{row.totalStudent}</div>
        </>
      ),
      sortable: true,
      width: "130px",
    },
    {
      name: "Action",
      cell: (row: Class) => (
        <>
          <button
            className="btn btn-info bg-blue border-0 me-2 text-light"
            onClick={() =>
              navigate(`/manajemen-siswa/data-kelas/detail/${row.id}`)
            }
            id="tooltip-detail"
          >
            <FaEye className="" style={{ fontSize: "0.8rem" }} />
          </button>
        </>
      ),
      width: "80px",
    },
  ];

  return (
    <div>
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
        Kelas Wali Guru
      </div>
      <DataTable
        columns={columns}
        data={data}
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
  );
};
