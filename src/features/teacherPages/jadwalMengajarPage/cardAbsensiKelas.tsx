import React, { useState } from "react";
import { StudentDetail } from "../../../interface/student.interface";
import DataTable from "react-data-table-component";
import { Class } from "../../../interface/studentClass.interface";
import { exportToPDFDaftarSiswaInClass } from "../../../utils/printDocument/daftarSiswaInClass/PDFDaftarSiswaInClass";
import { exportToExcelDaftarSiswaInClass } from "../../../utils/printDocument/daftarSiswaInClass/ExcelDaftarSiswaInClass";
import { StudentsGrades } from "../../../interface/studentGrade.interface";

interface CardProps {
  loading: boolean;
  data: Class;
}

export const CardNilaiKelas: React.FC<CardProps> = ({ loading, data }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const columns = [
    { name: "No", cell: (_row: StudentDetail, index: number) => index + 1, width: "50px" },
    { name: "NIM", selector: (row: StudentDetail) => row.nis, cell: (row: StudentDetail) => row.nis, width: "100px" },
    { name: "Nama", selector: (row: StudentDetail) => row.name, cell: (row: StudentDetail) => row.name },
  ];

  // Komponen untuk menampilkan daftar nilai siswa
  const ExpandedComponent: React.FC<{ data: StudentDetail }> = ({ data }) => (
    <div style={{ padding: "10px", backgroundColor: "#f9f9f9" }}>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <td className="fw-medium">Mata Pelajaran</td>
            <td className="fw-medium">Deskripsi</td>
            <td className="fw-medium">Nilai Akhir</td>
          </tr>
        </thead>
        <tbody>
          {data.StudentsGrades.length > 0 ? (
            data.StudentsGrades.map((grade: StudentsGrades, index: number) => (
              <tr key={index}>
                <td>{grade.course.name}</td>
                <td>{grade.description}</td>
                <td>{grade.finalGrade}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">Tidak ada data nilai</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const filteredData = data?.student.filter((dt) => dt.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  return (
    <div className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded" style={{ backgroundColor: "#fff", position: "relative" }}>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row g-3 d-flex justify-content-between">
        <div className="col-12">
          <div className="fw-bold position-relative pb-2">
            Daftar Siswa
            <div className="underline" />
          </div>
        </div>
        <div className="col-6 col-lg-3 col-md-3">
          <div className="btn-group">
            <div className="dropdown">
              <button className="btn border-success text-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Export Data
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => exportToExcelDaftarSiswaInClass(data.student, data.name, data.major.name, data.academicYear, data.homeRoomTeacher.name)}
                  >
                    Excel
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => exportToPDFDaftarSiswaInClass(data.student, data.name, data.major.name, data.academicYear, data.homeRoomTeacher.name)}
                  >
                    PDF
                  </button>
                </li>
              </ul>
            </div>
          </div>
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
        <div className="pt-2">Total: <span className="fw-bold">{data.student.length}</span></div>
      </div>
      <div className="col-12">
        <DataTable
          columns={columns}
          data={searchTerm ? filteredData : data.student || []}
          pagination
          paginationDefaultPage={50}
          highlightOnHover
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          className="mt-3"
          customStyles={{
            rows: { style: { "&:hover": { backgroundColor: "#f5f5f5", color: "#007bff" } } },
            headCells: { style: { backgroundColor: "var(--blue-color)", color: "#ffffff", fontWeight: "bold", textAlign: "center", border: "0.1px solid #ddd" } }
          }}
        />
      </div>
    </div>
  );
};
