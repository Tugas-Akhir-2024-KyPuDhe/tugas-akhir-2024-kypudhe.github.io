import React from "react";
import { FaCalendarDay, FaCircle, FaPen, FaTrash } from "react-icons/fa6";
import { formatDate } from "../utils/myFunctions";
import parse from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

interface Artikel {
  idArtikel: number;
  uuidArtikel: string;
  imageArtikel: string;
  tipeArtikel: string;
  dateArtikel: Date;
  statusArtikel: string;
  titleArtikel: string;
  descArtikel: string;
  handleDeleteBerita: (idArtikel: number) => void;
  loadingDeleteBerita: boolean;
}

export const CardBerita: React.FC<Artikel> = ({
  idArtikel,
  uuidArtikel,
  imageArtikel,
  tipeArtikel,
  dateArtikel,
  statusArtikel,
  titleArtikel,
  descArtikel,
  handleDeleteBerita,
  loadingDeleteBerita,
}) => {
  const navigate = useNavigate()
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  return (
    <article>
      <div className="card border-0 efect-hover-smooth">
        <Link to={`/berita/${uuidArtikel}`} className="rounded">
          <div className="position-absolute p-2 text-light fw-bold rounded-top bg-blue">
            <FaCalendarDay />
            <span className="ms-2" style={{ fontSize: "0.9em" }}>
              {formatDate(dateArtikel)}
            </span>
          </div>
          <img
            className="img-fluid bsb-scale bsb-hover-scale-up rounded-top"
            loading="lazy"
            src={imageArtikel}
            alt={titleArtikel}
            style={{ height: "220px", width: "100%", objectFit: "cover" }}
          />
        </Link>
        <div className="card-body border bg-white p-4 border-0 shadow-sm rounded">
          <div className="entry-header mb-3">
            <ul className="entry-meta list-unstyled d-flex mb-2">
              <li>
                <a className="text-decoration-none text-blue fw-bold" href="#">
                  {tipeArtikel}
                </a>
              </li>
            </ul>
            <h2 className="card-title entry-title h5 fw-medium mb-0">
              <Link
                to={`/berita/${uuidArtikel}`}
                className="link-dark text-decoration-none text-2line"
              >
                {titleArtikel}
              </Link>
            </h2>
          </div>
          <p className="card-text entry-summary text-secondary text-4line">
            {parse(descArtikel)}
          </p>
          {userLoginCookie.role === "STAFF" && (
            <>
              <hr />
              <div className="row">
                <div className="col-6 m-auto">
                  <span
                    className={`fw-medium text-${
                      statusArtikel === "PUBLISH"
                        ? "success"
                        : statusArtikel === "DRAFT"
                        ? "warning"
                        : "secondary"
                    }`}
                  >
                    <FaCircle
                      className={`me-2 ${
                        statusArtikel === "PUBLISH"
                          ? "text-success"
                          : statusArtikel === "DRAFT"
                          ? "text-warning"
                          : "text-dark"
                      }`}
                      style={{ fontSize: "8px" }}
                    />
                    {statusArtikel}
                  </span>
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn btn-warning btn-sm me-2 text-light"
                    onClick={() => navigate(`update/${uuidArtikel}`)}
                    disabled={loadingDeleteBerita}
                  >
                      <FaPen />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteBerita(idArtikel)}
                    disabled={loadingDeleteBerita}
                  >
                    {loadingDeleteBerita ? (
                      <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
