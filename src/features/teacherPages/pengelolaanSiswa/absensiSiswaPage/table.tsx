import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { formatDateTime } from "../../../../utils/myFunctions";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface Absensi {
  name: string,
  mata_pelajaran: string,
  hari: string,
  createdAt: string
}

export const Table: React.FC = () => {
  const [data, setData] = useState<Absensi[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const navigate = useNavigate()

  const getData = async () => {
    setLoading(true)
    try {
      // const response = await jurusanService.all();
      // setData(response.data);

      setData([
        {
          name: 'X TKJ 1',
          mata_pelajaran: 'Matematika',
          hari: 'Senin',
          createdAt: new Date().toString(),
        },
        {
          name: 'XI TKJ 1',
          mata_pelajaran: 'Bahasa',
          hari: 'Selasa',
          createdAt: new Date().toString(),
        },
      ])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false)
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Absensi, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nama Kelas",
      selector: (row: Absensi) => row.name,
      sortable: true,
    },
    {
      name: "Mata Pelajaran",
      selector: (row: Absensi) => row.mata_pelajaran,
      sortable: true,
    },
    {
      name: "Hari",
      selector: (row: Absensi) => row.hari,
      sortable: true,
    },
    {
      name: "Dibuat Pada",
      selector: (row: Absensi) => formatDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: Absensi) => row.name,
      cell: (row: Absensi) => (
        <>
          <button
            className="btn btn-info"
            onClick={() => navigate(`${row.name}`)}
            disabled={loading} 
          >
              <FaEye />
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
