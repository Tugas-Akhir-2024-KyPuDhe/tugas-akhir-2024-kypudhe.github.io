import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa6";
import StaffService from "../../../../services/staffService";
import { StaffDetail } from "../../../../interface/staff.interface";

export const Table: React.FC = () => {
  const staffService = StaffService();
  const navigate = useNavigate();

  const [data, setData] = useState<StaffDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await staffService.getStaff("");
      if (response.data && response.data.length > 0) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching Staff data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const columns = [
    {
      name: "No",
      cell: (_row: StaffDetail, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "NIP",
      selector: (row: StaffDetail) => row.nip,
      sortable: true,
      cell: (row: StaffDetail) => row.nip,
      width: "100px",
    },
    {
      name: "Nama",
      selector: (row: StaffDetail) => row.name,
      sortable: true,
      cell: (row: StaffDetail) => row.name,
    },
    
    {
      name: "Status Pegawai",
      selector: (row: StaffDetail) => row.type,
      sortable: true,
      cell: (row: StaffDetail) => row.type,
      width: "150px",
    },
    {
      name: "Jabatan Tambahan",
      selector: (row: StaffDetail) => row.position!,
      sortable: true,
      cell: (row: StaffDetail) => row.position!,
      width: "170px",
    },
    {
      name: "Mapel",
      selector: (row: StaffDetail) => row.position!,
      sortable: true,
      cell: (row: StaffDetail) => row.position!,
      width: "120px",
    },
    {
      name: "Action",
      cell: (row: StaffDetail) => (
        <>
          <button
            className="btn btn-info btn-sm text me-2 text-light"
            onClick={() => navigate(`detail/${row.nip}`)}
            disabled={loading}
          >
            <FaEye />
          </button>
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.nip}`)}
            disabled={loading}
          >
            <FaPen />
          </button>
        </>
      ),
      width: "150px",
    },
  ];

  const filterData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getData();
    // getMajor();
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

        <div className="row g-3 d-flex justify-content-end">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Staff
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
          <div className="col-6 col-lg-3 col-md-3">
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
        <div className="row g-2">
          <div className="col-12">
            Total : <span className="fw-bold">{data.length}</span>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filterData}
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
      </div>
    </>
  );
};
