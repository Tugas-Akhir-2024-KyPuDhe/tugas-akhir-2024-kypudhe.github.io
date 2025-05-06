import React, { useState } from "react";
import {
  IDataSummaryAttendance,
  IDetailStudentAttendance,
} from "../../../../interface/studentAttendance.interface";
import {
  bgColorAttendance,
  formatTanggal,
  getCurrentWeekDateRange,
  getDayFromNo,
  getNextWeekDateRange,
  statusAttendance,
} from "../../../../utils/myFunctions";
import { Tooltip } from "react-tooltip";
import { Class } from "../../../../interface/studentClass.interface";

interface AbsensiProps {
  loading: boolean;
  data: IDataSummaryAttendance[];
  dataHeader: IDetailStudentAttendance[];
  kelas?: Class;
  onDateChange: (startDate: string, endDate: string) => void;
}

export const DaftarAbsensi: React.FC<AbsensiProps> = ({
  loading,
  data,
  dataHeader,
  kelas,
  onDateChange,
}) => {
  const { startDate: initialStartDate, endDate: initialEndDate } = getCurrentWeekDateRange();
  
  const [dateRange, setDateRange] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });

  // Handler untuk perubahan tanggal
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    
    if (id === "startDate") {
      const newDateRange = {
        startDate: value,
        endDate: getNextWeekDateRange(value, 0).endDate
      };
      setDateRange(newDateRange);
      onDateChange(newDateRange.startDate, newDateRange.endDate);
    } else if (id === "endDate") {
      // Untuk endDate, kita hitung startDate-nya (Senin)
      const endDate = new Date(value);
      const dayOfWeek = endDate.getDay();
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - diffToMonday);
      
      const formattedStartDate = startDate.toISOString().split('T')[0];
      
      const newDateRange = {
        startDate: formattedStartDate,
        endDate: value
      };
      setDateRange(newDateRange);
      onDateChange(newDateRange.startDate, newDateRange.endDate);
    }
  };

  // Handler untuk navigasi minggu
  const navigateWeek = (direction: number) => {
    const newDateRange = getNextWeekDateRange(dateRange.startDate, direction);
    setDateRange(newDateRange);
    onDateChange(newDateRange.startDate, newDateRange.endDate);
  };

  // Format tanggal untuk tampilan
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <>
      {kelas && (
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
                <div className="col fw-medium">
                  {kelas!.homeRoomTeacher.name}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3 col-md-2 fw-medium">Kelas</div>
                <div className="col-auto">:</div>
                <div className="col fw-medium">{kelas!.name}</div>
              </div>
            </div>
          </div>
        </div>
      )}
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
          <div className="col-12 col-md-6">
            <div className="fw-bold position-relative pb-2">
              Daftar Absensi Siswa
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
          <div className="col-12 col-md-6 fw-medium">
            <div className="row gy-3 align-items-center">
              <div className="col-auto">
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigateWeek(-1)}
                >
                  &lt;
                </button>
              </div>
              <div className="col">
                <input
                  type="date"
                  id="startDate"
                  className="form-control form-control-sm"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="d-none d-md-block col-auto">-</div>
              <div className="col ">
                <input
                  type="date"
                  id="endDate"
                  className="form-control form-control-sm"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="col-auto">
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigateWeek(1)}
                >
                  &gt;
                </button>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col text-center text-muted small">
                {formatDisplayDate(dateRange.startDate)} - {formatDisplayDate(dateRange.endDate)}
              </div>
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
                          {getDayFromNo(index + 1)}
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
                          const tooltipId = `tooltip-${index}-${index2}`;
                          return (
                            <td
                              key={index2}
                              id={tooltipId}
                              className={`tooltip-detail text-center py-3 ${bgColorAttendance(
                                attendance.status
                              )} border`}
                            >
                              <span className="text-light fw-medium">
                                {statusAttendance(attendance.status)}
                              </span>
                              <Tooltip
                                anchorId={tooltipId}
                                className="text-light"
                                style={{
                                  backgroundColor: "var(--blue-color)",
                                  fontSize: "12px",
                                  padding: "5px",
                                }}
                                content={
                                  formatTanggal(attendance.tanggal) +
                                  " (" +
                                  statusAttendance(attendance.status, 1) +
                                  ")"
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