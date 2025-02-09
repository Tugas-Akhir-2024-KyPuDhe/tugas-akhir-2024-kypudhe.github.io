import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Toast } from "../../../../utils/myFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import JurusanService from "../../../../services/jurusanService";
import { Fajusek } from "../../../../interface/fajusek.interfase";
import { StaffDetails } from "../../../../interface/auth.interface";
import ClassStudentService from "../../../../services/classStudentService";
import { FormState } from "../../../../interface/studentClass.interface";
import { AxiosError } from "axios";
import { optionsGrade } from "../../../../utils/optionsData";
import StaffService from "../../../../services/staffService";
import AcademicYearService from "../../../../services/academicYearService";
import { IAcademicYear } from "../../../../interface/academicYear.interface";

export const FormDataKelasMangementSiswaPage: React.FC = () => {
  const navigate = useNavigate();
  const majorService = JurusanService();
  const staffService = StaffService();
  const classService = ClassStudentService();
  const academicYearService = AcademicYearService();

  const { id } = useParams<{ id: string }>();
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(true);
  const [dataMajor, setDataMajor] = useState<Fajusek[]>([]);
  const [dataTeachers, setdataTeachers] = useState<StaffDetails[]>([]);
  const [dataAcademicYear, setdataAcademicYear] = useState<IAcademicYear[]>([]);
  const optionsMajor = [
    ...dataMajor.map((data) => ({
      value: data.majorCode,
      label: data.majorCode,
    })),
  ];
  const optionsTeacher = [
    ...dataTeachers.map((data) => ({
      value: data.id.toString(),
      label: data.name,
    })),
  ];
  const optionsAcademicYear = [
    ...dataAcademicYear.map((data) => ({
      value: data.name,
      label: data.name,
    })),
  ];
  const [formData, setFormData] = useState<FormState>({
    academicYear: "",
    staffId: "",
    name: ``,
    description: "",
    majorCode: "",
    grade: optionsGrade[0].value,
    group: "1",
    capacity: "",
  });

  const updateClassName = (grade: string, majorCode: string, group: string) => {
    return `${grade}-${majorCode}-${group}`;
  };

  const getTeacher = async () => {
    setloadingForm(true);
    try {
      const response = await staffService.getStaff("TEACHER");
      setdataTeachers(response.data as StaffDetails[]);
      if (!id) {
        if (response.data && response.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            staffId: response.data[0]?.id.toString() || "",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    } finally {
      setloadingForm(false);
    }
  };

  const getMajor = async () => {
    setloadingForm(true);
    try {
      const response = await majorService.all();
      setDataMajor(response.data);
      if (!id) {
        const initialMajorCode = response.data[0]?.majorCode || "";
        setFormData((prev) => ({
          ...prev,
          majorCode: initialMajorCode,
          name: updateClassName(
            prev.grade || "",
            initialMajorCode,
            prev.group || ""
          ),
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloadingForm(false);
    }
  };

  const getAcademicYear = async () => {
    setloadingForm(true);
    try {
      const response = await academicYearService.getAllAcademicYears();
      setdataAcademicYear(response.data);
      if (!id) {
        if (response.data && response.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            academicYear: response.data[0]?.name || "",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloadingForm(false);
    }
  };

  useEffect(() => {
    getTeacher();
    getMajor();
    getAcademicYear();
  }, []);

  useEffect(() => {
    const getDataClass = async () => {
      if (id) {
        try {
          const response = await classService.getClassById(parseInt(id));
          const data = response.data;
          setFormData({
            id: data.id,
            staffId: data.staffId?.toString(),
            name: data.name,
            academicYear: data.academicYear,
            description: data.description,
            majorCode: data.majorCode,
            capacity: data.capacity.toString(),
          });
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            Toast.fire({
              icon: "error",
              title: `Data Tidak Ditemukan!`,
              timer: 4000,
            });
            navigate("/");
          }
        } finally {
          setloadingForm(false);
        }
      } else {
        setloadingForm(false);
      }
    };

    getDataClass();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value,
      };

      if (name === "group") {
        updatedFormData.name = updateClassName(
          updatedFormData.grade || "",
          updatedFormData.majorCode,
          value
        );
      }

      return updatedFormData;
    });

    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: selectedOption ? selectedOption.value : "",
      };

      if (name === "grade" || name === "majorCode") {
        updatedFormData.name = updateClassName(
          name === "grade" ? selectedOption?.value || "" : prev.grade || "",
          name === "majorCode" ? selectedOption?.value || "" : prev.majorCode,
          prev.group || ""
        );
      }

      return updatedFormData;
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["academicYear", "capacity", "staffId"];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    // Check if media is required (only when adding a new class)
    // if (!formData.id && !formData.media) {
    //   newErrors.media = "Media is required.";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrorsForms(newErrors);
      return;
    }

    setloadingForm(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value as string | Blob);
    });

    try {
      let response;
      if (formData.id) {
        response = await classService.updateClass(formData.id, formData);
      } else {
        response = await classService.createClass(formData);
      }
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Kelas Berhasil ${formData.id ? "Diupdated" : "Ditambah"}`,
        });
        navigate(-1);
      }
    } catch (error) {
      setloadingForm(false);
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        return Toast.fire({
          icon: "error",
          title: `Kelas Tersebut Sudah Ada!`,
          timer: 3500,
        });
      }
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
    }
  };

  return (
    <>
      <HeaderTitlePage
        title={`${id ? "Update" : "Tambah"} Kelas Siswa`}
        subTitle="Kelas Siswa Web SMKN 1 Lumban Julu"
        backDisplay={true}
        addDisplay={false}
        linkAdd=""
      />
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{ backgroundColor: "#fff", position: "relative" }}
      >
        {loadingForm && (
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
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Nama Kelas *</label>
                <input
                  type="text"
                  name="academicYear"
                  disabled
                  className={`form-control`}
                  value={formData.name}
                />
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Tahun Ajaran *</label>
                <Select
                  options={optionsAcademicYear}
                  value={optionsAcademicYear.find((option) => {
                    return option.value === formData.academicYear;
                  })}
                  onChange={(option) => handleSelectChange("academicYear", option)}
                  placeholder="Pilih Tahun Ajaran"
                  isSearchable={false}
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
                {errorsForms.academicYear && (
                  <div className="invalid-form">Tahun Ajaran masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Kapasitas *</label>
                <input
                  type="text"
                  name="capacity"
                  className={`form-control ${
                    errorsForms.capacity ? "is-invalid" : ""
                  }`}
                  placeholder="Kapasitas Kelas.."
                  value={formData.capacity}
                  onChange={handleInputChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                {errorsForms.capacity && (
                  <div className="invalid-form">Kapasitas masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Wali Kelas *</label>
                <Select
                  options={optionsTeacher}
                  value={optionsTeacher.find((option) => {
                    return option.value === formData.staffId;
                  })}
                  onChange={(option) => handleSelectChange("staffId", option)}
                  placeholder="Pilih Wali Kelas"
                  isSearchable={false}
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
            <div className="col-12 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Kelas Tingkat *</label>
                <Select
                  options={optionsGrade}
                  value={optionsGrade.find((option) => {
                    return option.value === formData.grade;
                  })}
                  onChange={(option) => handleSelectChange("grade", option)}
                  placeholder="Pilih Tahun Mulai"
                  isSearchable={false}
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
            <div className="col-12 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Kelas Jurusan *</label>
                <Select
                  options={optionsMajor}
                  value={optionsMajor.find((option) => {
                    return option.value === formData.majorCode;
                  })}
                  onChange={(option) => handleSelectChange("majorCode", option)}
                  placeholder="Pilih Jurusan"
                  isSearchable={false}
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
            <div className="col-12 col-lg-2">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Kelompok *</label>
                <input
                  type="text"
                  name="group"
                  className={`form-control ${
                    errorsForms.group ? "is-invalid" : ""
                  }`}
                  placeholder="Kelompok Kelas.."
                  value={formData.group}
                  onChange={handleInputChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                {errorsForms.group && (
                  <div className="invalid-form">Kelompok masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2">Deskripsi</label>
                <textarea
                  name="description"
                  className={`form-control ${
                    errorsForms.description ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan deskripsi"
                  value={formData.description}
                  onChange={handleTextareaChange}
                />
                {errorsForms.description && (
                  <div className="invalid-form">Deskripsi masih kosong!</div>
                )}
              </div>
            </div>
            {/* <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Status</label>
                <Select
                  options={optionsStatus}
                  value={optionsStatus.find(
                    (option) => option.value === formData.status
                  )}
                  onChange={(option) => handleSelectChange("status", option)}
                  placeholder="Pilih Status"
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
            </div> */}
          </div>

          <div className="col-12">
            <button
              className={`btn ${formData.id ? "btn-warning" : "btn-success"}`}
              type="submit"
              style={{ fontSize: "1.1rem" }}
              disabled={loadingForm}
            >
              {loadingForm ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : formData.id ? (
                "Update"
              ) : (
                "Tambah"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
