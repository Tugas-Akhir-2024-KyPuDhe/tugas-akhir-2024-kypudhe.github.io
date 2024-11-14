import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa6";
import AuthService from "../../../../services/authService";
import { StudentDetails, UserDataResponse } from "../../../../interface/auth.interface";

export const Table: React.FC = () => {
  const userService = AuthService();
  const navigate = useNavigate();

  const [data, setData] = useState<StudentDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response: UserDataResponse<StudentDetails> = await userService.getUsers("STUDENT");
      if (response.data && response.data.length > 0) {
        setData(response.data); 
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: StudentDetails, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row: StudentDetails) => row.name,
      sortable: true,
      cell: (row: StudentDetails) => row.name,
    },
    {
      name: "NIS",
      selector: (row: StudentDetails) => row.nis,
      sortable: true,
      cell: (row: StudentDetails) => row.nis,
      width: "100px",
    },
    {
      name: "NISN",
      selector: (row: StudentDetails) => row.nisn,
      sortable: true,
      cell: (row: StudentDetails) => row.nisn,
      width: "100px",
    },
    {
      name: "No.Telp",
      selector: (row: StudentDetails) => row.phone,
      sortable: true,
      cell: (row: StudentDetails) => row.phone,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row: StudentDetails) => row.email,
      sortable: true,
      cell: (row: StudentDetails) => row.email,
    },
    {
      name: "Action",
      cell: (row: StudentDetails) => (
        <>
          <button
            className="btn btn-info btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.nis}`)}
            disabled={loading}
          >
            <FaEye />
          </button>
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.nis}`)}
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
  );
};
