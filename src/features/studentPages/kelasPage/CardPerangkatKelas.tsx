import React from "react";
import { IStudentPositionInClass } from "../../../interface/studentPosition.interface";

interface CardProps {
  loading: boolean;
  data?: IStudentPositionInClass[];
}

export const CardPerangkatKelas: React.FC<CardProps> = ({
  loading,
  data = [],
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
            Perangkat Kelas
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
          {data.length > 1
            ? data.map((dt, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-2 fw-medium">{dt.positionName}</div>
                  <div className="col-auto">:</div>
                  <div className="col-9 fw-medium">{dt.student.name}</div>
                </div>
              ))
            : "Perangkat kelas masih kosong"}
        </div>
      </div>
    </div>
  );
};
