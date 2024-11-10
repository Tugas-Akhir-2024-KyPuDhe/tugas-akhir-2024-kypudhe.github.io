import React from "react";

interface Biodata {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthPlace: string;
}

export const CardBiodata: React.FC<Biodata> = ({
  name,
  email,
  phone,
  address,
  birthPlace,
}) => {
  return (
    <div className="col-12 col-lg-5 col-md-5">
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 me-lg-0 me-md-0 rounded"
        style={{ backgroundColor: "#fff" }}
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt=""
          className="img-fluid rounded mb-3"
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
        />
        <div className="fw-bold fs-5 mb-4 text-dark-soft position-relative pb-2">
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "50px",
              height: "5px",
              backgroundColor: "var(--blue-color)",
            }}
          />
          {name}
        </div>
        <div>
          <label className="fw-bold text-dark-soft">Email</label>
          <div>{email || "-"}</div>
        </div>
        <hr />

        <div>
          <label className="fw-bold text-dark-soft">No.Telp</label>
          <div>{phone || "-"}</div>
        </div>
        <hr />
        <div>
          <label className="fw-bold text-dark-soft">Alamat</label>
          <div>{address || "-"}</div>
        </div>
        <hr />
        <div>
          <label className="fw-bold text-dark-soft">Jenis Kelamin</label>
          <div>{birthPlace || "-"}</div>
        </div>
        <hr />
        <div className="position-relative">
          <label className="fw-bold text-dark-soft">Tanggal Lahir</label>
          <div>{birthPlace || "-"}</div>
        </div>
      </div>
    </div>
  );
};
