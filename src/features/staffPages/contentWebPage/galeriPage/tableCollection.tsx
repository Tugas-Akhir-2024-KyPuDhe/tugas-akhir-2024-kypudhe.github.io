import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { useParams } from "react-router-dom";
import GaleriService from "../../../../services/galeriService";
import { Media } from "../../../../interface/media.interface";
import {
  convertStatus,
  formatDateTime,
  showConfirmationDialog,
  Toast,
} from "../../../../utils/myFunctions";

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

export const TableCollectionGaleri: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const galeriService = GaleriService();
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    prioritas: "",
    status: "",
    mediaIdsToDelete: [],
    media1: null,
    media2: null,
    media3: null,
    media4: null,
  });

  const getData = async () => {
    if (id) {
      try {
        const response = await galeriService.getGaleriById(parseFloat(id));
        const data = response.data;

        setFormData({
          id: data.id,
          name: data.name,
          description: data.description,
          prioritas: data.prioritas.toString(),
          status: data.status,
          media1: null,
          media2: null,
          media3: null,
          media4: null,
          mediaIdsToDelete: [],
        });
        setMediaList(
          data.media.map((item: Media) => ({
            id: item.id,
            uuid: item.uuid,
            url: item.url,
            type: item.type,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }))
        );
      } catch (error) {
        console.error("Error fetching galeri data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Media, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Image",
      selector: (row: Media) => row.url,
      cell: (row: Media) => (
        <div className="p-3">
          <img
            src={row.url}
            alt={`Media ${row.url}`}
            style={{ width: "300px", height: "auto" }}
          />
        </div>
      ),
      width: "600px",
    },
    {
      name: "Dibuat Pada",
      selector: (row: Media) => formatDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: Media) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteMedia(row.id)}
        >
          Delete
        </button>
      ),
      width: "100px",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleDeleteMedia = async (mediaId: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus galeri ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setFormData((prev) => ({
        ...prev,
        mediaIdsToDelete: [...prev.mediaIdsToDelete, mediaId],
      }));

      setLoading(true);
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
          await getData();
          Toast.fire({
            icon: "success",
            title: `Galeri ${formData.id ? "updated" : "added"} successfully`,
          });
          const fileInput1 = document.getElementById(
            "inputFileGaleri1"
          ) as HTMLInputElement;
          const fileInput2 = document.getElementById(
            "inputFileGaleri2"
          ) as HTMLInputElement;
          const fileInput3 = document.getElementById(
            "inputFileGaleri3"
          ) as HTMLInputElement;
          const fileInput4 = document.getElementById(
            "inputFileGaleri4"
          ) as HTMLInputElement;
          if (fileInput1 || fileInput2 || fileInput3 || fileInput4) {
            fileInput1.value = "";
            fileInput2.value = "";
            fileInput3.value = "";
            fileInput4.value = "";
          }
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
    getData();
  }, []);

  useEffect(() => {
    if (formData.mediaIdsToDelete.length > 0) {
      handleSubmit();
    }
  }, [formData.mediaIdsToDelete]);

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff", position: "relative" }}
    >
      {loading && (
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
      <div className="row">
        <div className="col-12">
          <div className="row mb-3">
            <div className="col-2 fw-bold">Nama</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{formData.name}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-bold">Deskripsi</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{formData.description}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-bold">Prioritas</div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">{formData.prioritas}</div>
          </div>
          <div className="row mb-3">
            <div className="col-2 fw-bold">Status </div>
            <div className="col-auto">:</div>
            <div className="col-9 fw-medium">
              {convertStatus(formData.status)}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="col-12">
        <div className="form-group mb-3">
          <label className="mb-2 fw-medium">Foto Galeri</label>
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
      </div>
      <div className="col-12">
        <div className="form-group mb-3">
          <button
            className="btn btn-primary bg-blue border-0"
            onClick={() => handleSubmit()}
          >
            Tambah
          </button>
        </div>
      </div>
      <StyleSheetManager>
        <DataTable
          columns={columns}
          data={mediaList}
          pagination
          highlightOnHover
          customStyles={{
            rows: {
              style: {
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  color: "#007bff",
                },
              },
            },
          }}
        />
      </StyleSheetManager>
    </div>
  );
};
