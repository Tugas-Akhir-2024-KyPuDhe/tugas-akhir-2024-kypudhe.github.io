import React from "react";

interface CardInformasiProps {
  icon: React.ReactNode;
  title: string;
  total: number;
  bgColor: string;
}

export const CardInformasi: React.FC<CardInformasiProps> = ({
  icon,
  title,
  total,
  bgColor,
}) => {
  return (
    <div className="col-6 col-lg-3 col-md-4">
      <div
        className="card mb-3 border-0 rounded shadow-sm"
        style={{ backgroundColor: bgColor }} 
      >
        <div className="card-body text-center text-dark-soft">
          <h5 className="card-title">{icon}</h5>
          <div className="card-text fw-medium fs-5">{title}</div>
          <div className="card-text fw-bold fs-5">{total}</div>
        </div>
      </div>
    </div>
  );
};
