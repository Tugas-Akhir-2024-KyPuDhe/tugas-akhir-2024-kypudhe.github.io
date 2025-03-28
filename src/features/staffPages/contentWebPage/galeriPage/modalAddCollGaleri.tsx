import React, { useEffect, useState } from "react";
import { Toast } from "../../../../utils/myFunctions";
import GaleriService from "../../../../services/galeriService";

interface ModalAddGaleriProps {
  id: number;
  name: string;
  description: string;
  prioritas: string;
  status: string;
  handleGetDataGaleri: () => void;
}

interface FormState {
  id?: number;
  name: string;
  description: string;
  prioritas: string;
  status: string;
  mediaIdsToDelete: number[];
  media1: File | null;
  media2: File | null;
  media3: File | null;
  media4: File | null;
}

export const ModalAddGaleri: React.FC<ModalAddGaleriProps> = ({
  id,
  name,
  description,
  prioritas,
  status,
  handleGetDataGaleri,
}) => {
  const galeriService = GaleriService();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormState>({
    id: id,
    name: name,
    description: description,
    prioritas: prioritas,
    status: status,
    mediaIdsToDelete: [],
    media1: null,
    media2: null,
    media3: null,
    media4: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    if (
      formData.media1 == null &&
      formData.media2 == null &&
      formData.media3 == null &&
      formData.media4 == null
    ) {
      return Toast.fire({
        icon: "warning",
        title: `Masukkan gambar minimal 1 gambar!`,
        timer: 3500,
      });
    }

    setLoading(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "mediaIdsToDelete") {
        (value as number[]).forEach((id) =>
          payload.append("mediaIdsToDelete[]", id.toString())
        );
      } else if (key.startsWith("media") && value) {
        payload.append("media", value as File);
      } else {
        payload.append(key, value as string | Blob);
      }
    });

    try {
      let response;
      if (formData.id) {
        response = await galeriService.updateGaleri(formData.id, payload);
        if (response.status === 200) {
          handleGetDataGaleri();
          Toast.fire({
            icon: "success",
            title: `Galeri Berhasil ${formData.id ? "Diupdate" : "Ditambah"}`,
          });
          
          [1, 2, 3, 4].forEach((_, index) => {
            const fileInput = document.getElementById(
              `inputFileGaleri${index + 1}`
            ) as HTMLInputElement;
            if (fileInput) fileInput.value = "";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (formData as any)[`media${index + 1}`] = null;
          });
        }
      }
    } catch (error) {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.mediaIdsToDelete.length > 0) {
      handleSubmit();
    }
  }, [formData.mediaIdsToDelete]);

  return (
    <div
      className="modal fade modal-xl p-0"
      id="modalAddGaleri"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content position-relative">
          {loading && (
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
          <div className="row mx-0 pb-4">
            <div className="col p-2 text-start py-3 px-3">
              <div className="fw-bold position-relative pb-2 fs-5">
                Tambah Foto Galeri
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
            <div className="col-auto p-2 text-start py-3 px-3">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <div className="modal-body pb-4">
            <div className="row">
              <div className="form-group mb-3">
                {[1, 2, 3, 4].map((index) => (
                  <div className="input-group mb-3" key={`media${index}`}>
                    <input
                      type="file"
                      name={`media${index}`}
                      className="form-control fs-6"
                      id={`inputFileGaleri${index}`}
                      accept=".jpeg, .jpg, .png, .gif"
                      onChange={handleInputChange}
                    />
                    <label
                      className="input-group-text"
                      htmlFor={`inputFileGaleri${index}`}
                    >
                      Upload
                    </label>
                  </div>
                ))}
              </div>
              <div className="form-group mb-3">
                <button
                  className="btn btn-primary bg-blue border-0"
                  onClick={() => handleSubmit()}
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
