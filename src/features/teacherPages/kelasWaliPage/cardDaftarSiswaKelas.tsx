import React, { useState } from "react";
import { StudentDetail } from "../../../interface/student.interface";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa6";
import { formatGender } from "../../../utils/myFunctions";
import { CardProfil } from "../../staffPages/managementSiswaPage/dataSiswaPage/cardProfil";
import noPhotoFemale from "./../../../assets/images/profile-female.jpg";
import noPhotoMale from "./../../../assets/images/profile-male.jpg";
import { CardDataAkademik } from "../../../components/cardDataAkademik";
import { CardDataOrangTua } from "../../../components/cardDataOrangTua";
import moment from "moment";
import { CardNilaiKelas } from "./cardNilaiKelas";
import { Class } from "../../../interface/studentClass.interface";

interface CardProps {
  loading: boolean;
  data: Class;
  refreshData: () => void;
}

export const CardDaftarSiswaKelas: React.FC<CardProps> = ({
  loading,
  data,
}) => {
  // console.log("class",data);
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail | null>(
    null
  );
  const [activeMenu, setActiveMenu] = useState("data-akademik");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const columns = [
    {
      name: "No",
      cell: (_row: StudentDetail, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nim",
      selector: (row: StudentDetail) => row.nis,
      cell: (row: StudentDetail) => row.nis,
      width: "100px",
    },
    {
      name: "Nama",
      selector: (row: StudentDetail) => row.name,
      cell: (row: StudentDetail) => row.name,
    },
    {
      name: "No.Telp",
      selector: (row: StudentDetail) => row.phone,
      sortable: true,
      cell: (row: StudentDetail) => row.phone,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row: StudentDetail) => row.email,
      sortable: true,
      cell: (row: StudentDetail) => row.email,
    },
    {
      name: "Action",
      cell: (row: StudentDetail) => (
        <>
          <div className="text-center w-100">
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalDetailSiswa"
              className="btn btn-info btn-sm text me-2 text-light"
              onClick={() => setSelectedStudent(row)}
              disabled={loading}
            >
              <FaEye />
            </button>
          </div>
        </>
      ),
      width: "100px",
    },
  ];

  const filteredData =
    data?.student.filter((dt) =>
      dt.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
      <div className="row g-3 d-flex justify-content-between">
        <div className="col-12">
          <div className="fw-bold position-relative pb-2">
            Daftar Siswa
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
          <button className="btn border-success text-success">
            Export to Excel
          </button>
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
      <div className="col-12">
        <div className="pt-2">
          Total : <span className="fw-bold">{data.student.length}</span>
        </div>
      </div>

      <div className="col-12">
        <DataTable
          columns={columns}
          data={searchTerm ? filteredData : data.student || []}
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
      {/* Modal */}
      <div
        className="modal fade"
        id="modalDetailSiswa"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="row mx-0 pb-4">
              <div className="col p-2 text-start py-3 px-3">
                <div className="fw-bold position-relative pb-2 fs-5">
                  Detail Siswa
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
            <div className="modal-body">
              {selectedStudent && (
                <>
                  <CardProfil
                    id={selectedStudent?.id || 0}
                    photo={
                      (selectedStudent?.photo && selectedStudent?.photo.url) ||
                      (selectedStudent?.gender === "L"
                        ? noPhotoMale
                        : noPhotoFemale)
                    }
                    name={selectedStudent?.name || ""}
                    nis={selectedStudent?.nis || ""}
                    nisn={selectedStudent?.nisn || ""}
                    email={selectedStudent?.email || ""}
                    phone={selectedStudent?.phone || ""}
                    address={selectedStudent?.address || ""}
                    gender={formatGender(selectedStudent?.gender || "-")}
                    birthPlace={selectedStudent?.birthPlace || ""}
                  />
                  <div className="m-lg-4 m-md-4 my-4 rounded">
                    <ul
                      className="nav nav-underline"
                      style={{ borderBottom: "0.5px solid grey" }}
                    >
                      <li className="nav-item" style={{ cursor: "pointer" }}>
                        <a
                          className={`nav-link ${
                            activeMenu === "data-akademik"
                              ? "active text-blue"
                              : "text-dark"
                          }`}
                          onClick={() => handleMenuClick("data-akademik")}
                        >
                          Data Akademik
                        </a>
                      </li>
                      <li className="nav-item" style={{ cursor: "pointer" }}>
                        <a
                          className={`nav-link ${
                            activeMenu === "data-orang-tua"
                              ? "active text-blue"
                              : "text-dark"
                          }`}
                          onClick={() => handleMenuClick("data-orang-tua")}
                        >
                          Data Orang Tua
                        </a>
                      </li>
                      <li className="nav-item" style={{ cursor: "pointer" }}>
                        <a
                          className={`nav-link ${
                            activeMenu === "nilai-siswa"
                              ? "active text-blue"
                              : "text-dark"
                          }`}
                          onClick={() => handleMenuClick("nilai-siswa")}
                        >
                          Nilai Siswa
                        </a>
                      </li>
                      <li className="nav-item" style={{ cursor: "pointer" }}>
                        <a
                          className={`nav-link ${
                            activeMenu === "absensi"
                              ? "active text-blue"
                              : "text-dark"
                          }`}
                          onClick={() => handleMenuClick("absensi")}
                        >
                          Absensi
                        </a>
                      </li>
                      <li className="nav-item" style={{ cursor: "pointer" }}>
                        <a
                          className={`nav-link ${
                            activeMenu === "hasil-raport"
                              ? "active text-blue"
                              : "text-dark"
                          }`}
                          onClick={() => handleMenuClick("hasil-raport")}
                        >
                          Hasil Raport
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="m-1 m-lg-4 m-md-4 my-4 rounded"
                    style={{
                      backgroundColor: "#fff",
                      position: "relative",
                      minHeight: "450px",
                    }}
                  >
                    {activeMenu === "data-akademik" ? (
                      <CardDataAkademik
                        kelas={selectedStudent?.class.name || "-"}
                        major={selectedStudent?.Major.name || "-"}
                        startYear={
                          moment(selectedStudent?.startYear)
                            .year()
                            .toString() || ""
                        }
                        studentStatus={selectedStudent?.status || ""}
                      />
                    ) : activeMenu === "data-orang-tua" ? (
                      <CardDataOrangTua
                        nis={parseInt(selectedStudent!.nis)}
                        fatherName={
                          (selectedStudent?.ParentOfStudent[0] &&
                            selectedStudent?.ParentOfStudent[0].fatherName) ||
                          "-"
                        }
                        motherName={
                          (selectedStudent?.ParentOfStudent[0] &&
                            selectedStudent?.ParentOfStudent[0].motherName) ||
                          "-"
                        }
                        phone={
                          (selectedStudent?.ParentOfStudent[0] &&
                            selectedStudent?.ParentOfStudent[0].phone) ||
                          "-"
                        }
                        parentJob={
                          (selectedStudent?.ParentOfStudent[0] &&
                            selectedStudent?.ParentOfStudent[0].parentJob) ||
                          ""
                        }
                        parentAddress={
                          (selectedStudent?.ParentOfStudent[0] &&
                            selectedStudent?.ParentOfStudent[0]
                              .parentAddress) ||
                          "-"
                        }
                      />
                    ) : activeMenu === "nilai-siswa" ? (
                      <CardNilaiKelas
                        loading={loading}
                        data={data!}
                      />
                    ) : (
                      <div>Halaman tidak ditemukan</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
