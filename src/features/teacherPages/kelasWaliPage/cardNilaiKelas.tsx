import React, { useState } from "react";
import { StudentDetail } from "../../../interface/student.interface";
import DataTable from "react-data-table-component";
import { CourseInClass } from "../../../interface/courseInClass.interface";
import { Class } from "../../../interface/studentClass.interface";

interface CardProps {
  loading: boolean;
  data: Class;
  refreshData?: () => void;
}

export const CardNilaiKelas: React.FC<CardProps> = ({ data }) => {
  console.log("ninlai: ",data);
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStudent] = useState<StudentDetail | null>(null);

  const columns = [
    {
      name: "No",
      cell: (_row: CourseInClass, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Mata Pelajaran",
      cell: (row: CourseInClass) => row.courseDetail.name,
    },
    {
      name: (
        <div className="w-100 text-center">
          Nilai <br />
          Tugas
        </div>
      ),
      cell: (row: CourseInClass) => (
        <div className="w-100 text-center">
          {(row.courseDetail.StudentsGrades![0] &&
            (row.courseDetail.StudentsGrades![0].task || "-")) ||
            "-"}
        </div>
      ),
      width: "80px",
    },
    {
      name: (
        <div className="w-100 text-center">
          Nilai <br />
          UH
        </div>
      ),
      cell: (row: CourseInClass) => (
        <div className="w-100 text-center">
          {(row.courseDetail.StudentsGrades![0] &&
            (row.courseDetail.StudentsGrades![0].UH || "-")) ||
            "-"}
        </div>
      ),
      width: "80px",
    },
    {
      name: (
        <div className="w-100 text-center">
          Nilai <br />
          PTS
        </div>
      ),
      cell: (row: CourseInClass) => (
        <div className="w-100 text-center">
          {(row.courseDetail.StudentsGrades![0] &&
            (row.courseDetail.StudentsGrades![0].PTS || "-")) ||
            "-"}
        </div>
      ),
      width: "80px",
    },
    {
      name: (
        <div className="w-100 text-center">
          Nilai <br />
          PAS
        </div>
      ),
      cell: (row: CourseInClass) => (
        <div className="w-100 text-center">
          {(row.courseDetail.StudentsGrades![0] &&
            (row.courseDetail.StudentsGrades![0].PAS || "-")) ||
            "-"}
        </div>
      ),
      width: "80px",
    },
    {
      name: (
        <div className="w-100 text-center">
          Nilai <br />
          Porto
        </div>
      ),
      cell: (row: CourseInClass) => (
        <div className="w-100 text-center">
          {(row.courseDetail.StudentsGrades![0] &&
            (row.courseDetail.StudentsGrades![0].portofolio || "-")) ||
            "-"}
        </div>
      ),
      width: "80px",
    },
    {
      name: (
        <div className="w-100 text-center">
          Nilai <br />
          Proyek
        </div>
      ),
      cell: (row: CourseInClass) => (
        <div className="w-100 text-center">
          {(row.courseDetail.StudentsGrades![0] &&
            (row.courseDetail.StudentsGrades![0].proyek || "-")) ||
            "-"}
        </div>
      ),
      width: "80px",
    },
    {
      name: (
        <div className="w-100 text-center">
          Nilai <br />
          Akhir
        </div>
      ),
      cell: () => <div className="w-100 text-center">-</div>,
      width: "80px",
    },
    {
      name: (
        <div className="w-100 text-center">
          Nilai <br />
          Huruf
        </div>
      ),
      cell: () => <div className="w-100 text-center">-</div>,
      width: "80px",
    },
    {
      name: "Ket",
      cell: (row: CourseInClass) =>
        (row.courseDetail.StudentsGrades![0] &&
          (row.courseDetail.StudentsGrades![0].description || "-")) ||
        "-",
    },
  ];

  return (
    <>
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
          Total : <span className="fw-bold">{data.CourseInClass!.length}</span>
        </div>
      </div>

      <div className="col-12">
        <DataTable
          columns={columns}
          data={data.CourseInClass || []}
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
      {/* Modal */}
      <div
        className="modal fade"
        id="modalDetailDesk"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detail Keterangan Siswa</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-2 fw-medium">Nama</div>
                    <div className="col-auto">:</div>
                    <div className="col-9 fw-medium">
                      {(selectedStudent && selectedStudent.name) || ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-2 fw-medium">NIS</div>
                    <div className="col-auto">:</div>
                    <div className="col-9 fw-medium">
                      {(selectedStudent && selectedStudent.nis) || ""}
                    </div>
                  </div>
                </div>
              </div>
              {/* <textarea
                className="form-control"
                placeholder="Masukkan Catatan..."
                readOnly
                value={
                  grades[(selectedStudent && selectedStudent.nis) || ""]
                    ?.description || ""
                }
              ></textarea> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
