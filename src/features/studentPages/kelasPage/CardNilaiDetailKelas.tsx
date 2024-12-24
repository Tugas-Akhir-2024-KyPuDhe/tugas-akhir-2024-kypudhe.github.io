import React from "react";
import { StudentHistory } from "../../../interface/studentHistory.interface";

interface CardProps {
  loading: boolean;
  data: StudentHistory;
}

export const CardNilaiDetailKelas: React.FC<CardProps> = ({
  loading,
  data,
}) => {
  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{
        backgroundColor: "#fff",
        position: "relative",
      }}
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
      <div className="row g-3">
        <div className="col-12">
          <div className="fw-bold position-relative pb-2">
            Nilai Siswa
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
        <div className="col-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th
                    className="py-3 bg-blue text-light text-center"
                    scope="col"
                    style={{ width: "50px" }}
                  >
                    No
                  </th>
                  <th className="border-start py-3 bg-blue text-light" scope="col">
                    Mata Pelajaran
                  </th>
                  <th className="border-start py-3 bg-blue text-light" scope="col">
                    Guru Pengajar
                  </th>
                  <th className="border-start text-center py-3 bg-blue text-light" scope="col" style={{ width: '70px' }}>
                    Tugas
                  </th>
                  <th className="border-start text-center py-3 bg-blue text-light text-center" scope="col" style={{ width: '70px' }}>
                    UH
                  </th>
                  <th className="border-start text-center py-3 bg-blue text-light text-center" scope="col" style={{ width: '70px' }}>
                    PTS
                  </th>
                  <th className="border-start text-center py-3 bg-blue text-light text-center" scope="col" style={{ width: '70px' }}>
                    PAS
                  </th>
                  <th className="border-start text-center py-3 bg-blue text-light text-center" scope="col" style={{ width: '70px' }}>
                    Portofolio
                  </th>
                  <th className="border-start text-center py-3 bg-blue text-light text-center" scope="col" style={{ width: '70px' }}>
                    Proyek
                  </th>
                  <th className="border-start py-3 bg-blue text-light text-center" scope="col">
                    KET
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && data.currentClass.CourseInClass?.map((mapel, index) => (
                  <tr key={index}>
                    <td className="py-3 text-center" scope="row">
                      {index + 1}
                    </td>
                    <td className="py-3">{mapel.courseDetail.name}</td>
                    <td className="py-3">{mapel.teacher.name}</td>
                    <td className="py-3 text-center">{mapel.courseDetail.StudentsGrades![0] ? mapel.courseDetail.StudentsGrades![0].task || "-" : "-"}</td>
                    <td className="py-3 text-center">{mapel.courseDetail.StudentsGrades![0] ? mapel.courseDetail.StudentsGrades![0].UH || "-" : "-"}</td>
                    <td className="py-3 text-center">{mapel.courseDetail.StudentsGrades![0] ? mapel.courseDetail.StudentsGrades![0].PTS || "-" : "-"}</td>
                    <td className="py-3 text-center">{mapel.courseDetail.StudentsGrades![0] ? mapel.courseDetail.StudentsGrades![0].PAS || "-" : "-"}</td>
                    <td className="py-3 text-center">{mapel.courseDetail.StudentsGrades![0] ? mapel.courseDetail.StudentsGrades![0].portofolio || "-" : "-"}</td>
                    <td className="py-3 text-center">{mapel.courseDetail.StudentsGrades![0] ? mapel.courseDetail.StudentsGrades![0].proyek || "-" : "-"}</td>
                    <td className="py-3 text-center">{mapel.courseDetail.StudentsGrades![0] ? mapel.courseDetail.StudentsGrades![0].description || "-" : "-"}</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={10} className="py-3 text-center">
                      Tidak ada data mata pelajaran untuk kelas ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
