import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  convertStatus,
  formatDateTime,
  showConfirmationDialog,
  Toast,
} from "../../../../utils/myFunctions";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa6";
import { ISchoolYear } from "../../../../interface/schoolYear.interface";
import SchoolYearService from "../../../../services/schoolYearService";
import { AxiosError } from "axios";

export const TableSchoolYear: React.FC = () => {
  const schoolYearService = SchoolYearService();
  const navigate = useNavigate();

  const [data, setData] = useState<ISchoolYear[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await schoolYearService.getAllSchoolYears();
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSchoolYear = async (id: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Tahun Ajaran ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await schoolYearService.deleteSchoolYear(id);
        if (response.status === 200) {
          await getData();
          Toast.fire({
            icon: "success",
            title: "Tahun ajaran berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 409) {
          return Toast.fire({
            icon: "error",
            title: `Gagal, Tahun ajaran masih aktif!`,
            timer: 4000,
          });
        }
        console.error("Error deleting tahun ajaran:", error);
        Swal.fire(
          "Gagal",
          "Terjadi kesalahan saat menghapus tahun ajaran",
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
      cell: (_row: ISchoolYear, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Tahun Ajaran",
      selector: (row: ISchoolYear) => row.name,
      sortable: true,
      cell: (row: ISchoolYear) => row.name,
    },
    {
      name: "Dibuat Oleh",
      selector: (row: ISchoolYear) => row.createdBy,
      sortable: true,
      width: "170px",
    },
    {
      name: "Dibuat Pada",
      selector: (row: ISchoolYear) => formatDateTime(row.createdAt),
      sortable: true,
      width: "170px",
    },
    {
      name: "Status",
      selector: (row: ISchoolYear) => row.status,
      cell: (row: ISchoolYear) => (
        <div className="text-center w-100">{convertStatus(row.status)}</div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Action",
      selector: (row: ISchoolYear) => row.name,
      cell: (row: ISchoolYear) => (
        <div className="text-center w-100">
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.id}`)}
            disabled={loading}
          >
            <FaPen />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteSchoolYear(row.id)}
            disabled={loading}
          >
            <FaTrash />
          </button>
        </div>
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
