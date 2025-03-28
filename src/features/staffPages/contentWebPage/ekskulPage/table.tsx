import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { formatDateTime, showConfirmationDialog, Toast } from "../../../../utils/myFunctions";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa6";
import { Fajusek } from "../../../../interface/fajusek.interfase";
import { useNavigate } from "react-router-dom";
import EkskulService from "../../../../services/ekskulService";

export const Table: React.FC = () => {
  const ekskulService = EkskulService();
  const navigate = useNavigate();

  const [data, setData] = useState<Fajusek[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const getData = async () => {
    setLoading(true);
    try {
      const response = await ekskulService.all();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally {
      setLoading(false); 
    }
  };

  const handleDelete = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Ekskul ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true); // Set loading to true when deletion starts
      try {
        const response = await ekskulService.destroy(id);
        if (response.status === 200) {
          getData();
          Toast.fire({
            icon: "success",
            title: "Ekskul berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        console.error("Error deleting Ekskul:", error);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus Ekskul", "error");
      } finally {
        setLoading(false); // Set loading to false once the operation is complete
      }
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Fajusek, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row: Fajusek) => row.name,
    },
    {
      name: "Prioritas",
      selector: (row: Fajusek) => row.prioritas,
      sortable: true,
    },
    {
      name: "Dibuat Pada",
      selector: (row: Fajusek) => formatDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: Fajusek) => row.name,
      cell: (row: Fajusek) => (
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
