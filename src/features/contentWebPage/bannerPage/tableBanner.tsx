import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../../interface/banner.interface";
import BannerService from "../../../services/bannerService";
import { formatDateTime, showConfirmationDialog, Toast } from "../../../utils/myFunctions";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa6";

export const TableBanner: React.FC = () => {
  const bannerService = BannerService();
  const navigate = useNavigate();

  const [listBanner, setListBanner] = useState<Banner[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const getAllBanner = async () => {
    try {
      const response = await bannerService.getAllBanners();
      setListBanner(response.data);
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  const deleteBanner = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Banner ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true); // Set loading to true when deletion starts
      try {
        const response = await bannerService.deleteBanner(id);
        if (response.status === 200) {
          getAllBanner();
          Toast.fire({
            icon: "success",
            title: "Baner berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        console.error("Error deleting banner:", error);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus banner", "error");
      } finally {
        setLoading(false); // Set loading to false once the operation is complete
      }
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Banner, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Image",
      selector: (row: Banner) => row.banner.url,
      cell: (row: Banner) =>
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
      name: "Judul Banner",
      selector: (row: Banner) => row.title,
      sortable: true,
      cell: (row: Banner) => row.title,
    },
    {
      name: "Prioritas",
      selector: (row: Banner) => row.prioritas,
      sortable: true,
    },
    {
      name: "Dibuat Pada",
      selector: (row: Banner) => formatDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: Banner) => row.title,
      cell: (row: Banner) => (
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
            onClick={() => deleteBanner(row.id)}
            disabled={loading} 
          >
              <FaTrash />
          </button>
        </>
      ),
    },
  ];

  const filteredBanner = listBanner.filter((banner) =>
    banner.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllBanner();
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
          data={filteredBanner}
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
