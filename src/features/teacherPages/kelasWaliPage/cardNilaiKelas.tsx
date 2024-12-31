import React from "react";
import { StudentDetail } from "../../../interface/student.interface";
import DataTable from "react-data-table-component";
import { CourseInClass } from "../../../interface/courseInClass.interface";
import { Class } from "../../../interface/studentClass.interface";
import { exportToPDFDaftarNilaiDetailSiswa } from "../../../utils/printDocument/daftarNilaiDetailSiswa/PDFDaftarNilaiSiswa";
import { exportToExcelDaftarNilaiDetailSiswa } from "../../../utils/printDocument/daftarNilaiDetailSiswa/ExcelDaftarSiswaInClass";

interface CardProps {
  student: StudentDetail;
  loading: boolean;
  data: Class;
  refreshData?: () => void;
}

export const CardNilaiKelas: React.FC<CardProps> = ({ data, student }) => {
  const filteredStudentsGrades = data.CourseInClass!.map((course) => {
    return {
      ...course,
      courseDetail: {
        ...course.courseDetail,
        StudentsGrades: course.courseDetail.StudentsGrades!.filter(
          (grade) => grade.nis === student.nis
        ),
      },
    };
  });

  // console.log("ninlai: ",data);
  // console.log("stud: ",student);

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
          <div className="btn-group">
            <div className="dropdown">
              <button
                className="btn border-success text-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Export Data
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() =>
                      exportToExcelDaftarNilaiDetailSiswa(
                        filteredStudentsGrades || [],
                        student.nis,
                        student.name,
                        "xxx",
                        "xxx",
                        student.class.name,
                        data.major.name,
                        data.academicYear,
                        data.homeRoomTeacher.name
                      )
                    }
                  >
                    Excel
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      exportToPDFDaftarNilaiDetailSiswa(
                        filteredStudentsGrades || [],
                        student.nis,
                        student.name,
                        "xxx",
                        "xxx",
                        student.class.name,
                        data.major.name,
                        data.academicYear,
                        data.homeRoomTeacher.name
                      )
                    }
                    className="dropdown-item"
                  >
                    PDF
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <DataTable
          columns={columns}
          data={filteredStudentsGrades || []}
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
    </>
  );
};
