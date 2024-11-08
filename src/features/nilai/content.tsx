import React, { useState } from "react";
import Select from "react-select";


const optionKelas = [
  { value: "X TKJ 1", label: "X TKJ 1" },
  { value: "XI TKJ 1", label: "XI TKJ 1" },
];

interface Nilai {
  mata_pelajaran: string,
  uts: number,
  uas: number,
  tugas: number,
  akhir: string,
}

export const Content: React.FC = () => {
  const [data] = useState<Nilai[]>([
    {
      "mata_pelajaran" : "Matematika",
      "uts" : 90,
      "uas" : 89,
      "tugas" : 85,
      "akhir" : "A",
    },
    {
      "mata_pelajaran" : "Bahasa",
      "uts" : 90,
      "uas" : 89,
      "tugas" : 85,
      "akhir" : "A",
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
          <div className="col-12 col-lg-4 col-md-3" key={dt.mata_pelajaran}>
            <div className="card card-body">
              <div className="d-flex justify-content-between">
                <h4>{dt.mata_pelajaran}</h4>
                <h2 className="bg-info rounded-circle" style={{width:20, height:20}}>{dt.akhir}</h2>
              </div>
              <hr />
              <div className="d-flex gap-3 text-center">
                <div>
                  <h6>UTS</h6>
                  <p>{dt.uts}</p>
                </div>
                <div>
                  <h6>UAS</h6>
                  <p>{dt.uas}</p>
                </div>
                <div>
                  <h6>Tugas</h6>
                  <p>{dt.tugas}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
