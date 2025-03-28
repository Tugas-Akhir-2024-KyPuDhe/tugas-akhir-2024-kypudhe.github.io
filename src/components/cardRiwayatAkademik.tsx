import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { StudentHistory } from "../interface/studentHistory.interface";
import { AttendanceMonth } from "../interface/studentAttendance.interface";
import StudentAttendanceService from "../services/studentAttendanceService";
import { CardAbsensiStudent } from "./cardAbsensiStudent";

interface GradeProps {
  nis: string;
  data: StudentHistory[];
}

export const CardRiwayatAkademik: React.FC<GradeProps> = ({ nis, data }) => {
  const [selectedClass, setSelectedClass] = useState<StudentHistory>();
  const [dataAttendance, setDataAttendance] = useState<AttendanceMonth[]>([]);

  const studentAttendanceService = StudentAttendanceService();

  const getStudentDetailAttendance = async (classId: number) => {
    try {
      const response =
        await studentAttendanceService.getStudentDetailAttendance(nis, classId);
      setDataAttendance(response.data.attendances);
      console.log("asd", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelected = async (dataClass: StudentHistory) => {
    setSelectedClass(dataClass);
    await getStudentDetailAttendance(parseInt(dataClass.currentClassId));
  };

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
        <div className="accordion" id="accordionHistoryAkademik">
          <ul className="list-group">
            {data.map((dataClass, index) => (
              <>
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-start py-3 mb-3 bg-light border-0"
                >
                  <div className="ms-2 me-auto m-auto">
                    <div className="fw-medium">
                      {dataClass.currentClass.name}
                    </div>
                  </div>
                  <span className="">
                    <button
                      className="btn border-blue text-blue btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#modalDetailGrades"
                      onClick={() => handleSelected(dataClass)}
                    >
                      <FaEye className="me-2 fs-5" /> Detail
                    </button>

                    <ModalDetail
                      dataClass={selectedClass! && selectedClass!}
                      dataAttendance={dataAttendance! && dataAttendance}
                    />
                  </span>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

interface ModalProps {
  dataClass: StudentHistory;
  dataAttendance: AttendanceMonth[];
}

const subMenuItemsHistory = [
  { label: "Nilai Siswa", key: "nilai" },
  { label: "Absensi", key: "absensi" },
];

export const ModalDetail: React.FC<ModalProps> = ({
  dataClass,
  dataAttendance,
}) => {
  const [selectedDescription, setSelectedDescription] = useState("");

  const [activeMenu, setActiveMenu] = useState(subMenuItemsHistory[0]?.key);
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };
  return (
    <>
      <div
        className="modal fade modal-xl p-0"
        id="modalDetailGrades"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content position-relative">
            <div className="row mx-0">
              <div className="col p-2 text-start pt-3 px-3">
                <div className="fw-bold position-relative pb-2 fs-5">
                  Riwayat Detail Siswa
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
              <div className="col-auto p-2 text-start pb-3 px-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body m-lg-4 m-md-4 my-4 rounded">
              <div className="row g-3">
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-3 col-md-2 fw-medium">Tahun Ajaran</div>
                    <div className="col-auto">:</div>
                    <div className="col fw-medium">
                      {dataClass && dataClass.currentClass.academicYear}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-3 col-md-2 fw-medium">Kelas</div>
                    <div className="col-auto">:</div>
                    <div className="col fw-medium">
                      {dataClass && dataClass.currentClass.name}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-3 col-md-2 fw-medium">
                      Guru Wali Kelas
                    </div>
                    <div className="col-auto">:</div>
                    <div className="col fw-medium">
                      {dataClass && dataClass.currentClass.homeRoomTeacher.name}
                    </div>
                  </div>
                </div>
                <NavSubMenu
                  menuItems={subMenuItemsHistory}
                  activeMenu={activeMenu}
                  onMenuClick={handleMenuClick}
                />
                {activeMenu === "nilai" ? (
                  <div className="col-12">
                    <div className="table-responsive">
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th
                              className="py-3 bg-blue text-light text-center"
                              scope="col"
                              style={{ width: "50px", fontSize: "0.9rem" }}
                            >
                              No
                            </th>
                            <th
                              className="border-start py-3 bg-blue text-light"
                              scope="col"
                              style={{ fontSize: "0.9rem" }}
                            >
                              Mata Pelajaran
                            </th>
                            <th
                              className="border-start py-3 bg-blue text-light"
                              scope="col"
                              style={{ fontSize: "0.9rem" }}
                            >
                              Guru Pengajar
                            </th>
                            <th
                              className="border-start text-center py-3 bg-blue text-light"
                              scope="col"
                              style={{ width: "70px", fontSize: "0.9rem" }}
                            >
                              Tugas
                            </th>
                            <th
                              className="border-start text-center py-3 bg-blue text-light text-center"
                              scope="col"
                              style={{ width: "70px", fontSize: "0.9rem" }}
                            >
                              UH
                            </th>
                            <th
                              className="border-start text-center py-3 bg-blue text-light text-center"
                              scope="col"
                              style={{ width: "70px", fontSize: "0.9rem" }}
                            >
                              PTS
                            </th>
                            <th
                              className="border-start text-center py-3 bg-blue text-light text-center"
                              scope="col"
                              style={{ width: "70px", fontSize: "0.9rem" }}
                            >
                              PAS
                            </th>
                            <th
                              className="border-start text-center py-3 bg-blue text-light text-center"
                              scope="col"
                              style={{ width: "70px", fontSize: "0.9rem" }}
                            >
                              Portofolio
                            </th>
                            <th
                              className="border-start text-center py-3 bg-blue text-light text-center"
                              scope="col"
                              style={{ width: "70px", fontSize: "0.9rem" }}
                            >
                              Proyek
                            </th>
                            <th
                              className="border-start py-3 bg-blue text-light text-center"
                              scope="col"
                              style={{ fontSize: "0.9rem" }}
                            >
                              KET
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(dataClass &&
                            dataClass.currentClass.CourseInClass?.filter(
                              (mapel, index, self) =>
                                index ===
                                self.findIndex(
                                  (m) =>
                                    m.courseDetail.name ===
                                    mapel.courseDetail.name
                                )
                            ).map((mapel, index) => (
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
                                    ? mapel.courseDetail.StudentsGrades![0]
                                        .task || "-"
                                    : "-"}
                                </td>
                                <td className="py-3 text-center">
                                  {mapel.courseDetail.StudentsGrades![0]
                                    ? mapel.courseDetail.StudentsGrades![0]
                                        .UH || "-"
                                    : "-"}
                                </td>
                                <td className="py-3 text-center">
                                  {mapel.courseDetail.StudentsGrades![0]
                                    ? mapel.courseDetail.StudentsGrades![0]
                                        .PTS || "-"
                                    : "-"}
                                </td>
                                <td className="py-3 text-center">
                                  {mapel.courseDetail.StudentsGrades![0]
                                    ? mapel.courseDetail.StudentsGrades![0]
                                        .PAS || "-"
                                    : "-"}
                                </td>
                                <td className="py-3 text-center">
                                  {mapel.courseDetail.StudentsGrades![0]
                                    ? mapel.courseDetail.StudentsGrades![0]
                                        .portofolio || "-"
                                    : "-"}
                                </td>
                                <td className="py-3 text-center">
                                  {mapel.courseDetail.StudentsGrades![0]
                                    ? mapel.courseDetail.StudentsGrades![0]
                                        .proyek || "-"
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
                                          ? mapel.courseDetail
                                              .StudentsGrades![0].description ||
                                              "-"
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
                ) : (
                  <CardAbsensiStudent data={dataAttendance} />
                )}
              </div>
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

interface MenuItem {
  label: string;
  key: string;
}

interface NavMenuProps {
  menuItems: MenuItem[];
  activeMenu: string;
  onMenuClick: (key: string) => void;
}

export const NavSubMenu: React.FC<NavMenuProps> = ({
  menuItems,
  activeMenu,
  onMenuClick,
}) => {
  return (
    <div className="my-4 rounded">
      <ul
        className="nav nav-underline"
        style={{ borderBottom: "0.5px solid grey" }}
      >
        {menuItems.map((item) => (
          <li className="nav-item" style={{ cursor: "pointer" }} key={item.key}>
            <a
              className={`nav-link ${
                activeMenu === item.key ? "active text-blue" : "text-dark"
              }`}
              onClick={() => onMenuClick(item.key)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
