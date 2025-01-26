import React from "react";
import { CurrentClass } from "../../../../interface/studentHistory.interface";
import {
  IDataSummaryAttendance,
  IDetailStudentAttendance,
} from "../../../../interface/studentAttendance.interface";
import {
  bgColorAttendance,
  formatDate,
  statusAttendance,
} from "../../../../utils/myFunctions";
import { Tooltip } from "react-tooltip";

interface AbsensiProps {
  loading: boolean;
  data: IDataSummaryAttendance[];
  dataHeader: IDetailStudentAttendance[];
  kelas: CurrentClass;
}

export const DaftarAbsensi: React.FC<AbsensiProps> = ({
  loading,
  data,
  dataHeader,
  kelas,
}) => {
  return (
    <>
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

        <div className="row g-3">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Buat Absensi
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
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">Wali Kelas</div>
              <div className="col-auto">:</div>
              <div className="col fw-medium">{kelas.homeRoomTeacher.name}</div>
            </div>
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">Kelas</div>
              <div className="col-auto">:</div>
              <div className="col fw-medium">{kelas.name}</div>
            </div>
          </div>
        </div>
      </div>
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

        <div className="row g-3">
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
            <div className="col-12 table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th
                      className="border-start py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ fontSize: "0.9rem", width: "50px" }}
                    >
                      No
                    </th>
                    <th
                      className="border-start py-3 bg-blue text-light"
                      scope="col"
                      style={{ fontSize: "0.9rem", width: "120px" }}
                    >
                      NIS
                    </th>
                    <th
                      className="border-start py-3 bg-blue text-light"
                      scope="col"
                      style={{ fontSize: "0.9rem", width: "400px" }}
                    >
                      Nama Siswa
                    </th>
                    {dataHeader &&
                      dataHeader.map((_, index) => (
                        <th
                          key={index}
                          className="border-start py-3 bg-blue text-light text-center"
                          scope="col"
                          style={{ fontSize: "0.9rem", width: "30px" }}
                        >
                          {index + 1}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((siswa, index) => (
                      <tr key={index}>
                        <td className="text-center py-3">{index + 1}</td>
                        <td className="py-3">{siswa.nis}</td>
                        <td className="py-3">{siswa.name}</td>
                        {siswa.absensi.map((attendance, index2) => {
                          const tooltipId = `tooltip-${index}-${index2}`; // ID unik untuk setiap tooltip
                          return (
                            <td
                              key={index2}
                              id={tooltipId} // Tetapkan ID unik
                              className={`tooltip-detail text-center py-3 ${bgColorAttendance(
                                attendance.status
                              )} border`}
                            >
                              <span className="text-light fw-medium">
                                {statusAttendance(attendance.status)}
                              </span>
                              <Tooltip
                                anchorId={tooltipId} // Gunakan ID unik sebagai anchor
                                className="text-light"
                                style={{ backgroundColor: "var(--blue-color)" }}
                                content={
                                  formatDate(new Date(attendance.tanggal)) +
                                    attendance.notes || " | " + attendance.notes
                                }
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
