import React, { useEffect, useState } from "react";
import Select from "react-select";
import { StudentHistory } from "../../../interface/studentHistory.interface";
import StudentHistoryService from "../../../services/studentHistoryService";
import useCookie from "react-use-cookie";
import { badgeStatusHistory, decodeToken } from "../../../utils/myFunctions";

export const Content: React.FC = () => {
  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  };

  const studentHistory = StudentHistoryService();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const dtoken = decodeToken(userLoginCookie.token);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [summary, setSummary] = useState({
    waliKelas: "",
    kelas: "",
    status: "",
  });
  const [selectedDescription, setSelectedDescription] = useState("");
  const [data, setData] = useState<StudentHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
        style={{ backgroundColor: "#fff", position: "relative" }}
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
              Nilai Siswa
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
              <table className="table text-center">
                <thead>
                  <tr>
                    <th
                      className="py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{
                        width: "50px",
                        fontSize: "0.9rem",
                        verticalAlign: "middle",
                      }}
                    >
                      No
                    </th>
                    <th
                      className="border-start py-3 bg-blue text-light"
                      scope="col"
                      style={{ fontSize: "0.9rem", verticalAlign: "middle" }}
                    >
                      Mata Pelajaran
                    </th>
                    <th
                      className="border-start py-3 bg-blue text-light"
                      scope="col"
                      style={{ fontSize: "0.9rem", verticalAlign: "middle" }}
                    >
                      Guru Pengajar
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light"
                      scope="col"
                      style={{ width: "70px", fontSize: "0.9rem" }}
                    >
                      Nilai Tugas
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ width: "70px", fontSize: "0.9rem" }}
                    >
                      Nilai UH
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ width: "70px", fontSize: "0.9rem" }}
                    >
                      Nilai PTS
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ width: "70px", fontSize: "0.9rem" }}
                    >
                      Nilai PAS
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ width: "70px", fontSize: "0.9rem" }}
                    >
                      Nilai Portofolio
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ width: "70px", fontSize: "0.9rem" }}
                    >
                      Nilai Proyek
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ width: "70px", fontSize: "0.9rem" }}
                    >
                      Nilai Akhir
                    </th>
                    <th
                      className="border-start text-center py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ width: "70px", fontSize: "0.9rem" }}
                    >
                      Nilai Huruf
                    </th>
                    <th
                      className="border-start py-3 bg-blue text-light text-center"
                      scope="col"
                      style={{ fontSize: "0.9rem", verticalAlign: "middle" }}
                    >
                      KET
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredCourses &&
                    filteredCourses?.map((mapel, index) => (
                      <tr key={index}>
                        <td className="py-3 text-center" scope="row">
                          {index + 1}
                        </td>
                        <td className="py-3 text-start">
                          {mapel.courseDetail.name}
                        </td>
                        <td className="py-3 text-start">
                          {mapel.teacher.name}
                        </td>
                        <td className="py-3 text-center">
                          {mapel.courseDetail.StudentsGrades![0]
                            ? mapel.courseDetail.StudentsGrades![0].task || "-"
                            : "-"}
                        </td>
                        <td className="py-3 text-center">
                          {mapel.courseDetail.StudentsGrades![0]
                            ? mapel.courseDetail.StudentsGrades![0].UH || "-"
                            : "-"}
                        </td>
                        <td className="py-3 text-center">
                          {mapel.courseDetail.StudentsGrades![0]
                            ? mapel.courseDetail.StudentsGrades![0].PTS || "-"
                            : "-"}
                        </td>
                        <td className="py-3 text-center">
                          {mapel.courseDetail.StudentsGrades![0]
                            ? mapel.courseDetail.StudentsGrades![0].PAS || "-"
                            : "-"}
                        </td>
                        <td className="py-3 text-center">
                          {mapel.courseDetail.StudentsGrades![0]
                            ? mapel.courseDetail.StudentsGrades![0]
                                .portofolio || "-"
                            : "-"}
                        </td>
                        <td className="py-3 text-center">-</td>
                        <td className="py-3 text-center">-</td>
                        <td className="py-3 text-center">
                          {mapel.courseDetail.StudentsGrades![0]
                            ? mapel.courseDetail.StudentsGrades![0].proyek ||
                              "-"
                            : "-"}
                        </td>
                        <td className="py-3 text-center">
                          <button
                            className="btn btn-link"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDeskripsi"
                            onClick={() =>
                              setSelectedDescription(
                                mapel.courseDetail.StudentsGrades![0]
                                  ? mapel.courseDetail.StudentsGrades![0]
                                      .description || "-"
                                  : "-"
                              )
                            }
                            style={{ fontSize: "0.9rem" }}
                          >
                            Lihat
                          </button>
                        </td>
                      </tr>
                    ))) || (
                    <tr>
                      <td colSpan={10} className="py-3 text-center">
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
      {/* Modal */}
      <div
        className="modal fade"
        id="modalDeskripsi"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Keterangan</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{selectedDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
