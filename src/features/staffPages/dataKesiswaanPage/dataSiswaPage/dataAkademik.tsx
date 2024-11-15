import React from "react";

export const DataAkademik: React.FC = () => {
  return (
    <>
      <h5 className="postion-relatif">Data Akademik</h5>
      <div
        className=""
        style={{
          position: "absolute",
          left: 25,
          // bottom: 0,
          width: "50px",
          height: "5px",
          backgroundColor: "var(--blue-color)",
        }}
      />
      <div className="mt-5">
        <div className="mb-3">
          <label className="fw-bold">Kelas</label>
          <div className="fw-medium">XII</div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Jurusan</label>
          <div className="fw-medium">Rekayasa Perangkat Lunak</div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Tahun Masuk</label>
          <div className="fw-medium">2023</div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Status Siswa</label>
          <div className="fw-medium">Aktif</div>
        </div>
      </div>
    </>
  );
};
