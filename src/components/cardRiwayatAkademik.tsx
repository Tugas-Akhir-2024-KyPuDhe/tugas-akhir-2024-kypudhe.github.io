import React, { useState } from "react";
import {
  StudentsGrades,
  StudentsGradesByClass,
} from "../interface/studentGrade.interface";
import { FaEye } from "react-icons/fa6";

interface GradeProps {
  data: StudentsGradesByClass[];
}

export const CardRiwayatAkademik: React.FC<GradeProps> = ({ data }) => {
  const [selectedGrades, setSelectedGrades] = useState<StudentsGrades[]>([]);
  const [selectedClass, setSelectedClass] = useState<StudentsGradesByClass>();

  const handleSelected = (
    dataClass: StudentsGradesByClass,
    dataGrades: StudentsGrades[]
  ) => {
    setSelectedClass(dataClass);
    setSelectedGrades(dataGrades);
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
                    <div className="fw-medium">{dataClass.name}</div>
                  </div>
                  <span className="">
                    <button
                      className="btn border-blue text-blue btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#modalDetailGrades"
                      onClick={() =>
                        handleSelected(dataClass, dataClass.studentsGrades)
                      }
                    >
                      <FaEye className="me-2 fs-5" /> Detail
                    </button>

                    <ModalDetail
                      dataGrades={selectedGrades && selectedGrades}
                      dataClass={selectedClass! && selectedClass!}
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
  dataGrades: StudentsGrades[];
  dataClass: StudentsGradesByClass;
}

export const ModalDetail: React.FC<ModalProps> = ({
  dataGrades,
  dataClass,
}) => {
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
            <div className="row mx-0 pb-4">
              <div className="col p-2 text-start py-3 px-3">
                <div className="fw-bold position-relative pb-2 fs-5">
                  Detail Nilai Siswa
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
              <div className="col-auto p-2 text-start py-3 px-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body pb-4 px-4">
              <div className="row g-3">
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-3 col-md-2 fw-medium">Tahun Ajaran</div>
                    <div className="col-auto">:</div>
                    <div className="col-9 col-md-9 fw-medium">
                      {dataClass && dataClass.academicYear}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-3 col-md-2 fw-medium">Kelas</div>
                    <div className="col-auto">:</div>
                    <div className="col-9 col-md-9 fw-medium">
                      {dataClass && dataClass.name}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-3 col-md-2 fw-medium">
                      Guru Wali Kelas
                    </div>
                    <div className="col-auto">:</div>
                    <div className="col-9 col-md-9 fw-medium">
                      {dataClass && dataClass.teacher.name}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table text-center">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="bg-light"
                            style={{ width: "60px" }}
                          >
                            Mata Pelajaran
                          </th>
                          <th scope="col" style={{ width: "20px" }}>
                            Tugas
                          </th>
                          <th scope="col" style={{ width: "20px" }}>
                            UH
                          </th>
                          <th scope="col" style={{ width: "20px" }}>
                            PTS
                          </th>
                          <th scope="col" style={{ width: "20px" }}>
                            PAS
                          </th>
                          <th scope="col" style={{ width: "20px" }}>
                            Portofolio
                          </th>
                          <th scope="col" style={{ width: "20px" }}>
                            Proyek
                          </th>
                          <th scope="col" style={{ width: "20px" }}>
                            KET
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataGrades &&
                          dataGrades.map((dataGrade, index) => (
                            <tr key={index}>
                              <td className="bg-light text-start">
                                {dataGrade.course.name}
                              </td>
                              <td>{dataGrade.task}</td>
                              <td>{dataGrade.UH}</td>
                              <td>{dataGrade.PTS}</td>
                              <td>{dataGrade.PAS}</td>
                              <td>{dataGrade.portofolio}</td>
                              <td>{dataGrade.proyek}</td>
                              <td>{dataGrade.description}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
