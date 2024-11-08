import React, { useState } from "react";
import Select from "react-select";


const optionKelas = [
  { value: "X TKJ 1", label: "X TKJ 1" },
  { value: "XI TKJ 1", label: "XI TKJ 1" },
];

interface MataPelajaran {
  nama: string,
  hari: string,
  jam_mulai: string,
  jam_selesai: string,
  guru: string,
}

export const Content: React.FC = () => {
  const [data] = useState<MataPelajaran[]>([
    {
      "nama" : "Matematika",
      "hari" : "Senin",
      "jam_mulai" : "10:00",
      "jam_selesai" : "12:00",
      "guru" : "Rizky Fadillah",
    },
    {
      "nama" : "Bahasa",
      "hari" : "Selasa",
      "jam_mulai" : "10:00",
      "jam_selesai" : "12:00",
      "guru" : "Putra Fadillah",
    },
    {
      "nama" : "Teknik",
      "hari" : "Rabu",
      "jam_mulai" : "10:00",
      "jam_selesai" : "12:00",
      "guru" : "John Doe",
    },
  ]);

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    console.log(name, selectedOption)
  };

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff", position: "relative" }}
    >
      <div className="row">
        <div className="col-12 col-lg-4 col-md-3">
          <Select
            options={optionKelas}
            onChange={(option) => handleSelectChange("kelas", option)}
            placeholder="Pilih Kelas"
            className="form-control-lg px-0 pt-0"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                fontSize: "0.955rem",
                minHeight: "48px",
                borderRadius: "8px",
              }),
              option: (provided) => ({
                ...provided,
                fontSize: "1rem",
              }),
            }}
          />
        </div>
      </div>
      <div className="row">
        {data.map(dt=>(
          <div className="col-12 col-lg-4 col-md-3" key={dt.nama}>
            <div className="card card-body">
              <span className={`badge mb-2 text-bg-info`} style={{maxWidth: 'fit-content'}}>{dt.hari}</span>
              <h4>{dt.nama}</h4>
              <hr />
              <div className="d-flex gap-3">
                <div>
                  <h6>Jam Mulai</h6>
                  <p>{dt.jam_mulai}</p>
                </div>
                <div>
                  <h6>Jam Selesai</h6>
                  <p>{dt.jam_selesai}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
