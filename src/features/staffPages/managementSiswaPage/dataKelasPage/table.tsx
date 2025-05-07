import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa6";
import ClassStudentService from "../../../../services/classStudentService";
import { Class } from "../../../../interface/studentClass.interface";
import { convertStatusClass } from "../../../../utils/myFunctions";

export const Table: React.FC = () => {
  const classService = ClassStudentService();
  const navigate = useNavigate();

  const [data, setData] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await classService.getAllClass();
      if (response.data && response.data.length > 0) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching Class data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Class, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Jumlah Siswa",
      selector: (row: Class) => row.student.length,
      sortable: true,
      cell: (row: Class) => (
        <div className="d-flex m-auto">{row.student.length}</div>
      ),
      width: "140px",
    },
    {
      name: "Tahun Ajaran",
      selector: (row: Class) => row.academicYear,
      sortable: true,
      cell: (row: Class) => row.academicYear,
      width: "150px",
    },
    {
      name: "Kelas",
      selector: (row: Class) => row.name,
      sortable: true,
      cell: (row: Class) => row.name,
      width: "100px",
    },
    // {
    //   name: "Kapasitas",
    //   selector: (row: Class) => row.capacity,
    //   sortable: true,
    //   cell: (row: Class) => (
    //     <div className="w-100 text-center">{row.capacity}</div>
    //   ),
    //   width: "120px",
    // },
    {
      name: "Wali Kelas",
      selector: (row: Class) => row.homeRoomTeacher.name,
      sortable: true,
      cell: (row: Class) => row.homeRoomTeacher.name,
      // width: "100px",
    },
    {
      name: "Status",
      selector: (row: Class) => row.status,
      sortable: true,
      cell: (row: Class) => (
        <div className="w-100 text-center">
          {convertStatusClass(row.status)}
        </div>
      ),
      width: "100px",
    },
    {
      name: "Action",
      cell: (row: Class) => (
        <>
          <button
            className="btn btn-info btn-sm text me-2 text-light"
            onClick={() => navigate(`detail/${row.id}`)}
            disabled={loading}
          >
            <FaEye />
          </button>
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            onClick={() => navigate(`update/${row.id}`)}
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

        <div className="row g-3 d-flex justify-content-end">
          <div className="col-12"></div>
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
      </div>
    </>
  );
};
