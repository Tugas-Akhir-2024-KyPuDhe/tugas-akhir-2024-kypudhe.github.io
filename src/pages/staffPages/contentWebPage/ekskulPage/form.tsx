import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Toast, toolbarOptions } from "../../../../utils/myFunctions";
import { useNavigate, useParams } from "react-router-dom";
import EkskulService from "../../../../services/ekskulService";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { optionsPrioritas } from "../../../../utils/optionsData";
import { AxiosError } from "axios";
import ReactQuill from "react-quill";

interface FormState {
  id?: number;
  name: string;
  description: string;
  prioritas: string;
  mediaIdsToDelete: number[];
  media: File | null;
}

export const FormEkskulPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const ekskulService = EkskulService();
  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    prioritas: optionsPrioritas[11].value,
    media: null,
    mediaIdsToDelete: [],
  });

  const [mediaList, setMediaList] = useState<{ id: number; url: string }[]>([]);
  const [errorsForms, setErrorsForms] = useState<{ [key: string]: string }>({});
  const [loadingForm, setloadingForm] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        try {
          const response = await ekskulService.single(parseFloat(id));
          const data = response.data;

          setFormData({
            id: data.id,
            name: data.name,
            description: data.description,
            prioritas: data.prioritas.toString(),
            media: null,
            mediaIdsToDelete: [],
          });
          setMediaList(
            data.media.map((item: { id: number; url: string }) => ({
              id: item.id,
              url: item.url,
            }))
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
    setErrorsForms((prevErrors) => ({ ...prevErrors, description: "" }));
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

  const handleDeleteMedia = (mediaId: number) => {
    setMediaList((prev) => prev.filter((media) => media.id !== mediaId));
    setFormData((prev) => ({
      ...prev,
      mediaIdsToDelete: [...prev.mediaIdsToDelete, mediaId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["name", "description"];
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
      if (key === "mediaIdsToDelete") {
        (value as number[]).forEach((id) =>
          payload.append("mediaIdsToDelete[]", id.toString())
        );
      } else {
        payload.append(key, value as string | Blob);
      }
    });

    try {
      let response;
      if (formData.id) {
        response = await ekskulService.update(formData.id, payload);
      } else {
        response = await ekskulService.store(payload);
      }
      if (response.status === 201 || response.status === 200) {
        Toast.fire({
          icon: "success",
          title: `Ekstrakurikuler ${
            formData.id ? "updated" : "added"
          } successfully`,
        });
        navigate(-1);
      }
    } catch (error) {
      setloadingForm(false);
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
      console.error("Error processing Ekstrakurikuler:", error);
    }
  };

  return (
    <>
      <HeaderTitlePage
        title={`${id ? "Update" : "Tambah"} Ekstrakurikuler`}
        subTitle="Ekstrakurikuler Web SMKN 1 Lumban Julu"
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
                <label className="mb-2">Nama *</label>
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
                  <div className="invalid-form">Nama masih kosong!</div>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-3">
              <div className="form-group mb-3">
                <label className="mb-2">Prioritas</label>
                <Select
                  options={optionsPrioritas}
                  value={optionsPrioritas.find(
                    (option) => option.value === formData.prioritas
                  )}
                  onChange={(option) => handleSelectChange("prioritas", option)}
                  placeholder="Pilih Prioritas"
                  className="px-0 pt-0"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      borderRadius: "8px",
                    }),
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label className="mb-2">Deskripsi *</label>
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
                <label className="mb-2">Media</label>
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
            </div>
            {id && (
              <div className="col-12">
                <div className="form-group mb-3">
                  <label className="mb-2">Media Sekarang</label>
                  <div className="row">
                    {mediaList.map((media) => (
                      <div key={media.id} className="col-auto">
                        <img
                          src={media.url}
                          alt="Media"
                          className="d-block"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "contain",
                          }}
                        />
                        <div className="text-center mt-2">
                          <button
                            type="button"
                            className="btn btn-danger text-center w-100"
                            onClick={() => handleDeleteMedia(media.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-12 d-flex">
            <button
              className={`btn ${formData.id ? "btn-warning" : "btn-success"}`}
              type="submit"
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
