import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import {
  optionsGender,
  optionsRole,
  optionsStartYear,
  optionsStatusPegawai,
} from "../../../../utils/optionsData";
import StaffService from "../../../../services/staffService";
import { showConfirmationDialog, Toast } from "../../../../utils/myFunctions";
import CourseService from "../../../../services/courseService";
import { Course } from "../../../../interface/course.interface";
import { AxiosError } from "axios";
import AuthService from "../../../../services/authService";

interface FormState {
  id?: number;
  password?: string;
  name: string;
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  gender: string;
  mapel: string[];
  nip: string;
  type: string;
  position: string;
  startDate: string;
  endDate: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export const FormStaffMangementStaffPage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const staffService = StaffService();
  const authService = AuthService();
  const courseService = CourseService();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(true);
  const [statusNewPassword, setStatusNewPassword] = useState(false);

  const [dataCourse, setdataCourse] = useState<Course[]>([]);
  const optionsCourse = [
    ...dataCourse.map((data) => ({
      value: data.code,
      label: `${data.name} | ${data.grade}`,
    })),
  ];

  const [formData, setFormData] = useState<FormState>({
    name: "",
    birthPlace: "",
    address: "",
    phone: "",
    email: "",
    gender: optionsGender[0].value,
    mapel: [],
    nip: "",
    type: optionsStatusPegawai[0].value,
    position: "",
    startDate: optionsStartYear[4].value,
    endDate: "",
    role: optionsRole[0].value,
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const getDataPegawai = async () => {
      if (id) {
        try {
          const response = await staffService.getStaffByNip(id);
          const data = response.data;
          setFormData({
            id: data.id,
            password: data.user?.password,
            name: data.name,
            birthPlace: data.birthPlace,
            address: data.address,
            phone: data.phone,
            email: data.email,
            gender: data.gender,
            mapel: data.mapel,
            nip: data.nip,
            type: data.type,
            position: data.position,
            startDate: data.startDate,
            role: data.user?.roles[0].name,
            endDate: data.endDate,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
          setImageUrl(data.photo?.url);
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

    getDataPegawai();
  }, []);

  const getCourse = async () => {
    setloadingForm(true);
    try {
      const response = await courseService.getAllCourses();
      setdataCourse(response.data);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSelectMultipleChange = (
    name: string,
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions.map((opt) => opt.value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["nip", "name", "email", "phone"];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    // Check if media is required (only when adding a new banner)
    // if (!formData.id && !formData.media) {
    //   newErrors.media = "Media is required.";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrorsForms(newErrors);
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "password" || id) {
        payload.append(key, value as string | Blob);
      }
    });

    try {
      const result = await showConfirmationDialog({
        title: "Apakah Data Sudah Sesuai?",
        icon: "warning",
        cancelButtonText: "Cek Lagi",
        confirmButtonText: "Ya, Sesuai!",
      });
      if (result.isConfirmed) {
        setloadingForm(true);
        let response;
        if (formData.id) {
          response = await staffService.updateUserStaff(formData.id, payload);
        } else {
          response = await staffService.createStaff(payload);
        }
        if (response.status === 201 || response.status === 200) {
          Toast.fire({
            icon: "success",
            title: `Staff Berhasil ${formData.id ? "Diupdate" : "Ditambah"}`,
          });
          navigate(-1);
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        return Toast.fire({
          icon: "error",
          title: `NIP sudah pernah terdaftar!`,
          timer: 4000,
        });
      }
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
      console.error("Error processing banner:", error);
    } finally {
      setloadingForm(false);
    }
  };

  const handleResetPassword = async () => {
    const result = await showConfirmationDialog({
      title: `Ingin Mereset Password Akun<br>${formData.name} - ${formData.nip}?`,
      icon: "warning",
      confirmButtonText: "Ya, Reset!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setloadingForm(true);
      try {
        const response = await authService.resetPassword(formData.id!);
        if (response.status === 200) {
          setFormData({ ...formData, password: response.data.newPassword });
          setStatusNewPassword(true);
          Toast.fire({
            icon: "success",
            title: "Password berhasil direset!",
            timer: 4000,
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          return Toast.fire({
            icon: "error",
            title: `Gagal, Anda Tidak Memiliki Akses!`,
            timer: 4000,
          });
        }
        Toast.fire({
          icon: "error",
          title: `Gagal, Terjadi Kesalahan!`,
          timer: 4000,
        });
        console.error("Error reset password:", error);
      } finally {
        setloadingForm(false);
      }
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <HeaderTitlePage
        title={`${id ? "Update" : "Tambah"} Pegawai`}
        subTitle="Staff Web SMKN 1 Lumban Julu"
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
            <div className="col-12">
              <div className="fw-bold position-relative pb-2 mb-3">
                Lengkap Data Diri
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
            <div className="col-6 col-lg- col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">NIP *</label>
                <input
                  type="text"
                  name="nip"
                  className={`form-control ${
                    errorsForms.nip ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan NIP.."
                  value={formData.nip}
                  onKeyPress={(event) => {
                    // if (!/[0-9]/.test(event.key)) {
                    //   event.preventDefault();
                    // }
                    if (event.key === " ") {
                      event.preventDefault();
                    }
                  }}
                  onChange={handleInputChange}
                />
                {errorsForms.nip && (
                  <div className="invalid-form">NIP masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Nama *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${
                    errorsForms.name ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan Nama.."
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errorsForms.name && (
                  <div className="invalid-form">Nama Pegawai masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Jenis Kelamin</label>
                <Select
                  options={optionsGender}
                  value={optionsGender.find(
                    (option) => option.value === formData.gender
                  )}
                  onChange={(option) => handleSelectChange("gender", option)}
                  placeholder="Pilih Jenis Kelamin"
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
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Email *</label>
                <input
                  type="text"
                  name="email"
                  className={`form-control ${
                    errorsForms.email ? "is-invalid" : ""
                  }`}
                  placeholder="Email Pegawai.."
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errorsForms.email && (
                  <div className="invalid-form">Email masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Tempat Tanggal Lahir</label>
                <input
                  type="text"
                  name="birthPlace"
                  className={`form-control ${
                    errorsForms.birthPlace ? "is-invalid" : ""
                  }`}
                  placeholder="Tempat, Tanggal Lahir.."
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">No Telp *</label>
                <input
                  type="text"
                  name="phone"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                    if (event.key === " ") {
                      event.preventDefault();
                    }
                  }}
                  className={`form-control ${
                    errorsForms.phone ? "is-invalid" : ""
                  }`}
                  placeholder="No.telp.."
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errorsForms.phone && (
                  <div className="invalid-form">No Telp masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Alamat</label>
                <textarea
                  name="address"
                  className={`form-control ${
                    errorsForms.address ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan Alamat.."
                  value={formData.address}
                  onChange={handleTextareaChange}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                {id ? (
                  <label className="mb-2 fw-medium">
                    Update Gambar{" "}
                    <span className="text-muted">
                      <sup>800 x 800</sup>
                    </span>
                  </label>
                ) : (
                  <label className="mb-2 fw-medium">
                    Gambar{" "}
                    <span className="text-muted">
                      <sup>800 x 800</sup>
                    </span>
                  </label>
                )}
                <div className="input-group">
                  <input
                    type="file"
                    name="photo"
                    accept=".jpeg, .jpg, .png, .gif"
                    className="form-control fs-6"
                    id="inputGroupFile02"
                    onChange={handleInputChange}
                  />
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupFile02"
                  >
                    Upload
                  </label>
                </div>
              </div>
            </div>
            {id && (
              <div className="col-12">
                {imageUrl && (
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Gambar Sekarang</label>
                    <br />
                    <img
                      src={imageUrl}
                      alt={formData.name}
                      className="rounded"
                      style={{ width: "300px", objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>
            )}
            {id && (
              <>
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">Password *</label>
                    <input
                      type="text"
                      disabled
                      name="password"
                      className={`form-control ${
                        errorsForms.password ? "is-invalid" : ""
                      }`}
                      placeholder="Password akun staff.."
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <small id="helpId" className="text-muted">
                      { statusNewPassword ? "Password Baru User" : "*Password Dienkripsi" }
                    </small>
                    {errorsForms.password && (
                      <div className="invalid-form">password masih kosong!</div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 m-aut">
                  <div className="form-group mb-3">
                    <label className="mb-2 fw-medium">&nbsp;</label>
                    <button
                      className="btn btn-danger w-100"
                      type="button"
                      onClick={() => handleResetPassword()}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="col-12">
              <div className="fw-bold position-relative pb-2 my-3">
                Lengkapi Data Akademis
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
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Tahun Mulai *</label>
                <Select
                  options={optionsStartYear}
                  value={optionsStartYear.find((option) => {
                    return (
                      option.value.split("-")[0] ===
                      formData.startDate.split("-")[0]
                    );
                  })}
                  menuPlacement="top"
                  onChange={(option) => handleSelectChange("startDate", option)}
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
            <div className="col-6 col-lg-3 col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Peran *</label>
                <Select
                  options={optionsRole}
                  value={optionsRole.find((option) => {
                    return option.value === formData.role;
                  })}
                  onChange={(option) => handleSelectChange("role", option)}
                  placeholder="Pilih Status"
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
            <div className="col-6 col-lg-3 col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Status Pegawai *</label>
                <Select
                  options={optionsStatusPegawai}
                  value={optionsStatusPegawai.find((option) => {
                    return option.value === formData.type;
                  })}
                  onChange={(option) => handleSelectChange("type", option)}
                  placeholder="Pilih Status"
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
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Mata Pelajaran</label>
                <Select
                  options={optionsCourse}
                  value={optionsCourse.filter((option) =>
                    formData.mapel.includes(option.value)
                  )}
                  menuPlacement="top"
                  onChange={(selectedOptions) =>
                    handleSelectMultipleChange("mapel", selectedOptions)
                  }
                  placeholder="Pilih Mapel yang Diambil"
                  // isSearchable={false}
                  isMulti
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
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Jabatan </label>
                <input
                  type="text"
                  name="position"
                  className={`form-control ${
                    errorsForms.position ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan Jabatan.."
                  value={formData.position}
                  onChange={handleInputChange}
                />
                {errorsForms.position && (
                  <div className="invalid-form">No Telp Link masih kosong!</div>
                )}
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
