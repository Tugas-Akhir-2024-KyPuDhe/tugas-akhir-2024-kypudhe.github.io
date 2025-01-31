import React from "react";
import { Tooltip } from "react-tooltip";
import { bgColorAttendance, formatDateTime, formatMonthAndYear, statusAttendance } from "../../../utils/myFunctions";
import { AttendanceMonth } from "../../../interface/studentAttendance.interface";

interface CardProps {
  loading: boolean;
  data: AttendanceMonth[];
}

export const CardAbsensiDetailKelas: React.FC<CardProps> = ({ loading, data }) => {
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
            Absensi Siswa
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
        {data.length > 0 ? (
          data.map((dataMonth, index) => (
            <div key={index} className="col-12 col-md-4">
              <div className="card card-body">
                <div className="fw-medium">
                  {formatMonthAndYear(dataMonth.month)}
                </div>
                <hr />
                <div className="d-flex flex-wrap">
                  {dataMonth.records.map((dataRecord, index2) => {
                    const tooltipId = `tooltip-${index}-${index2}`;
                    const timeAtt = formatDateTime(dataRecord.date).split(" ");
                    const timeClean = `${timeAtt[0]} ${timeAtt[1]} ${timeAtt[2]}`;
                    return (
                      <>
                        <div
                          key={index2}
                          style={{ width: 50 }}
                          id={tooltipId}
                          className={`
                          py-1 px-2 text-center text-light fw-medium border border-light ${bgColorAttendance(
                            dataRecord.status
                          )} 
                        `}
                        >
                          {dataRecord.date.split("-")[2]}
                        </div>
                        <Tooltip
                          anchorId={tooltipId}
                          className="text-light"
                          style={{ backgroundColor: "var(--blue-color)" }}
                          content={
                            timeClean +
                            " (" +
                            statusAttendance(dataRecord.status, 1) +
                            ")"
                          }
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Absensi masih kosong!</p>
        )}
      </div>
    </div>
  );
};
