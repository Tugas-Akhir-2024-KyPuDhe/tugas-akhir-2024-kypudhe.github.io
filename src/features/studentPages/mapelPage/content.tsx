import React, { useEffect, useState } from "react";
import Select from "react-select";
import useCookie from "react-use-cookie";
import StudentHistoryService from "../../../services/studentHistoryService";
import { decodeToken } from "../../../utils/myFunctions";
import { StudentHistory } from "../../../interface/studentHistory.interface";

export const Content: React.FC = () => {
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const studentHistory = StudentHistoryService();
  const dtoken = decodeToken(userLoginCookie.token);

  const [data, setData] = useState<StudentHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });

  const getData = async () => {
    try {
      setLoading(true);
      const response = await studentHistory.getStudentHistory(
        dtoken.student_id
      );
      setData(response.data);
      const activeClass = response.data.find((item) => item.status === "Aktif");
      if (activeClass) {
        setSelectedOption({
          label: activeClass.currentClass.name,
          value: activeClass.currentClass.name,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  };

  const filteredCourses = data.find(
    (dt) => dt.currentClass.name === selectedOption.value
  )?.currentClass.CourseInClass;

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{
        backgroundColor: "#fff",
        position: "relative",
        minHeight: "70vh",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
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
      <div className="row mb-3">
        <div className="col-12 col-lg-4 col-md-3">
          <Select
            options={data.map((dt) => ({
              value: dt.currentClass.name,
              label: dt.currentClass.name,
            }))}
            onChange={handleSelectChange}
            value={selectedOption}
            isSearchable={false}
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
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th
                  className="py-3 bg-blue text-light text-center"
                  scope="col"
                  style={{ width: "50px" }}
                >
                  No
                </th>
                <th className="py-3 bg-blue text-light" scope="col">
                  Mata Pelajaran
                </th>
                <th className="py-3 bg-blue text-light" scope="col">
                  Guru Pengajar
                </th>
                <th className="py-3 bg-blue text-light text-center" scope="col">
                  Jam Mulai
                </th>
                <th className="py-3 bg-blue text-light text-center" scope="col">
                  Jam Selesai
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses?.map((mapel, index) => (
                <tr key={index}>
                  <td className="py-3 text-center" scope="row">
                    {index + 1}
                  </td>
                  <td className="py-3">{mapel.courseDetail.name}</td>
                  <td className="py-3">{mapel.teacher.name}</td>
                  <td className="py-3 text-center" style={{ width: "140px" }}>
                    {mapel.timeStart}
                  </td>
                  <td className="py-3 text-center" style={{ width: "140px" }}>
                    {mapel.timeEnd}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={5} className="py-3 text-center">
                    Tidak ada data mata pelajaran untuk kelas ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
