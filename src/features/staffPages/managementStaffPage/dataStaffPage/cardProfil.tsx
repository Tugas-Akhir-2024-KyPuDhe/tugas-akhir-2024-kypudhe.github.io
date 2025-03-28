import React from "react";

interface Biodata {
  photo: string;
  id: number;
  name: string;
  nip: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  birthPlace: string;
}
export const CardProfil: React.FC<Biodata> = ({
  id,
  photo,
  name,
  nip,
  email,
  phone,
  address,
  gender,
  birthPlace,
}) => {
  return (
    <>
      <div className="row g-3" key={id}>
        <div className="col-12 col-lg-4 m-auto text-center">
          <img
            src={photo}
            alt=""
            className="img-fluid rounded-circle mb-3"
            style={{ width: "170px" }}
          />
          <div className="fw-bold">{name}</div>
          <div className="fw-medium">{nip}</div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="mb-3">
                <label className="fw-bold">Nama Siswa</label>
                <div className="fw-medium">{name}</div>
              </div>
              <div className="mb-3">
                <label className="fw-bold">NIP</label>
                <div className="fw-medium">{nip}</div>
              </div>
              <div className="mb-3">
                <label className="fw-bold">No.Telp</label>
                <div className="fw-medium">{phone}</div>
              </div>
              <div className="mb-3">
                <label className="fw-bold">Email</label>
                <div className="fw-medium">{email}</div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="mb-3">
                <label className="fw-bold">Tempat Tanggal Lahir</label>
                <div className="fw-medium">{birthPlace}</div>
              </div>
              <div className="mb-3">
                <label className="fw-bold">Jenis Kelamin</label>
                <div className="fw-medium">{gender}</div>
              </div>
              <div className="mb-3">
                <label className="fw-bold">Alamat</label>
                <div className="fw-medium">{address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
