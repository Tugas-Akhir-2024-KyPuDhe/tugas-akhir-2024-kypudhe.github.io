import React from "react";

export const DataOrangTua: React.FC = () => {
  return (
    <>
      <h5 className="postion-relatif">Data Orang tua</h5>
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
          <label className="fw-bold">Nama Ayah</label>
          <div className="fw-medium">Agus</div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Nama Ibu</label>
          <div className="fw-medium">Luna</div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Nomor Handphone Orang Tua</label>
          <div className="fw-medium">082382383832</div>
        </div>
      </div>
    </>
  );
};
