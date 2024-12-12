import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { StudentDetail } from "../../../../interface/student.interface";
import { Class } from "../../../../interface/studentClass.interface";

interface ModalAddStudentInClassProps {
  dataAllStudents: StudentDetail[];
  dataStudentsInClass: StudentDetail[];
  dataClass: Class;
  keySearch: string;
}

export const ModalAddStudentInClass: React.FC<ModalAddStudentInClassProps> = ({
  dataAllStudents,
  dataStudentsInClass,
  dataClass,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filterDataStudent = dataAllStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    },
    {
      name: "NIS",
      selector: (row: StudentDetail) => row.nis,
      sortable: true,
      width: "100px",
    },
    {
      name: "NISN",
      selector: (row: StudentDetail) => row.nisn,
      sortable: true,
      width: "100px",
    },
    {
      name: "Jurusan",
      selector: (row: StudentDetail) => row.Major.majorCode || "",
      sortable: true,
      width: "100px",
    },
    {
      name: "No.Telp",
      selector: (row: StudentDetail) => row.phone,
      sortable: true,
      width: "120px",
    },
    {
      name: "Pilih",
      cell: (row: StudentDetail) => (
        <div className="form-check">
          <input
            style={{ width: "1.1rem", height: "1.1rem" }}
            className="form-check-input"
            type="checkbox"
            value={row.id}
          />
        </div>
      ),
      width: "80px",
    },
  ];

  return (
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
              <div className="col-12 col-lg-8">
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <div className="">
                      Total :{" "}
                      <span className="fw-bold">{dataAllStudents.length}</span>
                    </div>
                    <div className="">
                      Dipilih : <span className="fw-bold">0</span>
                    </div>
                  </div>
                  <div className="col-6 col-lg-5">
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
                className="col-12 col-lg-4"
                style={{ borderLeft: "0.5px solid grey" }}
              >
                <div className="mb-3 fw-bold">Siswa Dipilih</div>
                <div className="row">
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-4 fw-medium">TA</div>
                      <div className="col-auto">:</div>
                      <div className="col-7 fw-medium">
                        {dataClass?.academicYear}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-4 fw-medium">Kelas</div>
                      <div className="col-auto">:</div>
                      <div className="col-7 fw-medium">{dataClass?.name}</div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-4 fw-medium">Kapasitas </div>
                      <div className="col-auto">:</div>
                      <div className="col-7 fw-medium">
                        {dataClass?.capacity}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-4 fw-medium">Saat Ini </div>
                      <div className="col-auto">:</div>
                      <div className="col-7 fw-medium">
                        {dataStudentsInClass?.length} Siswa
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-4 fw-medium">Wali Kelas </div>
                      <div className="col-auto">:</div>
                      <div className="col-7 fw-medium">
                        {dataClass?.homeRoomTeacher.name}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <button className="btn btn-primary border-0 bg-blue w-100">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
