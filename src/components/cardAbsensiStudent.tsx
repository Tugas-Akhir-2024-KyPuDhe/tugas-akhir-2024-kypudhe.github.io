import React from "react";
import { AttendanceMonth } from "../interface/studentAttendance.interface";
import { Tooltip } from "react-tooltip";
import {
  formatMonthAndYear,
  bgColorAttendance,
  formatTanggal,
  statusAttendance,
} from "../utils/myFunctions";

type CardAbsesiProps = {
  data: AttendanceMonth[];
};

export const CardAbsensiStudent: React.FC<CardAbsesiProps> = ({ data }) => {
  return (
    <div className="row mb-3 g-3">
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
                        style={{
                          backgroundColor: "var(--blue-color)",
                          fontSize: "12px",
                          padding: "5px",
                        }}
                        content={
                          formatTanggal(dataRecord.date) +
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
  );
};
