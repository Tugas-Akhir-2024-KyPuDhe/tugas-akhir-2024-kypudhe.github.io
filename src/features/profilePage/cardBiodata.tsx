import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { UpdatedBiodata } from "../../interface/auth.interface";

interface Biodata {
  handleUpdateAccess: () => void;
  onSaveUpdate: (data: UpdatedBiodata) => void;
  statusUpdateData: boolean;
  loadingUpdateData: boolean;
  photo: string;
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
  loadingUpdateData,
  photo,
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
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 me-lg-0 me-md-0 rounded position-relative"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="img-profile">
          <div
            className="position-absolute bg-light fw-bold m-4 shadow d-flex align-items-center justify-content-center"
            style={{
              right: "10px",
              top: "10px",
              borderRadius: "100%",
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
            // onClick={handleUpdateAccess}
          >
            <FaPen />
          </div>
          <img
            src={photo}
            alt=""
            className="img-fluid rounded mb-3"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>

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
            {!statusUpdateData && (
              <div style={{ cursor: "pointer" }} onClick={handleUpdateAccess}>
                <FaPen />
              </div>
            )}
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
              className="btn btn-danger me-3 text-light"
              onClick={handleUpdateAccess}
            >
              Batal
            </button>
            <button
              className="btn btn-warning text-light"
              onClick={() => onSaveUpdate(updatedData)}
              disabled={loadingUpdateData}
            >
              {loadingUpdateData ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
