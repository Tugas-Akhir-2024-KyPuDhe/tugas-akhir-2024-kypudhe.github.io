import React from "react";
import { CourseInClass } from "../../../../interface/courseInClass.interface";

interface CardProps {
  loading: boolean;
  teacherName: string;
  data: CourseInClass;
}

export const CardDetailKelas: React.FC<CardProps> = ({
  loading,
  data,
  teacherName,
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
            Detail Kelas
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
            <div className="col-2 fw-medium">Guru Pengajar</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{data && teacherName}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Nama Kelas</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{data && data.class.name}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Mata Pelajaran</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">
              {data && data.courseDetail.name}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-medium">Jadwal</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">
              {data && data.day}, {data && data.timeStart} -{" "}
              {data && data.timeEnd}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
