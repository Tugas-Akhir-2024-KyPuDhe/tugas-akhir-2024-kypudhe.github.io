import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import StaffService from "../../../../services/staffService";
import { CourseInClass } from "../../../../interface/courseInClass.interface";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useCookie from "react-use-cookie";
import { decodeToken } from "../../../../utils/myFunctions";

export const Table: React.FC = () => {
  const navigate = useNavigate();
  const teacherService = StaffService();
  const [data, setData] = useState<CourseInClass[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const getData = async () => {
    const dtoken = decodeToken(userLoginCookie.token);

    try {
      setLoading(true);
      const response = await teacherService.getClassOfTeacher(dtoken.username);
      setData(response.data.CourseInClass);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: CourseInClass, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "TA",
      selector: (row: CourseInClass) => row.class.academicYear,
      cell: (row: CourseInClass) => row.class.academicYear,
      sortable: true,
      width: "115px",
    },
    {
      name: "Kelas",
      selector: (row: CourseInClass) => row.class.name,
      cell: (row: CourseInClass) => row.class.name,
      sortable: true,
      width: "90px",
    },
    {
      name: "Mata Pelajaran",
      selector: (row: CourseInClass) => row.courseDetail.name,
      cell: (row: CourseInClass) => row.courseDetail.name,
      sortable: true,
    },
    {
      name: "Hari",
      selector: (row: CourseInClass) => row.day,
      cell: (row: CourseInClass) => row.day,
      sortable: true,
      width: "100px",
    },
    {
      name: "Mulai",
      selector: (row: CourseInClass) => row.timeStart,
      cell: (row: CourseInClass) => row.timeStart,
      sortable: true,
      width: "95px",
    },
    {
      name: "Selesai",
      selector: (row: CourseInClass) => row.timeEnd,
      cell: (row: CourseInClass) => row.timeEnd,
      sortable: true,
      width: "95px",
    },
    {
      name: (
        <>
          Total <br />
          Siswa
        </>
      ),
      selector: (row: CourseInClass) => row.class.student.length,
      cell: (row: CourseInClass) => (
        <>
          <div className="text-center w-100">{row.class.student.length}</div>
        </>
      ),
      sortable: true,
      width: "90px",
    },
    {
      name: "Action",
      cell: (row: CourseInClass) => (
        <>
          <button
            className="btn btn-info bg-blue border-0 me-2 text-light"
            onClick={() => navigate(`detail/${row.id}`)}
            disabled={loading}
            id="tooltip-detail"
          >
            <FaEye className="" style={{ fontSize: "0.8rem" }} />
            <Tooltip
              anchorSelect="#tooltip-detail"
              className="text-light"
              style={{ backgroundColor: "var(--blue-color)" }}
              content="Detail"
            />
          </button>
        </>
      ),
      width: "80px",
    },
  ];

  const filteredData = data?.filter((dt) =>
    dt.courseDetail.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    </div>
  );
};
