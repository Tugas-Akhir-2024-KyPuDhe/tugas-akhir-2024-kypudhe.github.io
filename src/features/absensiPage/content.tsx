import React, { useState } from "react";
import Select from "react-select";


const optionKelas = [
  { value: "X TKJ 1", label: "X TKJ 1" },
  { value: "XI TKJ 1", label: "XI TKJ 1" },
];

interface Absensi {
  tanggal: string,
  status: number
}

interface MataPelajaran {
  nama: string,
  hari: string,
  guru: string,
  absensi: Absensi[]
}

export const Content: React.FC = () => {
  const [data] = useState<MataPelajaran[]>([
    {
      "nama" : "Matematika",
      "hari" : "Senin",
      "guru" : "Rizky Fadillah",
      "absensi": [
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          
          status:0
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          
          status:2
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:2
        },
        {
          tanggal: new Date().toString(),
          status:0
        }
      ]
    },
    {
      "nama" : "Bahasa",
      "hari" : "Selasa",
      "guru" : "Putra Fadillah",
      "absensi": [
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          
          status:0
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          
          status:2
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:2
        },
        {
          tanggal: new Date().toString(),
          status:0
        }
      ]
    },
    {
      "nama" : "Teknik",
      "hari" : "Rabu",
      "guru" : "John Doe",
      "absensi": [
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          
          status:0
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          
          status:2
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:1
        },
        {
          tanggal: new Date().toString(),
          status:2
        },
        {
          tanggal: new Date().toString(),
          status:0
        }
      ]
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
      <div className="row mb-3">
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
          <div className="col-12 col-lg-4 col-md-3 mb-3" key={dt.nama}>
            <div className="card card-body">
              <span className={`badge mb-2 text-bg-info`} style={{maxWidth: 'fit-content'}}>{dt.hari}</span>
              <h4>{dt.nama}</h4>
              <h6>Guru : {dt.guru}</h6>
              <hr />
              <div className="d-flex flex-wrap">
                {dt.absensi.map((absensi, index)=>(
                  <div key={absensi.tanggal+index} title={absensi.tanggal} style={{width:50}} className={"py-1 px-2 text-center border border-light "+(absensi.status == 1 ? "bg-success" : (absensi.status == 2 ? "bg-info" : "bg-danger"))} >{index+1}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
