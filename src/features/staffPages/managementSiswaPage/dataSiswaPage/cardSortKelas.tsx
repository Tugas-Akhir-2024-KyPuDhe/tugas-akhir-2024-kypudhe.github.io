import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";

interface CardProps {
  color: string;
  title: string;
  subTitle: string;
  total: number;
}

export const CardSortKelas: React.FC<CardProps> = ({
  color,
  title,
  subTitle,
  total,
}) => {
  return (
    <>
      <div className="col-md-4 col-xl-3">
        <div
          className={`card mb-3`}
          style={{ color: `${color}`, border: `${color} solid 1.5px` }}
        >
          <div className="card-body">
            <h6 className="card-title mb-3">{title}</h6>
            <h2 className="d-flex justify-content-between align-items-center">
              <SiGoogleclassroom />
              <span className="fw-medium">{total}</span>
            </h2>
            <p className="mb-0"></p>
            <p className="mb-3 fw-bold">{subTitle}</p>
            <button className="btn btn-sm btn-primary bg-blue w-100">
              Detail <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
