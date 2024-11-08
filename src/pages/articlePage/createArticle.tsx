import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import ArtikelService from "../../services/artikelService";
import { Toast } from "../../utils/myFunctions";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "video"],
  [{ align: [] }, { color: [] }, { background: [] }],
  ["clean"],
];

const optionsTypeArticle = [
  { value: "umum", label: "Umum" },
  { value: "private", label: "Private" },
];

const optionsStatusArticle = [
  { value: "PUBLISH", label: "PUBLISH" },
  { value: "DRAFT", label: "DRAFT" },
];

export const CreateArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const articleService = ArtikelService();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: optionsStatusArticle[0].value,
    type: optionsTypeArticle[0].value,
    banner: null,
    createBy: "GOD",
  });
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, description: "" }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
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

    const requiredFields = ["title", "description"];
    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrorsForms(newErrors);
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value as string | Blob);
    });

    try {
      const addedArticle = await articleService.addArtikel(payload);
      console.log(addedArticle);

      if (addedArticle.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Artikel berhasil ditambah",
        });
        setFormData({
          title: "",
          description: "",
          status: optionsStatusArticle[0].value,
          type: optionsTypeArticle[0].value,
          banner: null,
          createBy: "GOD",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
      console.error("Error adding article:", error);
    }
  };

  return (
    <>
      <div className="m-1 m-lg-4 m-md-4 my-4">
        <div className="row g-4 d-flex justify-content-between mb-3">
          <div className="col-12 col-lg-6 col-md-6">
            <div className="row d-flex">
              <div className="col-auto">
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-lg btn-danger"
                >
                  <FaArrowLeft />
                </button>
              </div>
              <div className="col">
                <div className="">
                  <div className="fw-bold fs-5 text-dark-soft">
                    Tambah Berita/Artikel
                  </div>
                  <div className="">
                    Tambah Berita dan artikel SMKN 1 Lumban Julu
                  </div>
                </div>
              </div>
            </div>
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
                  className={`form-control  ${
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
                <label className="mb-2 fw-medium">Tipe</label>
                <Select
                  options={optionsTypeArticle}
                  value={optionsTypeArticle.find(
                    (option) => option.value === formData.type
                  )}
                  onChange={(option) => handleSelectChange("type", option)}
                  placeholder="Pilih tipe"
                  className=" px-0 pt-0"
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
                <label className="mb-2 fw-medium">Banner</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    name="banner"
                    className="form-control  fs-6"
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
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Deskripsi *</label>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  modules={{ toolbar: toolbarOptions }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "align",
                    "color",
                    "background",
                  ]}
                />
                {errorsForms.description && (
                  <div className="invalid-form">Deskripsi masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Status</label>
                <Select
                  options={optionsStatusArticle}
                  value={optionsStatusArticle.find(
                    (option) => option.value === formData.status
                  )}
                  onChange={(option) => handleSelectChange("status", option)}
                  placeholder="Pilih Status"
                  className=" px-0 pt-0"
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
            <div className="col-12 d-flex justify-content-end">
              <button
                className="btn btn-success btn-lg w-50 fw-medium"
                type="submit"
                style={{ fontSize: "1.1rem" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
