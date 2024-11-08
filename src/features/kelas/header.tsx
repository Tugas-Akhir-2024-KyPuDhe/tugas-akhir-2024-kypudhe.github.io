import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="m-1 m-lg-4 m-md-4 my-4">
      <div className="row">
        <div className="col-12 col-lg-6 col-md-6">
          <div className="row d-flex">
            <div className="col-auto">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-lg btn-danger"
              >
                <FaArrowLeft />
              </button>
            </div>

            <div className="col">
              <div className="">
                <div className="fw-bold fs-5 text-dark-soft">Kelas</div>
                <div className="">Kelas Siswa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
