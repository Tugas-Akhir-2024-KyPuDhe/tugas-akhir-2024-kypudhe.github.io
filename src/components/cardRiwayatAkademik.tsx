import React from "react";

export const CardRiwayatAkademik: React.FC = () => {
  return (
    <>
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
        Riwayat Akademik
      </div>
      <div className="">
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col" className="bg-light" style={{ width: "60px" }}>
                Kelas
              </th>
              <th scope="col" style={{ width: "20px" }}>
                Tugas
              </th>
              <th scope="col" style={{ width: "20px" }}>
                UTS
              </th>
              <th scope="col" style={{ width: "20px" }}>
                UAS
              </th>
              <th scope="col" style={{ width: "20px" }}>
                Nilai Huruf
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-light">X-RPL-1</td>
              <td>86</td>
              <td>89</td>
              <td>90</td>
              <td>A</td>
            </tr>
            <tr>
              <td className="bg-light">XII-RPL-1</td>
              <td>90</td>
              <td>70</td>
              <td>69</td>
              <td>B</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
