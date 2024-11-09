export const ProfilePage = () => {
  return (
    <>
      <div className="row g-0">
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
              Muhammad Syahputra
            </div>
            <div className="">
              <label className="fw-bold text-dark-soft">Email</label>
              <div>putramhmmd22@gmail.com</div>
            </div>
            <hr />
            <div className="">
              <label className="fw-bold text-dark-soft">No.Telp</label>
              <div>08887599774</div>
            </div>
            <hr />
            <div className="">
              <label className="fw-bold text-dark-soft">Alamat</label>
              <div>
                Jalan Abd Sani Muthalib Gg Ikhlas Kec.Medan Marelan Kel.Terjun
              </div>
            </div>
            <hr />
            <div className="position-relative">
              <label className="fw-bold text-dark-soft">Jenis Kelamin</label>
              <div>Laki-laki</div>
            </div>
            <hr />
            <div className="">
              <label className="fw-bold text-dark-soft">Tanggal Lahir</label>
              <div>22 Januari 2003</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-7 col-md-7">
          <div className="row">
            <div className="col-12">
              <div
                className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 mb-lg-0 mb-md-0 rounded"
                style={{ backgroundColor: "#fff" }}
              >
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
                  Kelas Saya
                </div>
                <div className="mb-3">
                  <div className="row d-flex justify-content-between">
                    <div className="col-7 col-lg-9">
                      <label className="fw-bold text-dark-soft">Kelas</label>
                      <div>XII-RPL-1</div>
                    </div>
                    <div className="col-5 col-lg-3 m-auto">
                      <button className="btn btn-primary border-0 bg-blue text-light btn-sm rounded-5 w-100">
                        Lihat
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="fw-bold text-dark-soft">Wali Kelas</label>
                  <div>Sri Mulyani</div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div
                className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
                style={{ backgroundColor: "#fff" }}
              >
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
                  Nilai-nilai Saya
                </div>
                <hr />
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col" className="bg-light">
                        Kelas
                      </th>
                      <th scope="col">Tugas</th>
                      <th scope="col">UTS</th>
                      <th scope="col">UAS</th>
                      <th scope="col">Nilai Huruf</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg-light">X</td>
                      <td>87</td>
                      <td>90</td>
                      <td>89</td>
                      <td>A</td>
                    </tr>
                    <tr>
                      <td className="bg-light">XI</td>
                      <td>90</td>
                      <td>85</td>
                      <td>95</td>
                      <td>A</td>
                    </tr>
                    <tr>
                      <td className="bg-light">XI</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
