import React from "react";

interface MapelProps {
  imageMapel: string;
  namaMapel: string;
  guruMapel: string;
}

export const CardMapel: React.FC<MapelProps> = ({
  imageMapel,
  namaMapel,
  guruMapel,
}) => {
  return (
    <>
      <div className="card border-0" style={{ width: "16rem" }}>
        <img
          src={imageMapel}
          className="card-img-top"
          alt={namaMapel}
          style={{ width: "100%", height: "160px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-center mb-0">{namaMapel}</h5>
          <p className="card-text text-center text-muted">{guruMapel}</p>
          <a href="#" className="btn btn-primary w-100">
            Detail
          </a>
        </div>
      </div>
    </>
  );
};
