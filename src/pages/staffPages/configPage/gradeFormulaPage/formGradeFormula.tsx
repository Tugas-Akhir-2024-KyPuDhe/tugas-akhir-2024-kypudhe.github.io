import React, { useEffect, useState } from "react";
import Select from "react-select";
import BannerService from "../../../../services/bannerService";
import { Toast } from "../../../../utils/myFunctions";
import { useNavigate, useParams } from "react-router-dom";
import useCookie from "react-use-cookie";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { optionsPrioritas, optionsStatus } from "../../../../utils/optionsData";
import { AxiosError } from "axios";

interface FormState {
  id?: number;
  title: string;
  description: string;
  title_link: string;
  link: string;
  prioritas: string;
  status: string;
  media: File | null;
  createdBy: string;
}

export const FormGradeFormulaPage: React.FC = () => {
  const navigate = useNavigate();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const { id } = useParams<{ id: string }>();
  const bannerService = BannerService();
  const [formData, setFormData] = useState<FormState>({
    title: "",
    description: "",
    title_link: "",
    link: "",
    prioritas: optionsPrioritas[11].value,
    status: optionsStatus[0].value,
    media: null,
    createdBy: userLoginCookie.name,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(true);

  useEffect(() => {
    const getDataBanner = async () => {
      if (id) {
        try {
          const response = await bannerService.getBannerById(parseFloat(id));
          const data = response.data;

          setFormData({
            id: data.id,
            title: data.title,
            description: data.description,
            title_link: data.title_link,
            link: data.link,
            prioritas: data.prioritas.toString(),
            status: data.status,
            media: null,
            createdBy: data.createdBy,
          });
          setImageUrl(data.banner.url);
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

    getDataBanner();
  }, []);

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

    const requiredFields = ["title", "description", "title_link", "link"];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    // Check if media is required (only when adding a new banner)
    if (!formData.id && !formData.media) {
      newErrors.media = "Media is required.";
    }

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
        response = await bannerService.updateBanner(formData.id, payload);
      } else {
        response = await bannerService.addBanner(payload);
      }
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Banner Berhasil ${formData.id ? "Diupdate" : "Ditambah"}`,
        });
        navigate(-1);
      }
    } catch (error) {
      setloadingForm(false);
      Toast.fire({
        icon: "error",
        title: `Error! Terjadi kesalahan, coba lagi`,
      });
      console.error("Error processing banner:", error);
    }
  };

  return (
    <>
      <HeaderTitlePage
        title={`${id ? "Update" : "Tambah"} Banner`}
        subTitle="Banner Web SMKN 1 Lumban Julu"
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
            <div className="col-12 col-lg-9 col-md-9">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Judul *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${
                    errorsForms.title ? "is-invalid" : ""
                  }`}
                  placeholder="Masukkan judul"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {errorsForms.title && (
                  <div className="invalid-form">Judul masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Prioritas</label>
                <Select
                  options={optionsPrioritas}
                  value={optionsPrioritas.find(
                    (option) => option.value === formData.prioritas
                  )}
                  onChange={(option) => handleSelectChange("prioritas", option)}
                  placeholder="Pilih Prioritas"
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
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Title Link *</label>
                <input
                  type="text"
                  name="title_link"
                  className={`form-control ${
                    errorsForms.title_link ? "is-invalid" : ""
                  }`}
                  placeholder="cth: Detail"
                  value={formData.title_link}
                  onChange={handleInputChange}
                />
                {errorsForms.title_link && (
                  <div className="invalid-form">Title Link masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Link *</label>
                <input
                  type="url"
                  name="link"
                  className={`form-control ${
                    errorsForms.link ? "is-invalid" : ""
                  }`}
                  placeholder="cth: https://smkn1lumbanjulu/berita"
                  value={formData.link}
                  onChange={handleInputChange}
                />
                {errorsForms.link && (
                  <div className="invalid-form">Link masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Deskripsi *</label>
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
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Gambar *</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    name="media"
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
                {errorsForms.media && (
                  <div className="invalid-form">Media masih kosong!</div>
                )}
              </div>
              {imageUrl && (
                <div className="form-group mb-3">
                  <label className="mb-2 fw-medium">Gambar Sekarang</label>
                  <br />
                  <img
                    src={imageUrl}
                    alt={formData.title}
                    style={{ maxWidth: "50%", objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
            <div className="col-12">
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
