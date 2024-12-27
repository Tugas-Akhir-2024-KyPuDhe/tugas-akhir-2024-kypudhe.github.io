import React, { useEffect, useState } from "react";
import StaffService from "../../services/staffService";
import { CourseInClass } from "../../interface/courseInClass.interface";
import useCookie from "react-use-cookie";
import { decodeToken } from "../../utils/myFunctions";

export const CardClassTeacher: React.FC = () => {
  const teacherService = StaffService();
  const [data, setData] = useState<CourseInClass[]>([]);
  const [searchTerm] = useState<string>("");
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const getData = async () => {
    const dtoken = decodeToken(userLoginCookie.token);
    try {
      const response = await teacherService.getClassOfTeacher(dtoken.username);
      setData(response.data.CourseInClass);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = data?.filter((dt) =>
    dt.courseDetail.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

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
        Jadwal Mengajar
      </div>
      <hr />
      <div className="table-responsive">
        <div className="table-responsive">
          <table className="table text-center">
            <thead>
              <tr>
                <th
                  className="border-start py-3 bg-blue text-light"
                  scope="col"
                  style={{ fontSize: "0.9rem", width: '80px' }}
                >
                  Kelas
                </th>
                <th
                  className="border-start py-3 bg-blue text-light"
                  scope="col"
                  style={{ fontSize: "0.9rem", width: '80px' }}
                >
                  Hari
                </th>
                <th
                  className="border-start text-center py-3 bg-blue text-light"
                  scope="col"
                  style={{ fontSize: "0.9rem" }}
                >
                  Mata Pelajaran
                </th>
                <th
                  className="border-start text-center py-3 bg-blue text-light text-center"
                  scope="col"
                  style={{ width: "130px", fontSize: "0.9rem" }}
                >
                  Jam
                </th>
              </tr>
            </thead>
            <tbody>
              {(filteredData &&
                filteredData.map((data, index) => (
                  <tr key={index}>
                    <td className="py-3 text-center" scope="row">
                      {data.class.name}
                    </td>
                    <td className="py-3 text-center">{data.day}</td>
                    <td className="py-3 text-start">
                      {data.courseDetail.name}
                    </td>
                    <td className="py-3 text-center">
                      {data.timeStart} - {data.timeEnd}
                    </td>
                  </tr>
                ))) || (
                <tr>
                  <td colSpan={10} className="py-3 text-center">
                    Tidak ada jadwal mengajar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
