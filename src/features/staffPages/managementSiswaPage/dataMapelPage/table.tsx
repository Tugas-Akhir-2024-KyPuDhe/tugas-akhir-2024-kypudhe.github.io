import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa6";
import StudentService from "../../../../services/courseService";
import { Course } from "../../../../interface/course.interface";
import { convertStatus } from "../../../../utils/myFunctions";
import noimage from "./../../../../assets/images/no-img.jpg";
import { exportToExcelDaftarMapel } from "../../../../utils/printDocument/daftarMapel/ExcelDaftarMapel";
import { exportToPDFDaftarMapel } from "../../../../utils/printDocument/daftarMapel/PDFDaftarMapel";

export const Table: React.FC = () => {
  const courseService = StudentService();
  const navigate = useNavigate();

  const [data, setData] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedData, setselectedData] = useState<Course>();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await courseService.getAllCourses("", "All");
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
      cell: (_row: Course, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Kode Mapel",
      selector: (row: Course) => row.code,
      sortable: true,
      cell: (row: Course) => row.code,
      width: "130px",
    },
    {
      name: "Nama Mapel",
      selector: (row: Course) => row.name,
      sortable: true,
      cell: (row: Course) => row.name,
    },
    {
      name: "Tingkat",
      selector: (row: Course) => row.grade,
      sortable: true,
      cell: (row: Course) => row.grade,
      width: "100px",
    },
    {
      name: "Status",
      selector: (row: Course) => row.status,
      sortable: true,
      cell: (row: Course) => convertStatus(row.status),
      width: "100px",
    },
    {
      name: "Action",
      cell: (row: Course) => (
        <>
          <button
            className="btn btn-info btn-sm text me-2 text-light"
            onClick={() => setselectedData(row)}
            disabled={loading}
            data-bs-toggle="modal"
            data-bs-target="#modalDetailData"
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

        <div className="row g-3 d-flex justify-content-between">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Data Mapel
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
            <div className="btn-group">
              <div className="dropdown">
                <button
                  className="btn border-success text-success dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Export Data
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => exportToExcelDaftarMapel(data, "---")}
                    >
                      Excel
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => exportToPDFDaftarMapel(data, "---")}
                      className="dropdown-item"
                    >
                      PDF
                    </button>
                  </li>
                </ul>
              </div>
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
          <div className="col-12">
            <div className="">
              Total : <span className="fw-bold">{data.length}</span>
            </div>
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

      {/* MODAL DETAIL DATA */}
      <div
        className="modal fade modal-lg p-0"
        id="modalDetailData"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="row mx-0 pb-4">
              <div className="col p-2 text-start py-3 px-3">
                <div className="fw-bold position-relative pb-2 fs-5">
                  Detail Mata Pelajaran
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
              <div className="col-auto p-2 text-start py-3 px-3">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body py-0">
              {selectedData && (
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="mb-3">
                      <label className="" style={{ fontWeight: 600 }}>
                        Gambar
                      </label>
                      <div className="fw-medium">
                        <img
                          src={selectedData.image?.url || noimage}
                          alt=""
                          style={{ width: "500px" }}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-8">
                    <div className="mb-3">
                      <label className="" style={{ fontWeight: 600 }}>
                        Kode Mapel
                      </label>
                      <div className="fw-medium">{selectedData.code}</div>
                    </div>
                    <div className="mb-3">
                      <label className="" style={{ fontWeight: 600 }}>
                        Nama Mapel
                      </label>
                      <div className="fw-medium">{selectedData.name}</div>
                    </div>
                    <div className="mb-3">
                      <label className="" style={{ fontWeight: 600 }}>
                        Deskripsi
                      </label>
                      <div className="fw-medium">
                        {selectedData.description || "-"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="" style={{ fontWeight: 600 }}>
                            Status
                          </label>
                          <div className="fw-medium">
                            {convertStatus(selectedData.status)}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-3">
                          <label className="" style={{ fontWeight: 600 }}>
                            Tingkat Kelas
                          </label>
                          <div className="fw-medium">{selectedData.grade}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
