import React from "react";

interface DataState {
  kelas: string;
  major: string;
  startYear: string;
  studentStatus: string;
}

export const CardDataAkademik: React.FC<DataState> = ({
  kelas,
  major,
  startYear,
  studentStatus,
}) => {
  return (
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
        Data Akademik
      </div>
      <div className="">
        <div className="mb-3">
          <label className="fw-bold">Kelas</label>
          <div className="fw-medium">{kelas}</div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Jurusan</label>
          <div className="fw-medium">{major}</div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Tahun Masuk</label>
          <div className="fw-medium">{startYear}</div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Status Siswa</label>
          <div className="fw-medium">{studentStatus}</div>
        </div>
      </div>
    </>
  );
};
