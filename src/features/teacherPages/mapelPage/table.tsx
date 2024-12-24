import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import {
  formatDateTime,
  showConfirmationDialog,
  Toast,
} from "../../../utils/myFunctions";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa6";

interface Mapel {
  name: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  createdAt: string;
}

export const Table: React.FC = () => {
  const [data, setData] = useState<Mapel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const getData = async () => {
    try {
      // const response = await jurusanService.all();
      // setData(response.data);

      setData([
        {
          name: "Matematika",
          hari: "Senin",
          jam_mulai: "10:00",
          jam_selesai: "12:00",
          createdAt: new Date().toString(),
        },
        {
          name: "Bahasa",
          hari: "Selasa",
          jam_mulai: "10:00",
          jam_selesai: "12:00",
          createdAt: new Date().toString(),
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (mapel: Mapel) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Mata Pelajaran ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    console.log(mapel);

    if (result.isConfirmed) {
      setLoading(true); // Set loading to true when deletion starts
      try {
        // const response = await jurusanService.destroy(id);
        // if (response.status === 200) {
        //   getData();
        Toast.fire({
          icon: "success",
          title: "Mata Pelajaran berhasil dihapus",
          timer: 4000,
        });
        // }
      } catch (error) {
        console.error("Error deleting Mata Pelajaran:", error);
        Swal.fire(
          "Gagal",
          "Terjadi kesalahan saat menghapus Mata Pelajaran",
          "error"
        );
      } finally {
        setLoading(false); // Set loading to false once the operation is complete
      }
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Mapel, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row: Mapel) => row.name,
    },
    {
      name: "Hari",
      selector: (row: Mapel) => row.hari,
      sortable: true,
    },
    {
      name: "Jam Mulai",
      selector: (row: Mapel) => row.jam_mulai,
      sortable: true,
    },
    {
      name: "Jam Selesai",
      selector: (row: Mapel) => row.jam_selesai,
      sortable: true,
    },
    {
      name: "Dibuat Pada",
      selector: (row: Mapel) => formatDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: Mapel) => row.name,
      cell: (row: Mapel) => (
        <>
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            // onClick={() => navigate(`update/${row.id}`)}
            disabled={loading}
          >
            <FaPen />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row)}
            disabled={loading}
          >
            <FaTrash />
          </button>
        </>
      ),
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
            className="form-control border-dark"
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
