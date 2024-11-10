import React from "react";
import useCookie from "react-use-cookie";
export const CardInformasi2: React.FC = () => {
    const [cookieLogin] = useCookie("userLoginCookie", "");
    const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  return (
    <>
      {userLoginCookie.role === "TEACHER" && (
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
              Kelas yang Diajarkan
            </div>
            <hr />
            <table className="table text-center">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="bg-light"
                    style={{ width: "120px" }}
                  >
                    Kelas
                  </th>
                  <th scope="col" style={{ width: "100px" }}>
                    Hari
                  </th>
                  <th scope="col" style={{ width: "300px" }}>
                    Mapel
                  </th>
                  <th scope="col" style={{ width: "110px" }}>
                    Jam
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-light">X-RPL-1</td>
                  <td>Senin</td>
                  <td>Pemrograman Komputer</td>
                  <td>09:00 - 10:00</td>
                </tr>
                <tr>
                  <td className="bg-light">X-RPL-2</td>
                  <td>Senin</td>
                  <td>Komputer dan Jaringan</td>
                  <td>10:00 - 11:00</td>
                </tr>
                <tr>
                  <td className="bg-light">X-RPL-2</td>
                  <td>Selasa</td>
                  <td>Pemrograman Komputer</td>
                  <td>09:00 - 10:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {userLoginCookie.role === "STUDENT" && (
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
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
