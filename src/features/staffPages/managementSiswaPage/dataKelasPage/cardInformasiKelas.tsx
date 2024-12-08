import React from "react";
import { Class } from "../../../../interface/studentClass.interface";

interface ClassDetailsProps {
  dataClass?: Class;
  loading: boolean;
}

export const CardInformasiDetailkelas: React.FC<ClassDetailsProps> = ({
  dataClass,
  loading
}) => {
  return (
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
            zIndex: 9999,
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
            Informasi Kelas
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
            <div className="col-2 fw-medium">Tahun Ajaran</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{dataClass?.academicYear}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Nama Kelas</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{dataClass?.name}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Kapasitas </div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{dataClass?.capacity}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Wali Kelas </div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">
              {dataClass?.homeRoomTeacher.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
