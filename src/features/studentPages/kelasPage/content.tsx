import React, { useState } from "react";

interface Kelas {
  nama: string,
  wali_kelas: string,
  active: boolean,
}

export const Content: React.FC = () => {
  const [data] = useState<Kelas[]>([
    {
      "nama" : "X TKJ 1",
      "wali_kelas" : "Rizky Fadillah",
      "active" : false,
    },
    {
      "nama" : "XI TKJ 1",
      "wali_kelas" : "Putra Siahaan",
      "active" : false
    },
    {
      "nama" : "XII TKJ 1",
      "wali_kelas" : "Dhea Marpaung",
      "active" : true
    },
  ]);


  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff", position: "relative" }}
    >
      <div className="row">
        {data.map(dt=>(
          <div className="col-12 col-lg-4 col-md-3 mb-3" key={dt.nama}>
            <div className="card card-body">
              <span className={`badge mb-2 ${dt.active ? "text-bg-success" : "text-bg-primary"}`} style={{maxWidth: 'fit-content'}}>{dt.active ? 'Aktif' : 'Lulus'}</span>
              <h4>{dt.nama}</h4>
              <h6>Wali Kelas : {dt.wali_kelas}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
