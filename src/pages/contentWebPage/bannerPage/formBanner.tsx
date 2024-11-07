import React, { useState } from "react";
import Select from "react-select";
import BannerService from "../../../services/bannerService";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Toast } from "../../../utils/myFunctions";

const optionsPrioritas = Array.from({ length: 20 }, (_, index) => ({
  value: (index + 1).toString(),
  label: (index + 1).toString(),
}));

const optionsStatus = [
  { value: "Active", label: "Aktif" },
  { value: "NonActive", label: "Non Aktif" },
];

export const FormBanner: React.FC = () => {
  const navigate = useNavigate();
  const bannerService = BannerService();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    title_link: "",
    link: "",
    prioritas: optionsPrioritas[11].value,
    status: optionsStatus[0].value,
    media: null,
  });
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(false);

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

    // Tambahkan pengecekan media
    if (!formData.media) {
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
      const addedBanner = await bannerService.addBanner(payload);
      if (addedBanner.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Banner berhasil ditambah",
        });
        setFormData({
          title: "",
          description: "",
          title_link: "",
          link: "",
          prioritas: optionsPrioritas[0].value,
          status: optionsStatus[0].value,
          media: null,
        });
        setloadingForm(false);
      }
    } catch (error) {
      setloadingForm(false);
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
      console.error("Error adding banner:", error);
    }
  };

  return (
    <>
      <div className="m-1 m-lg-4 m-md-4 my-4">
        <div className="row">
          <div className="col d-flex align-items-end">
            <div className="h4 fw-medium">Tambah Banner</div>
          </div>
          <div className="col-auto">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-lg btn-danger"
            >
              <FaArrowLeft />
            </button>
          </div>
        </div>
      </div>
      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
        style={{ backgroundColor: "#fff" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-lg-9 col-md-9">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Judul *</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control form-control-lg ${
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
                  className={`form-control form-control-lg ${
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
                  className={`form-control form-control-lg ${
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
                  className={`form-control form-control-lg ${
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
                <label className="mb-2 fw-medium">Gambar</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    name="media"
                    className="form-control form-control-lg fs-6"
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

          <div className="col-12 d-flex justify-content-end">
            <button
              className="btn btn-success btn-lg w-50 fw-medium"
              type="submit"
              style={{ fontSize: "1.1rem" }}
              disabled={loadingForm}
            >
              {loadingForm ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
