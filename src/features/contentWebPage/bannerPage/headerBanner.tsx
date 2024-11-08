import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export const HeaderBanner: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="m-1 m-lg-4 m-md-4 my-4">
      <div className="row">
        <div className="col-12 col-lg-6 col-md-6">
          <div className="row d-flex">
            <div className="col-auto">
              <Link
                to="/content-web-banner/tambah"
                className="btn btn-primary border-0 bg-blue"
              >
                <MdAdd className="display-6" />
              </Link>
            </div>

            <div className="col">
              <div className="">
                <div className="fw-bold fs-5 text-dark-soft">Banner</div>
                <div className="">Banner Web SMKN 1 Lumban Julu</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-md-6 text-end">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-lg btn-danger"
          >
            <FaArrowLeft />
          </button>
        </div>
      </div>
    </div>
  );
};