import React from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { IStudyTracer } from "../../../../interface/studyTracer.interface";
import { useNavigate } from "react-router-dom";
import { convertStatusStudyTracer } from "../../../../utils/myFunctions";

type TableStudyTracerProps = {
  loading: boolean;
  data: IStudyTracer[];
  keySearch: string;
  handleChangekeySearch: (keySearch: string) => void;
  handleDetelete: (id: number) => void;
};

export const TableStudyTracer: React.FC<TableStudyTracerProps> = ({
  loading,
  data,
  keySearch,
  handleChangekeySearch,
  handleDetelete,
}) => {
  const navigate = useNavigate();

  const columns = [
    {
      name: "No",
      cell: (_row: IStudyTracer, index: number) => (
        <div className="w-100 text-center">{index + 1}</div>
      ),
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row: IStudyTracer) => row.name,
      sortable: true,
      cell: (row: IStudyTracer) => row.name,
    },
    {
      name: "Gender",
      selector: (row: IStudyTracer) => row.gender,
      sortable: true,
      cell: (row: IStudyTracer) => (
        <div className="w-100 text-center">{row.gender}</div>
      ),
      width: "140px",
    },
    {
      name: "No. Telp",
      selector: (row: IStudyTracer) => row.phone,
      sortable: true,
      cell: (row: IStudyTracer) => row.phone,
      width: "140px",
    },
    {
      name: "Tamatan",
      selector: (row: IStudyTracer) => row.endYear,
      sortable: true,
      cell: (row: IStudyTracer) => (
        <div className="w-100 text-center">{row.endYear}</div>
      ),
      width: "120px",
    },
    {
      name: "Status",
      selector: (row: IStudyTracer) => row.employmentStatus,
      sortable: true,
      cell: (row: IStudyTracer) => row.employmentStatus,
      width: "140px",
    },
    {
      name: "Persetujuan",
      selector: (row: IStudyTracer) => row.statusApprove,
      sortable: true,
      cell: (row: IStudyTracer) => (
        <div className="w-100 text-center">
          {convertStatusStudyTracer(row.statusApprove)}
        </div>
      ),
      width: "140px",
    },
    {
      name: "Action",
      selector: (row: IStudyTracer) => row.name,
      cell: (row: IStudyTracer) => (
        <>
          <button
            className="btn btn-info btn-sm text me-2 text-light"
            onClick={() => navigate(`detail/${row.id}`)}
            disabled={loading}
          >
            <FaEye />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDetelete(row.id!)}
            disabled={loading}
          >
            <FaTrash />
          </button>
        </>
      ),
      width: "100px",
    },
  ];

  const filteredST = data.filter((st) =>
    st.name.toLowerCase().includes(keySearch.toLowerCase())
  );

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
            value={keySearch}
            onChange={(e) => handleChangekeySearch(e.target.value)}
            style={{ fontSize: "1.1em" }}
          />
        </div>
      </div>

      <StyleSheetManager>
        <DataTable
          columns={columns}
          data={filteredST}
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
