import React from "react";
import { StudentHistory } from "../../../interface/studentHistory.interface";

interface CardProps {
  loading: boolean;
  data: StudentHistory;
}

export const CardAbsensiDetailKelas: React.FC<CardProps> = ({ loading }) => {
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
      </div>
    </div>
  );
};
