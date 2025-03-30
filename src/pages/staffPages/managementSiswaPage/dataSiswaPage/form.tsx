import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  convertStartEndYear,
  showConfirmationDialog,
  Toast,
} from "../../../../utils/myFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import AuthService from "../../../../services/authService";
import { optionsGender, optionsStartYear } from "../../../../utils/optionsData";
import { AxiosError } from "axios";
import { Fajusek } from "../../../../interface/fajusek.interfase";
import JurusanService from "../../../../services/jurusanService";

interface FormState {
  id?: number | null;
  password?: string;
  name: string;
  birthPlace: string;
  address: string;
  nis: string;
  nisn: string;
  gender: string;
  phone: string;
  majorCode: string;
  email: string;
  startYear: string;
}

export const FormSiswaMangementSiswaPage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const studentService = AuthService();
  const majorService = JurusanService();
  const [formData, setFormData] = useState<FormState>({
    id: null,
    password: "",
    name: "",
    birthPlace: "",
    address: "",
    nis: "",
    nisn: "",
    gender: optionsGender[0].value,
    phone: "",
    majorCode: "",
    email: "",
    startYear: optionsStartYear[4].value,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(true);
  const [statusNewPassword, setStatusNewPassword] = useState(false);

  useEffect(() => {
    getDataSiswa();
    getMajor();
  }, []);

  const [dataMajor, setDataMajor] = useState<Fajusek[]>([]);
  const optionsMajor = [
    ...dataMajor.map((data) => ({
      value: data.majorCode,
      label: data.name,
    })),
  ];

  const getMajor = async () => {
    setloadingForm(true);
    try {
      const response = await majorService.all();
      setDataMajor(response.data);
      setFormData({...formData, majorCode: response.data[0].majorCode})
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloadingForm(false);
    }
  };

  const getDataSiswa = async () => {
    if (id) {
      try {
        const response = await studentService.getStudentByNis(id);
        const data = response.data;
        setFormData({
          id: data.id,
          password: data.user.password,
          name: data.name,
          birthPlace: data.birthPlace,
          address: data.address,
          nis: data.nis,
          nisn: data.nisn,
          gender: data.gender,
          phone: data.phone,
          majorCode: 'RPL',
          email: data.email,
          startYear: convertStartEndYear(data.startYear),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["name", "nis", "nisn"];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    // Check if photo is required (only when adding a new banner)
    // if (!formData.id && !formData.photo) {
    //   newErrors.photo = "Foto is required.";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrorsForms(newErrors);
      return;
    }

    setloadingForm(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "password" || id) {
        payload.append(key, value as string | Blob);
      }
    });

    try {
      let response;
      if (formData.id) {
        response = await studentService.updateStundent(formData.id, payload);
      } else {
        response = await studentService.createStundent(payload);
      }
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Siswa Berhasil ${formData.id ? "Diupdate" : "Ditambah"}`,
        });
        navigate(-1);
      }
    } catch (error) {
      setloadingForm(false);
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
      console.error("Error processing banner:", error);
    }
  };

  const handleResetPassword = async () => {
    const result = await showConfirmationDialog({
      title: `Ingin Mereset Password Akun<br>${formData.name} - ${formData.nis}/${formData.nisn}?`,
      icon: "warning",
      confirmButtonText: "Ya, Reset!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setloadingForm(true);
      try {
        const response = await studentService.resetPassword(formData.id!);
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
  return (
    <>
      <HeaderTitlePage
        title={`${id ? "Update" : "Tambah"} Siswa`}
        subTitle="Siswa Web SMKN 1 Lumban Julu"
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
            <div className="col-12 col-lg-6 col-md-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Nama Siswa *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${
                    errorsForms.name ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan Nama"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errorsForms.name && (
                  <div className="invalid-form">Nama Siswa masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-6 col-lg-3 col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">NIS *</label>
                <input
                  type="text"
                  name="nis"
                  className={`form-control ${
                    errorsForms.nis ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan NIS.."
                  value={formData.nis}
                  onChange={handleInputChange}
                />
                {errorsForms.nis && (
                  <div className="invalid-form">NIS masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-6 col-lg-3 col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">NISN *</label>
                <input
                  type="text"
                  name="nisn"
                  className={`form-control ${
                    errorsForms.nisn ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan NISN.."
                  value={formData.nisn}
                  onChange={handleInputChange}
                />
                {errorsForms.nisn && (
                  <div className="invalid-form">NISN masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Jurusan *</label>
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
            <div className="col-12 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Tahun Mulai *</label>
                <Select
                  options={optionsStartYear}
                  value={optionsStartYear.find((option) => {
                    return (
                      option.value.split("-")[0] ===
                      formData.startYear.split("-")[0]
                    );
                  })}
                  onChange={(option) => handleSelectChange("startYear", option)}
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
                <label className="mb-2 fw-medium">No Telp</label>
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
                  <div className="invalid-form">No Telp Link masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Email</label>
                <input
                  type="text"
                  name="email"
                  className={`form-control ${
                    errorsForms.email ? "is-invalid" : ""
                  }`}
                  placeholder="Email Siswa.."
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errorsForms.email && (
                  <div className="invalid-form">Email masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-9">
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
                {errorsForms.birthPlace && (
                  <div className="invalid-form">No Telp Link masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Jenis Kelamin</label>
                <Select
                  options={optionsGender}
                  value={optionsGender.find(
                    (option) => option.value === formData.gender
                  )}
                  onChange={(option) => handleSelectChange("prioritas", option)}
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
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Alamat</label>
                <textarea
                  name="address"
                  className={`form-control ${
                    errorsForms.address ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan Alamat Siswa"
                  value={formData.address}
                  onChange={handleTextareaChange}
                />
                {errorsForms.address && (
                  <div className="invalid-form">Deskripsi masih kosong!</div>
                )}
              </div>
            </div>
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
                      placeholder="Password akun siswa.."
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <small id="helpId" className="text-muted">
                      {statusNewPassword
                        ? "Password Baru User"
                        : "*Password Dienkripsi"}
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
                <div className="input-group mb-3">
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
                {errorsForms.photo && (
                  <div className="invalid-form">Foto masih kosong!</div>
                )}
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
