import React from "react";
import { CourseInClass } from "../../../interface/courseInClass.interface";

interface CardProps {
  loading: boolean;
  data: CourseInClass[];
}

export const CardDaftarMapelKelas: React.FC<CardProps> = ({
  loading,
  data,
}) => {
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
      <div className="row g-3 d-flex justify-content-between">
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
        <div className="col-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th
                      className="py-3 bg-blue border-start text-light text-center"
                      scope="col"
                      style={{ width: "50px", fontSize: "0.9rem" }}
                    >
                      No
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light"
                      scope="col"
                      style={{ width: "280px", fontSize: "0.9rem" }}
                    >
                      Mata Pelajaran
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Guru Pengajar
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light text-center"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Hari
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light text-center"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Jam Mulai
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light text-center"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Jam Selesai
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((mapel, index) => (
                    <tr key={index}>
                      <td className="py-3 text-center" scope="row">
                        {index + 1}
                      </td>
                      <td className="py-3">{mapel.courseDetail.name}</td>
                      <td className="py-3">{mapel.teacher.name}</td>
                      <td className="py-3 text-center">{mapel.day}</td>
                      <td
                        className="py-3 text-center"
                        style={{ width: "140px" }}
                      >
                        {mapel.timeStart}
                      </td>
                      <td
                        className="py-3 text-center"
                        style={{ width: "140px" }}
                      >
                        {mapel.timeEnd}
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={5} className="py-3 text-center">
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
