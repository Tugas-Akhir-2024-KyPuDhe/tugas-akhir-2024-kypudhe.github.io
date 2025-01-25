import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { GrSave } from "react-icons/gr";
import { CurrentClass } from "../../../../interface/studentHistory.interface";
import {
  UpdateStudentAttendance,
  IStudentAttendanceInClass,
} from "../../../../interface/studentAttendance.interface";

interface AbsensiProps {
  loading: boolean;
  data: IStudentAttendanceInClass;
  kelas: CurrentClass;
  getAttendance: (classId: number, date: string) => void;
  createNewAttendace: (classId: number, date: string) => void;
  updateStatusAttendace: (
    dataUpdateAtt: UpdateStudentAttendance[],
    dateAtt: string,
    classId: number,
    attendanceId: number
  ) => void;
  updateFinalAttendance: (
    classId: number,
    attendanceId: number,
    date: string
  ) => void;
}

export const InputAbsensi: React.FC<AbsensiProps> = ({
  loading,
  data,
  kelas,
  getAttendance,
  createNewAttendace,
  updateStatusAttendace,
  updateFinalAttendance,
}) => {
  const today = new Date();
  today.setHours(today.getHours() + 7);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDateToday = `${year}-${month}-${day}`;
  const [selectedDate, setSelectedDate] = useState(formattedDateToday);

  const [attendanceData, setAttendanceData] = useState(
    data?.detailAttendanceStudents || []
  );

  useEffect(() => {
    if (data?.detailAttendanceStudents) {
      setAttendanceData(data.detailAttendanceStudents);
    }
  }, [data]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    getAttendance(kelas.id, selectedDate);
  };

  const handleStatusChange = (index: number, status: number) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance[index] = {
      ...updatedAttendance[index],
      status,
    };
    setAttendanceData(updatedAttendance);
  };

  const handleNoteChange = (index: number, note: string) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance[index] = {
      ...updatedAttendance[index],
      notes: note,
    };
    setAttendanceData(updatedAttendance);
  };

  const saveAttendance = () => {
    const formattedData = attendanceData.map((siswa) => ({
      id: siswa.id,
      nis: siswa.student.nis,
      notes: siswa.notes || "",
      status: siswa.status,
    }));
    updateStatusAttendace(formattedData, selectedDate, kelas.id, data.id);
  };

  const countStatus = (
    attendanceData: IStudentAttendanceInClass["detailAttendanceStudents"]
  ) => {
    const statusCount = {
      hadir: 0,
      izin: 0,
      sakit: 0,
      alpa: 0,
    };

    attendanceData.forEach((siswa) => {
      if (siswa.status === 1) statusCount.hadir += 1;
      else if (siswa.status === 2) statusCount.izin += 1;
      else if (siswa.status === 3) statusCount.sakit += 1;
      else if (siswa.status === 4) statusCount.alpa += 1;
    });

    return statusCount;
  };

  const { hadir, izin, sakit, alpa } = countStatus(attendanceData);

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
              <div className="col-3 col-md-2 fw-medium">Tanggal Pelaksanaan</div>
              <div className="col-auto">:</div>
              <div className="col fw-medium">
                <input
                  type="date"
                  id="dateInput"
                  className="form-control"
                  value={selectedDate}
                  onChange={handleDateChange}
                  max={formattedDateToday}
                />
              </div>
            </div>
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
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">Status</div>
              <div className="col-auto">:</div>
              <div className="col fw-medium">
                <span
                  className={
                    data
                      ? data.status === 1
                        ? "text-success"
                        : "text-warning"
                      : "text-danger"
                  }
                >
                  {data
                    ? data.status === 1
                      ? "Selesai"
                      : "Pending"
                    : "Belum Dibuat"}
                </span>
              </div>
            </div>
            {data && (
              <>
                <div className="row mb-3">
                  <div className="col-3 col-md-2 fw-medium">Dibuat Oleh</div>
                  <div className="col-auto">:</div>
                  <div className="col fw-medium">{data.createdBy}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-12 col-md-3 text-center border py-4 mb-4 mb-lg-0">
                    <div className="h-100 d-flex justify-content-center align-items-center">
                      <div>
                        <div className="display-6 fw-bold">
                          {data.detailAttendanceStudents.length}
                        </div>
                        <div className="fw-medium">TOTAL</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-9 my-auto">
                    <div className="row justify-content-center">
                      <div className="col-3 text-center text-success">
                        <div className="display-6 fw-bold">{hadir}</div>
                        <div className="fw-medium">HADIR</div>
                      </div>
                      <div className="col-3 text-center">
                        <div className="display-6 fw-bold">{izin}</div>
                        <div className="fw-medium">IZIN</div>
                      </div>
                      <div className="col-3 text-center">
                        <div className="display-6 fw-bold">{sakit}</div>
                        <div className="fw-medium">SAKIT</div>
                      </div>
                      <div className="col-3 text-center text-danger">
                        <div className="display-6 fw-bold">{alpa}</div>
                        <div className="fw-medium">ALPA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!data && (
              <div className="text-end">
                <button
                  type="button"
                  onClick={() => createNewAttendace(kelas.id, selectedDate)}
                  className="btn btn-primary border-0 bg-blue"
                >
                  {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Buat Absensi"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {data && (
        <div
          className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
          style={{ backgroundColor: "#fff", position: "relative" }}
        >
          {/* Show the loader overlay when loading */}
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
                <table className="table">
                  <thead>
                    <tr>
                      <th
                        className="border-start py-3 bg-blue text-light text-center"
                        scope="col"
                        style={{ fontSize: "0.9rem" }}
                      >
                        No
                      </th>
                      <th
                        className="border-start py-3 bg-blue text-light"
                        scope="col"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Nama Siswa
                      </th>
                      <th
                        className="border-start text-center py-3 bg-blue text-light"
                        scope="col"
                        style={{ width: "90px", fontSize: "0.9rem" }}
                      >
                        Hadir
                      </th>
                      <th
                        className="border-start text-center py-3 bg-blue text-light"
                        scope="col"
                        style={{ width: "90px", fontSize: "0.9rem" }}
                      >
                        Izin
                      </th>
                      <th
                        className="border-start text-center py-3 bg-blue text-light text-center"
                        scope="col"
                        style={{ width: "90px", fontSize: "0.9rem" }}
                      >
                        Sakit
                      </th>
                      <th
                        className="border-start text-center py-3 bg-blue text-light text-center"
                        scope="col"
                        style={{ width: "90px", fontSize: "0.9rem" }}
                      >
                        Alpa
                      </th>
                      <th
                        className="border-start text-center py-3 bg-blue text-light text-center"
                        scope="col"
                        style={{ width: "200px", fontSize: "0.9rem" }}
                      >
                        Catatan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((siswa, index) => (
                      <tr key={siswa.id}>
                        <td className="text-center">{index + 1}</td>
                        <td>{siswa.student.name}</td>
                        <td className="text-center">
                          <input
                            type="radio"
                            name={`absensi-${siswa.id}`}
                            checked={siswa.status === 1}
                            onChange={() => handleStatusChange(index, 1)}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="radio"
                            name={`absensi-${siswa.id}`}
                            checked={siswa.status === 2}
                            onChange={() => handleStatusChange(index, 2)}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="radio"
                            name={`absensi-${siswa.id}`}
                            checked={siswa.status === 3}
                            onChange={() => handleStatusChange(index, 3)}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="radio"
                            name={`absensi-${siswa.id}`}
                            checked={siswa.status === 4}
                            onChange={() => handleStatusChange(index, 4)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={siswa.notes || ""}
                            onChange={(e) =>
                              handleNoteChange(index, e.target.value)
                            }
                            className="form-control"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {data.status !== 1 && (
              <div className="col-12">
                <div className="text-end">
                  <button
                    type="button"
                    onClick={() => saveAttendance()}
                    className="btn btn-success border-0 me-3 py-2"
                  >
                    <FaSave className="me-2" /> Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateFinalAttendance(kelas.id, data.id, selectedDate)
                    }
                    className="btn btn-success border-0 bg-blue py-2"
                  >
                    <GrSave className="me-2" /> Finalissasi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
