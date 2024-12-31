import React from "react";
import { StaffDetail } from "../../../../interface/staff.interface";
import { Course } from "../../../../interface/course.interface";
import { formatDate } from "../../../../utils/myFunctions";
import { FaCircle } from "react-icons/fa6";

interface CardProps {
  data: StaffDetail;
  allCourse: Course[]
}

export const CardDataAkademik: React.FC<CardProps> = ({data, allCourse}) => {
  return (
    <div>
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
      <div className="row">
        <div className="col-12 col-md-5">
          <div className="mb-3">
            <label className="fw-bold">Nomor Induk Pegawai</label>
            <div className="fw-medium">{data?.nip}</div>
          </div>
          <div className="mb-3">
            <label className="fw-bold">Status Pegawai</label>
            <div className="fw-medium">{data?.type}</div>
          </div>
          <div className="mb-3">
            <label className="fw-bold">Jabatan</label>
            <div className="fw-medium">{data?.position}</div>
          </div>
          <div className="mb-3">
            <label className="fw-bold">Tahun Mulai</label>
            <div className="fw-medium">
              {data?.startDate && formatDate(new Date(data?.startDate))}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <div className="mb-3">
            <label className="fw-bold">Mata Pelajaran</label>
            <div className="fw-medium">
              {allCourse.map((course) => {
                const isCourseInMyList = data?.mapel.includes(course.code);
                return (
                  <div key={course.code} className="mb-2">
                    {isCourseInMyList && (
                      <div>
                        <FaCircle
                          className="mx-2"
                          style={{ fontSize: "0.4rem" }}
                        />{" "}
                        {course.name}{" "}
                        <sup className="text-muted">Kelas: {course.grade}</sup>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
