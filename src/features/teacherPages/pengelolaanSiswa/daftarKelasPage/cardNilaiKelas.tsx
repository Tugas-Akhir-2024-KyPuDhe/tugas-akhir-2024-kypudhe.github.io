import React, { useState } from "react";
import { StudentDetail } from "../../../../interface/student.interface";
import { CourseInClass } from "../../../../interface/courseInClass.interface";
import DataTable from "react-data-table-component";
import { FaSave } from "react-icons/fa";
import StudentGradeService from "../../../../services/studentGradeService";
import { Toast } from "../../../../utils/myFunctions";
import { FormStateStudentGrade } from "../../../../interface/studentGrade.interface";

interface CardProps {
  loading: boolean;
  data: CourseInClass;
}

export const CardNilaiKelas: React.FC<CardProps> = ({ loading, data }) => {
  const studentGradeService = StudentGradeService();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [grades, setGrades] = useState<Record<string, FormStateStudentGrade>>(
    {}
  );

  const handleInputChange = (
    studentId: string,
    field: string,
    value: string
  ) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSaveGarde = async (studentName: string, studentId: string) => {
    if (!grades[studentId]) return;

    try {
      const payload: FormStateStudentGrade = {
        ...grades[studentId],
        nis: studentId,
        teacherId: data.class.staffId,
        classId: data.class.id,
        courseCode: data.courseDetail.code,
      };

      const response = await studentGradeService.insertGrade(payload);
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          timer: 5000,
          title: `Nilai ${studentName} Berhasil Diupdate`,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        timer: 5000,
        title: `Nilai ${studentName} Gagal Diupdate`,
      });
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: StudentDetail, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nim",
      selector: (row: StudentDetail) => row.nis,
      width: "100px",
    },
    {
      name: "Nama",
      selector: (row: StudentDetail) => row.name,
    },
    {
      name: "Tugas",
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].task || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={
              grades[row.nis]?.task ||
              (row.StudentsGrades[0] && (row.StudentsGrades[0].task || "-"))
            }
            onChange={(e) => handleInputChange(row.nis, "task", e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: "UH",
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].UH || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={
              grades[row.nis]?.UH ||
              (row.StudentsGrades[0] && (row.StudentsGrades[0].UH || "-"))
            }
            onChange={(e) => handleInputChange(row.nis, "UH", e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: "PTS",
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].PTS || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={
              grades[row.nis]?.PTS ||
              (row.StudentsGrades[0] && (row.StudentsGrades[0].PTS || "-"))
            }
            onChange={(e) => handleInputChange(row.nis, "PTS", e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: "PAS",
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].PAS || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={
              grades[row.nis]?.PAS ||
              (row.StudentsGrades[0] && (row.StudentsGrades[0].PAS || "-"))
            }
            onChange={(e) => handleInputChange(row.nis, "PAS", e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: "Action",
      cell: (row: StudentDetail) => (
        <div className="text-center w-100">
          <button
            className="btn btn-info bg-blue btn-sm border-0 me-2 text-light"
            onClick={() => handleSaveGarde(row.name, row.nis)}
            disabled={loading}
          >
            <FaSave className="me-1" /> Simpan
          </button>
        </div>
      ),
      width: "140px",
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
    </div>
  );
};