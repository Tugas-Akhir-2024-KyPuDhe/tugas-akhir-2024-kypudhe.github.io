import React from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { StyleSheetManager } from "styled-components";
import {
  CourseInClass,
  FormState,
} from "../../../../interface/courseInClass.interface";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { optionsDays } from "../../../../utils/optionsData";

interface Option {
  value: string;
  label: string;
}

interface CardMatkulProps {
  data: CourseInClass[];
  loading: boolean;
  submitCourse: (formCourse: FormState) => void;
  deleteCourse: (id: number) => void;
  loadingFormMapel: boolean;
  optionsCourse: Option[];
  optionsTeachers: Option[];
  formCourse: FormState;
  errorsForms: { [key: string]: string };
  handleSelectChangeMapel: (
    name: string,
    selectedOption: { value: string } | null
  ) => void;
  handleInputChangeMapel: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CardMatkulDetailKelas: React.FC<CardMatkulProps> = ({
  data,
  loading,
  submitCourse,
  deleteCourse,
  loadingFormMapel,
  optionsCourse,
  optionsTeachers,
  formCourse,
  errorsForms,
  handleSelectChangeMapel,
  handleInputChangeMapel,
}) => {
  const navigate = useNavigate();

  const columns = [
    {
      name: "No",
      cell: (_row: CourseInClass, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nama Mapel",
      selector: (row: CourseInClass) => row.courseDetail.name,
      sortable: true,
      cell: (row: CourseInClass) => row.courseDetail.name,
    },
    {
      name: "Guru",
      selector: (row: CourseInClass) => row.teacher.name,
      sortable: true,
      cell: (row: CourseInClass) => row.teacher.name,
    },
    {
      name: "Hari",
      selector: (row: CourseInClass) => row.day,
      sortable: true,
      cell: (row: CourseInClass) => row.day,
      width: "130px",
    },
    {
      name: "Jam Mulai",
      selector: (row: CourseInClass) => row.timeStart,
      sortable: true,
      cell: (row: CourseInClass) => row.timeStart,
      width: "130px",
    },
    {
      name: "Jam Selesai",
      selector: (row: CourseInClass) => row.timeEnd,
      sortable: true,
      cell: (row: CourseInClass) => row.timeEnd,
      width: "130px",
    },
    {
      name: "Action",
      cell: (row: CourseInClass) => (
        <>
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.id}`)}
            disabled={loading}
          >
            <FaPen />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteCourse(row.id)}
            disabled={loading}
          >
            <FaTrash />
          </button>
        </>
      ),
      width: "150px",
    },
  ];

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff", position: "relative" }}
    >
      {loading ||
        (loadingFormMapel && (
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
        ))}

      <form>
        <div className="row">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2 mb-3">
              Mata Pelajaran DiKelas
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
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn border-blue text-blue"
            data-bs-toggle="modal"
            data-bs-target="#modalAddMatkul"
          >
            <FaPlus className="me-2 fs-5" /> Tambah Mapel
          </button>
        </div>
      </form>
      <StyleSheetManager>
        <DataTable
          columns={columns}
          data={data}
          highlightOnHover
          className="mt-3"
          customStyles={{
            rows: {
              style: {
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  color: "#007bff",
                },
              },
            },
            headCells: {
              style: {
                backgroundColor: "var(--blue-color)",
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "center",
                border: "0.1px solid #ddd",
              },
            },
          }}
        />
      </StyleSheetManager>

      {/* MODAL DETAIL DATA */}
      <div
        className="modal fade modal-lg p-0"
        id="modalAddMatkul"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="row mx-0 pb-4">
              <div className="col p-2 text-start py-3 px-3">
                <div className="fw-bold position-relative pb-2 fs-5">
                  Tambah Mata Pelajaran
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
            <div className="modal-body py-0 pb-4">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Mata Pelajaran *</label>
                    <Select
                      options={optionsCourse}
                      value={optionsCourse.find(
                        (option) => option.value === formCourse.courseCode
                      )}
                      onChange={(option) =>
                        handleSelectChangeMapel("courseCode", option)
                      }
                      placeholder="Pilih Mapel yang Ditambah"
                      className="form-control-lg px-0 pt-0"
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          fontSize: "0.955rem",
                          borderRadius: "8px",
                        }),
                        option: (provided) => ({
                          ...provided,
                          fontSize: "1rem",
                        }),
                      }}
                    />
                    {errorsForms.courseCode && (
                      <div className="invalid-form">Mapel Masih kosong!</div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Guru Pengajar *</label>
                    <Select
                      options={optionsTeachers}
                      value={optionsTeachers.find(
                        (option) =>
                          option.value.toString() ===
                          formCourse.teacherId.toString()
                      )}
                      onChange={(option) =>
                        handleSelectChangeMapel("teacherId", option)
                      }
                      placeholder="Pilih Guru Pengajar"
                      className="form-control-lg px-0 pt-0"
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          fontSize: "0.955rem",
                          borderRadius: "8px",
                        }),
                        option: (provided) => ({
                          ...provided,
                          fontSize: "1rem",
                        }),
                      }}
                    />
                    {errorsForms.teacherId && (
                      <div className="invalid-form">Guru Masih kosong!</div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Jadwal Hari *</label>
                    <Select
                      options={optionsDays}
                      value={optionsDays.find(
                        (option) => option.value === formCourse.day
                      )}
                      onChange={(option) =>
                        handleSelectChangeMapel("day", option)
                      }
                      placeholder="Pilih Jadwal Mengajar"
                      className="form-control-lg px-0 pt-0"
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          fontSize: "0.955rem",
                          borderRadius: "8px",
                        }),
                        option: (provided) => ({
                          ...provided,
                          fontSize: "1rem",
                        }),
                      }}
                    />
                    {errorsForms.day && (
                      <div className="invalid-form">
                        Jadwa Hari Masih kosong!
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Jam Mulai *</label>
                    <input
                      type="time"
                      name="timeStart"
                      className={`form-control`}
                      placeholder="Waktu Mulai.."
                      value={formCourse.timeStart}
                      onChange={handleInputChangeMapel}
                    />
                    {errorsForms.timeStart && (
                      <div className="invalid-form">
                        Waktu Mulai Masih kosong!
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Jam Selesai *</label>
                    <input
                      type="time"
                      name="timeEnd"
                      className={`form-control`}
                      placeholder="Waktu Selesai.."
                      value={formCourse.timeEnd}
                      onChange={handleInputChangeMapel}
                    />
                    {errorsForms.timeEnd && (
                      <div className="invalid-form">
                        Waktu Selesai Masih kosong!
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12 d-flex">
                  <button
                    className={`btn btn-primary border-0 bg-blue`}
                    type="button"
                    onClick={() => submitCourse(formCourse)}
                    disabled={loadingFormMapel}
                  >
                    {formCourse.id ? "Update" : "Tambah"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
