import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";

interface Biodata {
  handleUpdateAccess: () => void;
  onSaveUpdate: (data: UpdatedBiodata) => void;
  statusUpdateData: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  birthPlace: string;
}

interface UpdatedBiodata {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  birthPlace: string;
}

export const CardBiodata: React.FC<Biodata> = ({
  handleUpdateAccess,
  onSaveUpdate,
  statusUpdateData,
  name,
  email,
  phone,
  address,
  gender,
  birthPlace,
}) => {
  const [updatedData, setUpdatedData] = useState<UpdatedBiodata>({
    name: name !== "-" ? name : "",
    email: email !== "-" ? email : "",
    phone: phone !== "-" ? phone : "",
    address: address !== "-" ? address : "",
    gender: gender !== "-" ? gender : "",
    birthPlace: birthPlace !== "-" ? birthPlace : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

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
          <div className="d-flex justify-content-between">
            <div>{name}</div>
            <div style={{ cursor: "pointer" }} onClick={handleUpdateAccess}>
              <FaPen />
            </div>
          </div>
        </div>

        <div>
          <label className="fw-bold text-dark-soft">Email</label>
          {statusUpdateData ? (
            <input
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              className="form-control mt-2"
            />
          ) : (
            <div>{email || "-"}</div>
          )}
        </div>
        <hr />

        <div>
          <label className="fw-bold text-dark-soft">No.Telp</label>
          {statusUpdateData ? (
            <input
              name="phone"
              value={updatedData.phone}
              onChange={handleChange}
              className="form-control mt-2"
            />
          ) : (
            <div>{phone || "-"}</div>
          )}
        </div>
        <hr />

        <div>
          <label className="fw-bold text-dark-soft">Alamat</label>
          {statusUpdateData ? (
            <input
              name="address"
              value={updatedData.address}
              onChange={handleChange}
              className="form-control mt-2"
            />
          ) : (
            <div>{address || "-"}</div>
          )}
        </div>
        <hr />

        <div>
          <label className="fw-bold text-dark-soft">Jenis Kelamin</label>
          {statusUpdateData ? (
            <input
              name="gender"
              value={updatedData.gender}
              onChange={handleChange}
              disabled
              className="form-control mt-2"
            />
          ) : (
            <div>{gender || "-"}</div>
          )}
        </div>
        <hr />

        <div>
          <label className="fw-bold text-dark-soft">Tanggal Lahir</label>
          {statusUpdateData ? (
            <input
              name="birthPlace"
              value={updatedData.birthPlace}
              onChange={handleChange}
              className="form-control mt-2"
            />
          ) : (
            <div>{birthPlace || "-"}</div>
          )}
        </div>

        {statusUpdateData && (
          <div className="mt-3 text-end">
            <button
              className="btn btn-warning text-light"
              onClick={() => onSaveUpdate(updatedData)}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
