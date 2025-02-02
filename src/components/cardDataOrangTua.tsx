import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { FormParentOfStudent } from "../interface/student.interface";

interface DataState {
  handleUpdateAccess?: () => void;
  onSaveUpdate?: (nis: number, data: FormParentOfStudent) => void;
  statusUpdateData?: boolean;
  loadingUpdateData?: boolean;
  nis: string;
  fatherName: string;
  motherName: string;
  phone: string;
  parentJob: string;
  parentAddress: string;
}

export const CardDataOrangTua: React.FC<DataState> = ({
  handleUpdateAccess,
  onSaveUpdate,
  statusUpdateData,
  loadingUpdateData,
  nis,
  fatherName,
  motherName,
  phone,
  parentJob,
  parentAddress,
}) => {
  const [initialData] = useState<FormParentOfStudent>({
    fatherName: fatherName !== "-" ? fatherName : "",
    motherName: motherName !== "-" ? motherName : "",
    parentJob: parentJob !== "-" ? parentJob : "",
    parentAddress: parentAddress !== "-" ? parentAddress : "",
    phone: phone !== "-" ? phone : "",
  });

  const [updatedData, setUpdatedData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelUpdate = () => {
    setUpdatedData(initialData);
    if (handleUpdateAccess) handleUpdateAccess();
  };

  return (
    <>
      <div className="fw-bold fs-5 mb-4 text-dark-soft position-relative pb-2">
        <div className="d-flex justify-content-between">
          <div className="">Data Orang Tua</div>
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
          {handleUpdateAccess && (
            <div className="">
              {!statusUpdateData && (
                <div style={{ cursor: "pointer" }} onClick={handleUpdateAccess}>
                  <FaPen />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {loadingUpdateData && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 20,
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
      <div className="">
        <div className="mb-3">
          <label className="fw-bold">Nama Ayah</label>
          <div className="fw-medium">
            {statusUpdateData ? (
              <input
                name="fatherName"
                value={updatedData.fatherName}
                onChange={handleChange}
                className="form-control mt-2"
              />
            ) : (
              <div>{fatherName || "-"}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Nama Ibu</label>
          <div className="fw-medium">
            {statusUpdateData ? (
              <input
                name="motherName"
                value={updatedData.motherName}
                onChange={handleChange}
                className="form-control mt-2"
              />
            ) : (
              <div>{motherName || "-"}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Nomor Handphone Orang Tua</label>
          <div className="fw-medium">
            {statusUpdateData ? (
              <input
                name="phone"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                  if (event.key === ' ') {
                    event.preventDefault(); 
                  }
                }}
                value={updatedData.phone}
                onChange={handleChange}
                className="form-control mt-2"
              />
            ) : (
              <div>{phone || "-"}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Alamat Orang Tua</label>
          <div className="fw-medium">
            {statusUpdateData ? (
              <input
                name="parentAddress"
                value={updatedData.parentAddress}
                onChange={handleChange}
                className="form-control mt-2"
              />
            ) : (
              <div>{parentAddress || "-"}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="fw-bold">Pekerjaan Orang Tua</label>
          <div className="fw-medium">
            {statusUpdateData ? (
              <input
                name="parentJob"
                value={updatedData.parentJob}
                onChange={handleChange}
                className="form-control mt-2"
              />
            ) : (
              <div>{parentJob || "-"}</div>
            )}
          </div>
        </div>
        {statusUpdateData && (
          <div className="mt-3 text-end">
            <button
              className="btn btn-danger me-3 text-light"
              onClick={handleCancelUpdate}
            >
              Batal
            </button>
            <button
              className="btn btn-warning text-light"
              onClick={() => onSaveUpdate && onSaveUpdate(nis, updatedData)}
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
    </>
  );
};
