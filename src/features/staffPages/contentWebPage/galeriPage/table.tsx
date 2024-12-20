import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import {
  convertStatus,
  formatDateTime,
  showConfirmationDialog,
  Toast,
} from "../../../../utils/myFunctions";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import GaleriService from "../../../../services/galeriService";
import { Galeri } from "../../../../interface/galeri.interface";
import { BiSolidImageAdd } from "react-icons/bi";
import { FaPen } from "react-icons/fa6";

export const Table: React.FC = () => {
  const galeriService = GaleriService();
  const navigate = useNavigate();

  const [data, setData] = useState<Galeri[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const getData = async () => {
    setLoading(true);
    try {
      const response = await galeriService.getAllGaleri();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Galeri ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await galeriService.deleteGaleri(id);
        if (response.status === 200) {
          getData();
          Toast.fire({
            icon: "success",
            title: "Galeri berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        console.error("Error deleting fasilitas:", error);
        Swal.fire(
          "Gagal",
          "Terjadi kesalahan saat menghapus fasilitas",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Galeri, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Galeri",
      cell: (row: Galeri) => (
        <>
          <div className="text-center" onClick={() => navigate(`koleksi/${row.id}`)} style={{ cursor: "pointer" }}>
            <BiSolidImageAdd className="fs-2 text-blue" />
          </div>
        </>
      ),
      width: "70px",
    },
    {
      name: "Total",
      selector: (row: Galeri) => row.media.length,
      width: "70px",
    },
    {
      name: "Nama",
      selector: (row: Galeri) => row.name,
      width: "300px",
    },
    {
      name: "Prioritas",
      selector: (row: Galeri) => row.prioritas,
      sortable: true,
      width: "100px",
    },
    {
      name: "Status",
      selector: (row: Galeri) => row.status,
      sortable: true,
      cell: (row: Galeri) => convertStatus(row.status),
      width: "100px",
    },
    {
      name: "Dibuat Pada",
      selector: (row: Galeri) => formatDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: Galeri) => row.name,
      cell: (row: Galeri) => (
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
            onClick={() => handleDelete(row.id)}
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
    dt.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          data={searchTerm ? filteredData : data}
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
  );
};
