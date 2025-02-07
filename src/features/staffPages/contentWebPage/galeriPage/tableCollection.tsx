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
import { AxiosError } from "axios";
import { FaPlus } from "react-icons/fa6";
import { ModalAddGaleri } from "./modalAddCollGaleri";

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
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          Toast.fire({
            icon: "error",
            title: `Data Tidak Ditemukan!`,
            timer: 4000,
          });
        }
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

  const handleDeleteMedia = async (mediaId: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus galeri ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await galeriService.deleteMediaGaleri(mediaId);

        if (response.status === 200) {
          await getData();
          Toast.fire({
            icon: "success",
            title: `Media berhasil dihapus`,
            timer: 4000,
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          return Toast.fire({
            icon: "error",
            title: `Data Tidak Ditemukan!`,
            timer: 4000,
          });
        }
        Toast.fire({
          icon: "error",
          title: `Terjadi kesalahan ketika hapus media!`,
          timer: 4000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
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
        <div className="row g-3">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Detail Galeri
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
          <div className="col-12">
            <div className="row mb-3">
              <div className="col-2 fw-medium">Nama</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{formData.name}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Deskripsi</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{formData.description}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Prioritas</div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">{formData.prioritas}</div>
            </div>
            <div className="row mb-3">
              <div className="col-2 fw-medium">Status </div>
              <div className="col-auto">:</div>
              <div className="col-9 fw-medium">
                {convertStatus(formData.status)}
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="row g-3">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Tambah Galeri
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
          <div className="col-12">
            <button
              className="btn border-blue text-blue"
              data-bs-toggle="modal"
              data-bs-target="#modalAddGaleri"
            >
              <FaPlus className="me-2 fs-5" /> Tambah
            </button>
            {formData.id && (
              <ModalAddGaleri
                id={formData.id}
                name={formData.name}
                description={formData.description}
                prioritas={formData.prioritas}
                status={formData.status}
                handleGetDataGaleri={getData}
              />
            )}
          </div>
          <StyleSheetManager>
            <DataTable
              columns={columns}
              data={mediaList}
              pagination
              highlightOnHover
              className="mt-3"
              customStyles={{
                rows: {
                  style: {
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      color: "#007bff",
                    },
                  },
                },
                headCells: {
                  style: {
                    backgroundColor: "var(--blue-color)",
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "0.1px solid #ddd",
                  },
                },
              }}
            />
          </StyleSheetManager>
        </div>
      </div>
    </>
  );
};
