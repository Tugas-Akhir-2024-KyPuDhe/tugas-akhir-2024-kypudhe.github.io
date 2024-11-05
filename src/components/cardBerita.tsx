import React from "react";
import { FaCalendarDay } from "react-icons/fa6";
import { formatDateTime } from "../utils/myFunctions";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

interface Artikel {
  uuidArtikel: string;
  imageArtikel: string;
  tipeArtikel: string;
  dateArtikel: Date;
  titleArtikel: string;
  descArtikel: string;
}

export const CardBerita: React.FC<Artikel> = ({
  uuidArtikel,
  imageArtikel,
  tipeArtikel,
  dateArtikel,
  titleArtikel,
  descArtikel,
}) => {
  return (
    <article>
      <div className="card border-0">
        <Link to={`/berita/${uuidArtikel}`} className="rounded">
          <div className="position-absolute p-2 text-light fw-bold rounded-top bg-blue">
            <FaCalendarDay />
            <span className="ms-2" style={{ fontSize: "0.9em" }}>
              {formatDateTime(dateArtikel)}
            </span>
          </div>
          <img
            className="img-fluid bsb-scale bsb-hover-scale-up rounded-top"
            loading="lazy"
            src={imageArtikel}
            alt={titleArtikel}
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
        </div>
      </div>
    </article>
  );
};
