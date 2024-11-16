import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="col-12 text-center">
          <div className="display-1 fw-bold">404</div>
          <div className="mb-4 fs-5">Halaman Tidak Ditemukan!</div>
          <Link to="/dashboard" className="btn btn-primary bg-blue px-5">Kembali</Link>
        </div>
      </div>
    </>
  );
};
