import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { StudentDetail } from "../../../../interface/student.interface";
import { Class } from "../../../../interface/studentClass.interface";
import { FaEye, FaPlus } from "react-icons/fa6";
import { ModalAddStudentInClass } from "./modalAddSiswaInClass";
import { useNavigate } from "react-router-dom";
import { FaAngleDoubleUp } from "react-icons/fa";
import { ModalNextGradeStudentInClass } from "./modalNextGradeSiswaInClass";
import { romanToNumber } from "../../../../utils/myFunctions";

interface Option {
  value: string;
  label: string;
}

interface DaftarSiswaProps {
  onRefreshData: () => void;
  dataStudentsInClass: StudentDetail[];
  dataAllStudents: StudentDetail[];
  optionsClass: Option[];
  dataClass: Class;
  loading: boolean;
}

export const CardDaftarSiswaDetailKelas: React.FC<DaftarSiswaProps> = ({
  onRefreshData,
  dataStudentsInClass,
  dataAllStudents,
  optionsClass,
  dataClass,
  loading,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const filterDataStudentInClass = dataStudentsInClass.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columnsStudentInClass = [
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
            onClick={() =>
              navigate(`/manajemen-siswa/daftar-siswa/detail/${row.nis}`)
            }
            disabled={loading}
          >
            <FaEye />
          </button>
        </>
      ),
      width: "80px",
    },
  ];

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
        <div className="col-12 col-lg-9">
          <div className="">
            <button className="mb-3 mb-md-0 btn border-success text-success me-3">
              Export to Excel
            </button>
            <button
              className="mb-3 mb-md-0 btn border-blue text-blue me-3"
              data-bs-toggle="modal"
              data-bs-target="#modalAddStudentInClass"
            >
              <FaPlus className="me-2 fs-5" /> Tambah Siswa
            </button>
            <button
              className="mb-3 mb-md-0 btn border-blue text-blue"
              data-bs-toggle="modal"
              data-bs-target="#modalNextGradeStudentInClass"
            >
              <FaAngleDoubleUp className="me-2 fs-5" /> Naik Kelas
            </button>
          </div>
          <ModalNextGradeStudentInClass
            onRefreshData={onRefreshData}
            dataStudentsInClass={dataStudentsInClass}
            optionsClass={optionsClass.filter(
              (data) =>
                data.label.split("-")[1] === dataClass.majorCode &&
                parseInt(data.value) !== dataClass.id &&
                romanToNumber(data.label.split("-")[0]) >
                  romanToNumber(dataClass.name.split("-")[0])
            )}
            dataClass={dataClass}
            keySearch=""
          />
          <ModalAddStudentInClass
            onRefreshData={onRefreshData}
            dataAllStudents={dataAllStudents}
            dataStudentsInClass={dataStudentsInClass}
            dataClass={dataClass}
            keySearch=""
          />
        </div>
        <div className="col-12 col-lg-3">
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
          Total : <span className="fw-bold">{dataStudentsInClass.length}</span>
        </div>
      </div>
      <DataTable
        columns={columnsStudentInClass}
        data={filterDataStudentInClass}
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
