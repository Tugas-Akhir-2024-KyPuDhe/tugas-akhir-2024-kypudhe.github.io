import React from "react";
import DataTable from "react-data-table-component";
import { StudentDetail } from "../../../../interface/student.interface";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface DaftarSiswaProps {
  dataStudentsInClass: StudentDetail[];
  dataAllStudents: StudentDetail[];
  loading: boolean;
  searchTerm: string;
  onChangeSearchTerm: (data: string) => void;
}

export const CardDaftarSiswaDetailKelas: React.FC<DaftarSiswaProps> = ({
  dataStudentsInClass,
  dataAllStudents,
  loading,
  searchTerm,
  onChangeSearchTerm,
}) => {
  const navigate = useNavigate();

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
    // {
    //   name: "Jurusan",
    //   selector: (row: StudentDetail) => row.Major.majorCode || "",
    //   sortable: true,
    //   cell: (row: StudentDetail) => row.Major.majorCode || "",
    //   width: "100px",
    // },
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

  const filterDataStudent = dataAllStudents.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columnsStudent = [
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
      selector: (row: StudentDetail) => row.Major.majorCode || "",
      sortable: true,
      cell: (row: StudentDetail) => row.Major.majorCode || "",
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
      name: "Pilih",
      cell: (row: StudentDetail) => (
        <>
          <div className="form-check">
            <input
              style={{ width: "1.1rem", height: "1.1rem" }}
              className="form-check-input form-check-input-lh"
              type="checkbox"
              value={row.id}
              id="flexCheckDefault"
            />
          </div>
          {/* <button
            className="btn btn-success btn-sm text me-2 text-light"
            onClick={() => navigate(`detail/${row.nis}`)}
            disabled={loading}
          >
            <FaArrowRight />
          </button> */}
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
          <button className="btn border-success text-success me-3">
            Export to Excel
          </button>
          <button
            className="btn border-blue text-blue"
            data-bs-toggle="modal"
            data-bs-target="#modalAddStudentInClass"
          >
            <FaPlus className="me-2 fs-5" /> Tambah Siswa
          </button>
        </div>
        <div className="col-6 col-lg-3 col-md-3">
          <input
            type="text"
            className="form-control border-dark"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => onChangeSearchTerm(e.target.value)}
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

      {/* MODAL DETAIL DATA */}
      <div
        className="modal fade modal-xl p-0"
        id="modalAddStudentInClass"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="row mx-0 pb-4">
              <div className="col p-2 text-start py-3 px-3">
                <div className="fw-bold position-relative pb-2 fs-5">
                  Tambah Siswa Ke Dalam Kelas
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
              <div className="col-auto p-2 text-start py-3 px-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body pb-4">
              <div className="row">
                <div className="col-12 col-md-8">
                  <DataTable
                    columns={columnsStudent}
                    data={filterDataStudent}
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
                <div
                  className="col-12 col-md-4"
                  style={{ borderLeft: "0.5px solid grey" }}
                >
                  <div className="mb-3 fw-bold">Siswa Dipilih</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <div className="indentity">
                          <div className="fw-medium">1. Dhea Romantika</div>
                          <div className="text-muted">223344</div>
                        </div>
                        <div className="action">
                          <div className="button btn btn-sm btn-danger">
                            <FaTrash />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <div className="indentity">
                          <div className="fw-medium">2. Muhammad Syahputra</div>
                          <div className="text-muted">334455</div>
                        </div>
                        <div className="action">
                          <div className="button btn btn-sm btn-danger">
                            <FaTrash />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <div className="indentity">
                          <div className="fw-medium">3. Rizky Fadillah</div>
                          <div className="text-muted">112233</div>
                        </div>
                        <div className="action">
                          <div className="button btn btn-sm btn-danger">
                            <FaTrash />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
