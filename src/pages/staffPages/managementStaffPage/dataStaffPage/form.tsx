import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { optionsGender, optionsStartYear } from "../../../../utils/optionsData";
import StaffService from "../../../../services/staffService";
import { Toast } from "../../../../utils/myFunctions";
import CourseService from "../../../../services/courseService";
import { Course } from "../../../../interface/course.interface";

interface FormState {
  id?: number;
  password?: string;
  name: string;
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  gender: string;
  mapel: string;
  nip: string;
  type: string;
  position: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export const FormStaffMangementStaffPage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const staffService = StaffService();
  const courseService = CourseService();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    birthPlace: "",
    address: "",
    phone: "",
    email: "",
    gender: optionsGender[0].value,
    mapel: "",
    nip: "",
    type: "",
    position: "",
    startDate: optionsStartYear[4].value,
    endDate: "",
    createdAt: "",
    updatedAt: "",
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(true);

  const [dataCourse, setdataCourse] = useState<Course[]>([]);
  const optionsCourse = [
    {
      value: "Tidak Ada",
      label: "Tidak Ada",
    },
    ...dataCourse.map((data) => ({
      value: data.name,
      label: data.name,
    })),
  ];

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
            endDate: data.endDate,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
          setImageUrl(data.photo?.url);
        } catch (error) {
          console.error("Error fetching detail staff data:", error);
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

    // Check if media is required (only when adding a new banner)
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
      if (key !== "password" || id) {
        payload.append(key, value as string | Blob);
      }
    });

    try {
      let response;
      if (formData.id) {
        response = await staffService.updateUser(formData.id, payload);
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
    } catch (error) {
      setloadingForm(false);
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
      console.error("Error processing banner:", error);
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
              zIndex: 9999,
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
                  placeholder="Masukkan Nama"
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
            <div className="col-12 col-lg-5">
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
            <div className="col-12 col-lg-4">
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
            <div className="col-12 col-lg-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">No Telp *</label>
                <input
                  type="text"
                  name="phone"
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
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Alamat *</label>
                <textarea
                  name="address"
                  className={`form-control ${
                    errorsForms.address ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan Alamat.."
                  value={formData.address}
                  onChange={handleTextareaChange}
                />
                {errorsForms.address && (
                  <div className="invalid-form">Deskripsi masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                {id ? (
                  <label className="mb-2 fw-medium">Update Gambar *</label>
                ) : (
                  <label className="mb-2 fw-medium">Gambar *</label>
                )}
                <div className="input-group mb-3">
                  <input
                    type="file"
                    name="media"
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
                {errorsForms.media && (
                  <div className="invalid-form">Media masih kosong!</div>
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
            {id && (
              <div className="col-12 col-lg-12">
                <div className="form-group mb-3">
                  <label className="mb-2 fw-medium">Password *</label>
                  <input
                    type="text"
                    name="password"
                    className={`form-control ${
                      errorsForms.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password akun siswa.."
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <small id="helpId" className="text-muted">
                    *Password Dienkripsi
                  </small>
                  {errorsForms.password && (
                    <div className="invalid-form">password masih kosong!</div>
                  )}
                </div>
              </div>
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
            <div className="col-12 col-lg-9">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Mata Pelajaran</label>
                <Select
                  options={optionsCourse}
                  value={optionsCourse.find((option) => {
                    return option.value === formData.mapel;
                  })}
                  onChange={(option) => handleSelectChange("course", option)}
                  placeholder="Pilih Mapel yang Diambil"
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
                <input
                  type="text"
                  name="type"
                  className={`form-control ${
                    errorsForms.type ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan NISN.."
                  value={formData.type}
                  onChange={handleInputChange}
                />
                {errorsForms.type && (
                  <div className="invalid-form">Status masih kosong!</div>
                )}
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
