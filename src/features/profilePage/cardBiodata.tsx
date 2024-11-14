import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { UpdatedBiodata } from "../../interface/auth.interface";

interface Biodata {
  handleUpdateAccess: () => void;
  onSaveUpdate: (data: UpdatedBiodata) => void;
  onSavePhotoUpdate: (id: number, photoFile: File) => void;
  statusUpdateData: boolean;
  loadingUpdateData: boolean;
  photo: string;
  id: number;
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
  onSavePhotoUpdate,
  statusUpdateData,
  loadingUpdateData,
  photo,
  name,
  id,
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

  const [tempPhoto, setTempPhoto] = useState(photo);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setTempPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    if (photoFile) {
      onSavePhotoUpdate(id, photoFile);
    }
  };

  const handlePenClick = () => {
    document.getElementById("fileInput")?.click();
  };

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
        {loadingUpdateData && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
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
            onClick={handlePenClick}
          >
            <FaPen />
          </div>
          <div className="d-flex align-items-start">
            <img
              src={tempPhoto}
              alt=""
              className="img-fluid rounded mb-3 pt-0"
              style={{ width: "100%", height: "410px", objectFit: "contain" }}
            />
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {photoFile && (
            <div className="text-end">
              <button
                className="btn btn-warning text-light mb-3"
                onClick={handleSavePhoto}
                disabled={loadingUpdateData}
              >
                {loadingUpdateData ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Simpan Foto"
                )}
              </button>
            </div>
          )}
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
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
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
