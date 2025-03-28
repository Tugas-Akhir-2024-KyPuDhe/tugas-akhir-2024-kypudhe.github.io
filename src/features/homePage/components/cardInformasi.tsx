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
}) => {
  return (
    <div className="col-6 col-lg-3 col-md-4">
      <div
        className="card mb-3 rounded shadow-sm card-shining-effect"
        style={{
          borderLeft: `7px solid var(--blue-color)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="card-body text-center text-dark-soft">
          <h5 className="card-title">{icon}</h5>
          <div className="card-text fw-medium fs-5">{title}</div>
          <div className="card-text fw-bold fs-5">{total}</div>
        </div>
      </div>
      <style>
        {`
          .card {
            cursor: pointer;
          }
          .card-shining-effect::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              120deg,
              transparent,
              rgba(29, 125, 193, 0.2),
              transparent
            );
            transform: rotate(45deg);
            transition: opacity 0.3s ease;
            opacity: 0;
            pointer-events: none;
          }

          .card-shining-effect:hover::before {
            opacity: 1;
            animation: shining 1.5s infinite;
          }

          @keyframes shining {
            0% {
              transform: translateX(-100%) rotate(45deg);
            }
            100% {
              transform: translateX(100%) rotate(45deg);
            }
          }
        `}
      </style>
    </div>
  );
};
