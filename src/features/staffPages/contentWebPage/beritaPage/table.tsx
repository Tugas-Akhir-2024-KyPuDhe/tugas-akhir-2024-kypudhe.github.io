import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  convertStatusBerita,
  formatDateTime,
  showConfirmationDialog,
  Toast,
} from "../../../../utils/myFunctions";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import ArtikelService from "../../../../services/artikelService";
import { Artikel } from "../../../../interface/artikel.interface";
import { AxiosError } from "axios";

export const Table: React.FC = () => {
  const beritaService = ArtikelService();
  const navigate = useNavigate();

  const [data, setData] = useState<Artikel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await beritaService.getAllArtikels("no");
      if (response.data.length > 0) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBerita = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Berita ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await beritaService.deleteArtikel(id);
        if (response.status === 200) {
          getData();
          Toast.fire({
            icon: "success",
            title: "Berita berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 403) {
          Toast.fire({
            icon: "error",
            title: `Hanya bisa menghapus berita yang tidak aktif saja!`,
            timer: 5000,
          });
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Artikel, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Cover",
      selector: (row: Artikel) => row.banner.url,
      cell: (row: Artikel) =>
        row.banner ? (
          <img
            src={row.banner.url}
            alt={row.banner.url}
            width="100"
            className="py-3"
          />
        ) : (
          <span>No Image</span>
        ),
      width: "150px",
    },
    {
      name: "Judul Berita",
      selector: (row: Artikel) => row.title,
      sortable: true,
      cell: (row: Artikel) => row.title,
    },
    {
      name: "Kategori",
      selector: (row: Artikel) => row.category,
      sortable: true,
      cell: (row: Artikel) => row.category,
      width: "120px",
    },
    {
      name: "Dibuat Pada",
      selector: (row: Artikel) => formatDateTime(row.createdAt.toString()),
      sortable: true,
      width: "180px",
    },
    {
      name: "Status",
      selector: (row: Artikel) => row.status,
      sortable: true,
      cell: (row: Artikel) => convertStatusBerita(row.status),
      width: "100px",
    },
    {
      name: "Action",
      selector: (row: Artikel) => row.title,
      cell: (row: Artikel) => (
        <>
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.id}`)}
            disabled={loading}
          >
            <FaPen />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteBerita(row.id)}
            disabled={loading}
          >
            <FaTrash />
          </button>
        </>
      ),
      width: "150px",
    },
  ];

  const filteredData = data.filter((dt) =>
    dt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff", position: "relative" }}
    >
      {/* Show the loader overlay when loading */}
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

      <div className="row d-flex justify-content-end">
        <div className="col-12 col-lg-4 col-md-3">
          <input
            type="text"
            className="form-control py-2 border-dark"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: "1.1em" }}
          />
        </div>
      </div>

      <StyleSheetManager>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          paginationPerPage={30}
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
  );
};
