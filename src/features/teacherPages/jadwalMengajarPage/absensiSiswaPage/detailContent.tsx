import React, { useEffect, useState } from "react";

interface Absensi {
  name: string,
  mata_pelajaran: string,
  hari: string,
  siswa: Siswa[],
  createdAt: string
}

interface Siswa {
  name: string,
  NIS: string,
  NISN: string,
}

export const DetailContent: React.FC = () => {
  const [data, setData] = useState<Absensi>();
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const getData = async () => {
    setLoading(true)
    try {
      // const response = await jurusanService.all();
      // setData(response.data);

      setData({
        name: 'X TKJ 1',
        mata_pelajaran: 'Matematika',
        hari: 'Senin',
        createdAt: new Date().toString(),
        siswa: [
          {
            name: 'Testing',
            NIS: '1234',
            NISN: '213124',
          },
          {
            name: 'Testing 2',
            NIS: '1234',
            NISN: '2131241',
          },
          {
            name: 'Testing 3',
            NIS: '1234',
            NISN: '2131245',
          }
        ]
      })
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false)
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDateChange = (value : string) => {
    console.log(value)
  };

  // function getDay(num: number) {
  //   const d = new Date();
  //   const day = d.getDay(),
  //     diff = d.getDate() - day + num;

  //   const result = new Date(d.setDate(diff)).toString();
  //   console.log(result)
  //   return result;
  // }

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff", position: "relative" }}
    >
      {/* Show the loader overlay when loading */}
      {loading && (
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

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-4 col-md-3">
          <h6>Nama Kelas: <b>{data?.name}</b></h6>
          <h6>Mata Pelajaran: <b>{data?.mata_pelajaran}</b></h6>
          <h6>Hari: <b>{data?.hari}</b></h6>
        </div>
        <div className="col-12 col-lg-4 col-md-3 gap-3 d-flex flex-column align-items-start">
          <label className="d-none d-lg-block">Pilih Tanggal</label>
          <input type="date" className="form-control" onChange={(e) => handleDateChange(e.target.value)}/>
          <button className="btn btn-info">Simpan</button>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-12 table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Hadir</th>
                <th>Izin</th>
                <th>Sakit</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              {
                data?.siswa.map((siswa,index)=>(
                  <tr key={siswa.NISN}>
                    <td>{siswa.name}</td>
                    <td><input type="radio" name={`absensi[${index}]`} /></td>
                    <td><input type="radio" name={`absensi[${index}]`} /></td>
                    <td><input type="radio" name={`absensi[${index}]`} /></td>
                    <td><input type="text" name={`note[${index}]`}className="form-control form-control-sm" placeholder="Catatan.." /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
