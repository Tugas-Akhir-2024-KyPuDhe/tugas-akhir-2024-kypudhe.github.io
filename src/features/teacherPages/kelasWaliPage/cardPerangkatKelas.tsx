import React, { useState } from "react";
import {
  FormStudentPosition,
  IStudentPositionInClass,
} from "../../../interface/studentPosition.interface";
import { FaPlus } from "react-icons/fa6";
import Select from "react-select";
import { optionsRoleStudent } from "../../../utils/optionsData";
import StudentPositionService from "../../../services/studentPositionInClassService";
import { Toast } from "../../../utils/myFunctions";

interface Option {
  value: string;
  label: string;
}

interface CardProps {
  loading: boolean;
  data: IStudentPositionInClass[];
  optionsStudents: Option[];
  refreshData: () => void;
}

export const CardPerangkatKelas: React.FC<CardProps> = ({
  loading,
  data,
  optionsStudents,
  refreshData,
}) => {
  const studentPostionService = StudentPositionService();
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [formData, setformData] = useState<FormStudentPosition>({
    nis: optionsStudents[0].value,
    classId: data[0].classId,
    positionName: optionsRoleStudent[0].value,
  });

  const handleSelectChangePosition = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    setformData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const submitData = async () => {
    setLoadingForm(true);
    try {
      const response = await studentPostionService.createPosition(formData);
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          timer: 5000,
          title: `Perangkat kelas berhasil ditambah`,
        });
        refreshData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingForm(false);
    }
  };

  return (
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
      <div className="row g-3">
        <div className="col-12">
          <div className="fw-bold position-relative pb-2">
            Perangkat Kelas
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
          <button
            type="button"
            className="btn border-blue text-blue"
            data-bs-toggle="modal"
            data-bs-target="#modalAddPosition"
          >
            <FaPlus className="me-2 fs-5" /> Tambah
          </button>
        </div>
        <div className="col-12">
          {data.map((dt) => (
            <div className="row mb-3">
              <div className="col-2 fw-medium">{dt.positionName}</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{dt.student.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* MODAL DETAIL DATA */}
      <div
        className="modal fade modal-lg p-0"
        id="modalAddPosition"
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
                  Tambah Perangkat Kelas
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
                <div className="col-12 col-lg-8">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Pilih Siswa</label>
                    <Select
                      options={optionsStudents}
                      value={optionsStudents.find(
                        (option) => option.value === formData.nis
                      )}
                      onChange={(option) =>
                        handleSelectChangePosition("nis", option)
                      }
                      placeholder="Pilih Jabatan"
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
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Jabatan Kelas</label>
                    <Select
                      options={optionsRoleStudent}
                      value={optionsRoleStudent.find(
                        (option) => option.value === formData.positionName
                      )}
                      onChange={(option) =>
                        handleSelectChangePosition("positionName", option)
                      }
                      placeholder="Pilih Jabatan"
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
                  </div>
                </div>
                <div className="col-12 d-flex">
                  <button
                    className={`btn btn-primary border-0 bg-blue`}
                    type="button"
                    onClick={() => submitData()}
                    disabled={loadingForm}
                  >
                    Tambah
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
