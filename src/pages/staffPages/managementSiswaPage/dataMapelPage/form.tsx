import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Toast } from "../../../../utils/myFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import CourseService from "../../../../services/courseService";
import { optionsGrade, optionsStatus } from "../../../../utils/optionsData";

interface FormState {
  id?: number;
  name: string;
  code: string;
  grade: string;
  description: string;
  status?: string;
}

export const FormMapelMangementSiswaPage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const courseService = CourseService();
  const [formData, setFormData] = useState<FormState>({
    name: "",
    code: "",
    description: "",
    status: optionsStatus[0].value,
    grade: optionsGrade[0].value,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          const response = await courseService.getCourseById(parseInt(id));
          const data = response.data;
          setFormData({
            id: data.id,
            name: data.name,
            code: data.code,
            description: data.description,
            grade: data.grade,
            status: data.status,
          });
          setImageUrl(data.image?.url);
        } catch (error) {
          console.error("Error fetching detail mata pelajaran data:", error);
        } finally {
          setloadingForm(false);
        }
      } else {
        setloadingForm(false);
      }
    };

    getData();
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

    const requiredFields = ["code", "name"];
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

    setloadingForm(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value as string | Blob);
    });

    try {
      let response;
      if (formData.id) {
        response = await courseService.updateCourse(formData.id, payload);
      } else {
        response = await courseService.addCourse(payload);
      }
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Mata Pelajaran Berhasil ${
            formData.id ? "Diupdate" : "Ditambah"
          }`,
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

  return (
    <>
      <HeaderTitlePage
        title={`${id ? "Update" : "Tambah"} mata Pelajaran`}
        subTitle="Mata Pelajaran SMKN 1 Lumban Julu"
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
            <div className="col-12 col-lg-3 col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Kode Mapel *</label>
                <input
                  type="text"
                  name="code"
                  className={`form-control ${
                    errorsForms.code ? "is-invalid" : ""
                  }`}
                  placeholder="Kode Mapel.."
                  value={formData.code}
                  onChange={handleInputChange}
                />
                {errorsForms.code && (
                  <div className="invalid-form">Kode Mapel masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Nama Mapel *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${
                    errorsForms.name ? "is-invalid" : ""
                  }`}
                  placeholder="Nama Mapel.."
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errorsForms.name && (
                  <div className="invalid-form">Nama Mapel masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-2">
              <div className="form-group mb-3">
                <label className="mb-2 fw-medium">Tingkat *</label>
                <Select
                  options={optionsGrade}
                  value={optionsGrade.find((option) => {
                    return (
                      option.value.split("-")[0] ===
                      formData.grade.split("-")[0]
                    );
                  })}
                  onChange={(option) => handleSelectChange("grade", option)}
                  placeholder="Pilih TIngkat Kelas"
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
