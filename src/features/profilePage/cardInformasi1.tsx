import React from "react";
import useCookie from "react-use-cookie";
import { formatDate } from "../../utils/myFunctions";

interface dataInformasi {
  // STAFF OR TEACHER
  nip: string;
  position: string;
  startDate: string;
  typeStaff: string;
  // STUDENT
  nis: string;
  nisn: string;
}

export const CardInformasi1: React.FC<dataInformasi> = ({
  nip,
  position,
  startDate,
  typeStaff,
  nis,
  nisn,
}) => {
  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  return (
    <>
      <div className="col-12">
        <div
          className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 mb-lg-0 mb-md-0 rounded"
          style={{ backgroundColor: "#fff" }}
        >
          {userLoginCookie.role === "STUDENT" && (
            <>
              <div className="fw-bold fs-5 mb-4 text-dark-soft position-relative pb-2">
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "50px",
                    height: "5px",
                    backgroundColor: "var(--blue-color)",
                  }}
                />
                Informasi Lainnya
              </div>

              <div className="mb-3">
                <div className="row d-flex justify-content-between">
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">
                      Nomor Induk Siswa
                    </label>
                    <div>{nis}</div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">
                      Nomor Induk Siswa Nasional
                    </label>
                    <div>{nisn}</div>
                  </div>
                  <div className="col-7 col-lg-9 mb-3">
                    <label className="fw-bold text-dark-soft">Kelas</label>
                    <div>XII-RPL-1</div>
                  </div>
                  <div className="col-5 col-lg-3 m-auto">
                    <button className="btn btn-primary border-0 bg-blue text-light btn-sm rounded-5 w-100">
                      Lihat
                    </button>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">Wali Kelas</label>
                    <div>Sri Mulyani</div>
                  </div>
                </div>
              </div>
            </>
          )}
          {(userLoginCookie.role === "STAFF" ||
            userLoginCookie.role === "TEACHER") && (
            <>
              <div className="fw-bold fs-5 mb-4 text-dark-soft position-relative pb-2">
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "50px",
                    height: "5px",
                    backgroundColor: "var(--blue-color)",
                  }}
                />
                Informasi Lainnya
              </div>

              <div className="mb-3">
                <div className="row d-flex justify-content-between">
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">
                      Nomor Induk Pegawai
                    </label>
                    <div>{nip}</div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">Status Pegawai</label>
                    <div>{typeStaff}</div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">Jabatan</label>
                    <div>{position}</div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">Mata Pelajaran</label>
                    <div>{position}</div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">
                      Tahun Mulai
                    </label>
                    <div>{formatDate(new Date(startDate))}</div>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="fw-bold text-dark-soft">
                      Status
                    </label>
                    <div>Aktif</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
