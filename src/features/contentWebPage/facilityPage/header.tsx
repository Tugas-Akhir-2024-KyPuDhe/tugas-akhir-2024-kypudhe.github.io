import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  actionText: string;
  backDisplay: boolean;
  addDisplay: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  actionText,
  backDisplay,
  addDisplay,
}) => {
  const navigate = useNavigate();
  return (
    <div className="m-1 m-lg-4 m-md-4 my-4">
      <div className="row">
        <div className="col-12 col-lg-6 col-md-6">
          <div className="row d-flex">
            {backDisplay && (
              <div className="col-auto">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-lg btn-danger"
              >
                <FaArrowLeft />
              </button>
            </div>
            )}
            <div className="col">
              <div className="">
                <div className="fw-bold fs-5 text-dark-soft">
                  {actionText} Fasilitas
                </div>
                <div className="">Fasilitas Web SMKN 1 Lumban Julu</div>
              </div>
            </div>
          </div>
        </div>
        {addDisplay && (
          <div className="col-12 col-lg-6 col-md-6 text-end">
            <Link
              to="/content-web/facility/create"
              className="btn btn-primary border-0 bg-blue"
            >
              <MdAdd className="display-6" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
