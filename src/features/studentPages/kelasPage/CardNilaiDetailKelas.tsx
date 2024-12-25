import React, { useState } from "react";
import { StudentHistory } from "../../../interface/studentHistory.interface";

interface CardProps {
  loading: boolean;
  data: StudentHistory;
}

export const CardNilaiDetailKelas: React.FC<CardProps> = ({
  loading,
  data,
}) => {
  const [selectedDescription, setSelectedDescription] = useState("");

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
                    style={{ width: "50px", fontSize: "0.9rem" }}
                  >
                    No
                  </th>
                  <th
                    className="border-start py-3 bg-blue text-light"
                    scope="col"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Mata Pelajaran
                  </th>
                  <th
                    className="border-start py-3 bg-blue text-light"
                    scope="col"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Guru Pengajar
                  </th>
                  <th
                    className="border-start text-center py-3 bg-blue text-light"
                    scope="col"
                    style={{ width: "70px", fontSize: "0.9rem" }}
                  >
                    Tugas
                  </th>
                  <th
                    className="border-start text-center py-3 bg-blue text-light text-center"
                    scope="col"
                    style={{ width: "70px", fontSize: "0.9rem" }}
                  >
                    UH
                  </th>
                  <th
                    className="border-start text-center py-3 bg-blue text-light text-center"
                    scope="col"
                    style={{ width: "70px", fontSize: "0.9rem" }}
                  >
                    PTS
                  </th>
                  <th
                    className="border-start text-center py-3 bg-blue text-light text-center"
                    scope="col"
                    style={{ width: "70px", fontSize: "0.9rem" }}
                  >
                    PAS
                  </th>
                  <th
                    className="border-start text-center py-3 bg-blue text-light text-center"
                    scope="col"
                    style={{ width: "70px", fontSize: "0.9rem" }}
                  >
                    Portofolio
                  </th>
                  <th
                    className="border-start text-center py-3 bg-blue text-light text-center"
                    scope="col"
                    style={{ width: "70px", fontSize: "0.9rem" }}
                  >
                    Proyek
                  </th>
                  <th
                    className="border-start py-3 bg-blue text-light text-center"
                    scope="col"
                    style={{ fontSize: "0.9rem" }}
                  >
                    KET
                  </th>
                </tr>
              </thead>
              <tbody>
                {(data &&
                  data.currentClass.CourseInClass?.map((mapel, index) => (
                    <tr key={index}>
                      <td className="py-3 text-center" scope="row">
                        {index + 1}
                      </td>
                      <td className="py-3">{mapel.courseDetail.name}</td>
                      <td className="py-3">{mapel.teacher.name}</td>
                      <td className="py-3 text-center">
                        {mapel.courseDetail.StudentsGrades![0]
                          ? mapel.courseDetail.StudentsGrades![0].task || "-"
                          : "-"}
                      </td>
                      <td className="py-3 text-center">
                        {mapel.courseDetail.StudentsGrades![0]
                          ? mapel.courseDetail.StudentsGrades![0].UH || "-"
                          : "-"}
                      </td>
                      <td className="py-3 text-center">
                        {mapel.courseDetail.StudentsGrades![0]
                          ? mapel.courseDetail.StudentsGrades![0].PTS || "-"
                          : "-"}
                      </td>
                      <td className="py-3 text-center">
                        {mapel.courseDetail.StudentsGrades![0]
                          ? mapel.courseDetail.StudentsGrades![0].PAS || "-"
                          : "-"}
                      </td>
                      <td className="py-3 text-center">
                        {mapel.courseDetail.StudentsGrades![0]
                          ? mapel.courseDetail.StudentsGrades![0].portofolio ||
                            "-"
                          : "-"}
                      </td>
                      <td className="py-3 text-center">
                        {mapel.courseDetail.StudentsGrades![0]
                          ? mapel.courseDetail.StudentsGrades![0].proyek || "-"
                          : "-"}
                      </td>
                      <td className="py-3 text-center">
                        <button
                          className="btn btn-link"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeskripsi"
                          onClick={() =>
                            setSelectedDescription(
                              mapel.courseDetail.StudentsGrades![0]
                                ? mapel.courseDetail.StudentsGrades![0]
                                    .description || "-"
                                : "-"
                            )
                          }
                          style={{ fontSize: "0.9rem" }}
                        >
                          Lihat
                        </button>
                      </td>
                    </tr>
                  ))) || (
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
      {/* Modal */}
      <div
        className="modal fade"
        id="modalDeskripsi"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Keterangan</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{selectedDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
