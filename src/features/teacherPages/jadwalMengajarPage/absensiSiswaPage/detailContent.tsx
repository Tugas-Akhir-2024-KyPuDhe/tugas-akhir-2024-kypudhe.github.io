import React, { useState } from "react";
import { StudentDetail } from "../../../../interface/student.interface";
import { FaSave } from "react-icons/fa";
import { GrSave } from "react-icons/gr";

interface AttendanceProps {
  loading: boolean;
  data: StudentDetail[];
}

export const InputAttendance: React.FC<AttendanceProps> = ({
  loading,
  data,
}) => {
  // Dapatkan tanggal hari ini dalam format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Atur default state ke tanggal hari ini
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedDate(e.target.value);
  };

  return (
    <>
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
              <div className="col-2 fw-medium">Tanggal Pelaksanaan</div>
              <div className="col-auto">:</div>
              <div className="col fw-medium">
                <input
                  type="date"
                  id="dateInput"
                  className="form-control"
                  value={selectedDate} // Default ke tanggal hari ini
                  onChange={handleDateChange}
                  max={today} // Batas maksimum adalah hari ini
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Wali Kelas</div>
              <div className="col-auto">:</div>
              <div className="col fw-medium">...</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Kelas</div>
              <div className="col-auto">:</div>
              <div className="col fw-medium">...</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Status </div>
              <div className="col-auto">:</div>
              <div className="col fw-medium">...</div>
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-primary border-0 bg-blue"
              >
                Buat Absensi
              </button>
            </div>
          </div>
        </div>
      </div>
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
                      className="border-start py-3 bg-blue text-light"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Nama Siswa
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light"
                      scope="col"
                      style={{ width: "120px", fontSize: "0.9rem" }}
                    >
                      Hadir
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light"
                      scope="col"
                      style={{ width: "120px", fontSize: "0.9rem" }}
                    >
                      Izin
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ width: "120px", fontSize: "0.9rem" }}
                    >
                      Sakit
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
                  {data?.map((siswa, index) => (
                    <tr key={index}>
                      <td>{siswa.name}</td>
                      <td className="text-center py-3">
                        <input type="radio" name={`absensi[${index}]`} />
                      </td>
                      <td className="text-center py-3">
                        <input type="radio" name={`absensi[${index}]`} />
                      </td>
                      <td className="text-center py-3">
                        <input type="radio" name={`absensi[${index}]`} />
                      </td>
                      <td className="py-3">
                        <input
                          type="text"
                          name={`note[${index}]`}
                          className="form-control form-control-sm"
                          placeholder="Catatan.."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12">
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-success border-0 me-3 py-2"
              >
                <FaSave className="me-2" /> Simpan
              </button>
              <button
                type="submit"
                className="btn btn-success border-0 bg-blue py-2"
              >
                <GrSave className="me-2" /> Finalissasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
