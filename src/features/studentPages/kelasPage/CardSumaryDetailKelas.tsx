import React from "react";
import { StudentHistory } from "../../../interface/studentHistory.interface";

interface CardProps {
  loading: boolean;
  data: StudentHistory;
}

export const CardSumaryDetailKelas: React.FC<CardProps> = ({
  loading,
  data,
}) => {
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
          <div className="row mb-3">
            <div className="col-2 fw-medium">Tahun Ajaran</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">
              {data?.currentClass.academicYear}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Wali Kelas</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">
              {data?.currentClass.homeRoomTeacher.name}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Kelas</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{data?.currentClass.name}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Status </div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{data?.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
