import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Toast } from "../../../../utils/myFunctions";
import { useNavigate, useParams } from "react-router-dom";
import useCookie from "react-use-cookie";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { optionsSem, optionsStatus } from "../../../../utils/optionsData";
import { AxiosError } from "axios";
import { IpayloadAcademicYear } from "../../../../interface/academicYear.interface";
import AcademicYearService from "../../../../services/academicYearService";

export const FormAcademicYearPage: React.FC = () => {
  const navigate = useNavigate();
  const academicYearService = AcademicYearService();

  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<IpayloadAcademicYear>({
    name: "",
    status: optionsStatus[0].value,
    createdBy: userLoginCookie.name,
  });
  const [selectedYear, setSelectedYear] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(true);

  // Generate tahun ajaran options (±5 tahun dari tahun sekarang)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let i = -5; i <= 5; i++) {
      const year = currentYear + i;
      years.push({
        value: `${year}/${year + 1}`,
        label: `${year}/${year + 1}`,
      });
    }

    return years;
  };

  const yearOptions = generateYearOptions();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          const response = await academicYearService.getAcademicYearById(
            parseInt(id)
          );
          const data = response.data;

          // Split existing name into year and semester
          const parts = data.name.split(" ");
          const yearPart = parts[0];
          const semesterPart = parts[1];

          setFormData({
            id: data.id,
            name: data.name,
            status: data.status,
            createdBy: data.createdBy,
          });

          setSelectedYear(
            yearOptions.find((option) => option.value === yearPart) || null
          );
          setSelectedSemester(
            optionsSem.find((option) => option.value === semesterPart) || null
          );
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

    getData();
  }, []);

  useEffect(() => {
    // Update name whenever year or semester changes
    if (selectedYear && selectedSemester) {
      setFormData((prev) => ({
        ...prev,
        name: `${selectedYear.value} ${selectedSemester.value}`,
      }));
    }
  }, [selectedYear, selectedSemester]);

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string; label: string } | null
  ) => {
    if (name === "year") {
      setSelectedYear(selectedOption);
    } else if (name === "semester") {
      setSelectedSemester(selectedOption);
    } else if (name === "status") {
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption ? selectedOption.value : "",
      }));
    }

    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!selectedYear) {
      newErrors.year = "Tahun Ajaran harus dipilih";
    }

    if (!selectedSemester) {
      newErrors.semester = "Semester harus dipilih";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorsForms(newErrors);
      return;
    }

    setloadingForm(true);
    try {
      let response;
      if (formData.id) {
        response = await academicYearService.updateAcademicYear(
          formData.id,
          formData
        );
      } else {
        response = await academicYearService.addAcademicYear(formData);
      }
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Tahun Ajaran Berhasil ${
            formData.id ? "Diupdate" : "Ditambah"
          }`,
        });
        navigate(-1);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        return Toast.fire({
          icon: "error",
          title: `Gagal, Tahun ajaran sudah ada!`,
          timer: 4000,
        });
      }
      Toast.fire({
        icon: "error",
        title: `Error! Terjadi kesalahan, coba lagi`,
      });
      console.error("Error processing tahun ajaran:", error);
    } finally {
      setloadingForm(false);
    }
  };

  return (
    <>
      <HeaderTitlePage
        title={`${id ? "Update" : "Tambah"} Tahun Ajaran`}
        subTitle="Data Tahun Ajaran SMKN 1 Lumban Julu"
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
            <div className="col-12 col-md-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Tahun Ajaran *</label>
                <Select
                  isSearchable={false}
                  options={yearOptions}
                  value={selectedYear}
                  onChange={(option) => handleSelectChange("year", option)}
                  placeholder="Pilih Tahun Ajaran"
                  className="form-control-lg px-0 pt-0"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: "0.955rem",
                      minHeight: "48px",
                      borderRadius: "8px",
                      borderColor: errorsForms.year
                        ? "#dc3545"
                        : baseStyles.borderColor,
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                  }}
                />
                {errorsForms.year && (
                  <div className="invalid-form">{errorsForms.year}</div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Semester *</label>
                <Select
                  isSearchable={false}
                  options={optionsSem}
                  value={selectedSemester}
                  onChange={(option) => handleSelectChange("semester", option)}
                  placeholder="Pilih Semester"
                  className="form-control-lg px-0 pt-0"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: "0.955rem",
                      minHeight: "48px",
                      borderRadius: "8px",
                      borderColor: errorsForms.semester
                        ? "#dc3545"
                        : baseStyles.borderColor,
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                  }}
                />
                {errorsForms.semester && (
                  <div className="invalid-form">{errorsForms.semester}</div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Status</label>
                <Select
                  isSearchable={false}
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
            </div>
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
