import React from "react";

export const CardClassTeacher: React.FC = () => {
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
        Kelas yang Diajarkan
      </div>
      <hr />
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-light" style={{ width: "120px" }}>
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
    </>
  );
};
