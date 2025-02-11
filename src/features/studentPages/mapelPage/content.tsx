import React, { useEffect, useState } from "react";
import Select from "react-select";
import useCookie from "react-use-cookie";
import StudentHistoryService from "../../../services/studentHistoryService";
import { badgeStatusHistory, decodeToken } from "../../../utils/myFunctions";
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
  const [summary, setSummary] = useState({
    waliKelas: "",
    kelas: "",
    status: "",
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

  useEffect(() => {
    const selectedClass = data.find(
      (dt) => dt.currentClass.name === selectedOption.value
    );

    if (selectedClass) {
      setSummary({
        waliKelas:
          selectedClass.currentClass.homeRoomTeacher?.name || "Tidak Ada",
        kelas: selectedClass.currentClass.name || "Tidak Ada",
        status: selectedClass.status,
      });
    }
  }, [selectedOption, data]);

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
    <>
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{
          backgroundColor: "#fff",
          position: "relative",
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
        <div className="row mb-3 g-3">
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
          <div className="col-12">
            <div className="row mb-3">
              <div className="col-2 fw-medium">Wali Kelas</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{summary.waliKelas}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Kelas</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{summary.kelas}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Status </div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">
                <span
                  className={`badge mb-2 ${badgeStatusHistory(summary.status)}`}
                  style={{ maxWidth: "fit-content" }}
                >
                  {summary.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{
          backgroundColor: "#fff",
          position: "relative",
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
        <div className="row mb-3 g-3">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Jadwal Mata Pelajaran
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  height: "3px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th
                      className="py-3 bg-blue border-start text-light text-center"
                      scope="col"
                      style={{ width: "50px", fontSize: "0.9rem" }}
                    >
                      No
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light"
                      scope="col"
                      style={{ width: "280px", fontSize: "0.9rem" }}
                    >
                      Mata Pelajaran
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Guru Pengajar
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light text-center"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Hari
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light text-center"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Jam Mulai
                    </th>
                    <th
                      className="py-3 bg-blue border-start text-light text-center"
                      scope="col"
                      style={{ fontSize: "0.9rem" }}
                    >
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
                      <td className="py-3 text-center">{mapel.day}</td>
                      <td
                        className="py-3 text-center"
                        style={{ width: "140px" }}
                      >
                        {mapel.timeStart}
                      </td>
                      <td
                        className="py-3 text-center"
                        style={{ width: "140px" }}
                      >
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
      </div>
    </>
  );
};
