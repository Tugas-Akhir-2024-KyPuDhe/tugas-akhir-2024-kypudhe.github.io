import React from "react";
import DataTable from "react-data-table-component";
import { StudentDetail } from "../../../../interface/student.interface";
import { FaEye, FaPen, FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface DaftarSiswaProps {
  data: StudentDetail[];
  loading: boolean;
  searchTerm: string;
  onChangeSearchTerm: (data: string) => void;
}

export const CardDaftarSiswaDetailKelas: React.FC<DaftarSiswaProps> = ({
  data,
  loading,
  searchTerm,
  onChangeSearchTerm,
}) => {
  const navigate = useNavigate();

  const filterData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
      {/* MODAL DETAIL DATA */}
      <div
        className="modal fade modal-lg p-0"
        id="modalAddStudentInClass"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="row mx-0 pb-4">
              <div className="col p-2 text-start py-3 px-3">
                <div className="fw-bold position-relative pb-2 fs-5">
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
              <div className="col-auto p-2 text-start py-3 px-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body py-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
              quos? Dicta voluptatibus facere praesentium quibusdam nisi, nihil
              neque. Saepe repellat nesciunt reprehenderit aut blanditiis
              deleniti eligendi laborum non suscipit accusamus.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
