import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa6";
import Select from "react-select";
import JurusanService from "../../../../services/jurusanService";
import { Fajusek } from "../../../../interface/fajusek.interfase";
import StudentService from "../../../../services/studentService";
import { StudentDetail } from "../../../../interface/student.interface";
import { optionsGrade } from "../../../../utils/optionsData";

export const Table: React.FC = () => {
  const studentService = StudentService();
  const jurusanService = JurusanService();
  const navigate = useNavigate();

  const [data, setData] = useState<StudentDetail[]>([]);
  const [dataMajor, setDataMajor] = useState<Fajusek[]>([]);
  const [selectedMajor, setSelectedtedMajor] = useState<{
    value: string;
  }>();
  const [selectedGrade, setSelectedtedGrade] = useState<{
    value: string;
  }>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await studentService.getAllStudent(
        selectedMajor?.value,
        selectedGrade?.value
      );

      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching Student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMajor = async () => {
    setLoading(true);
    try {
      const response = await jurusanService.all();
      setDataMajor(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const optionsMajor = [
    { value: "", label: "Semua Jurusan" },
    ...dataMajor.map((data) => ({
      value: data.majorCode,
      label: data.majorCode,
    })),
  ];

  const optionsGrades = [
    { value: "", label: "Semua Kelas" },
    ...optionsGrade.map((data) => ({
      value: data.value,
      label: data.label,
    })),
  ];

  const columns = [
    {
      name: "No",
      cell: (_row: StudentDetail, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row: StudentDetail) => row.name,
      sortable: true,
      cell: (row: StudentDetail) => row.name,
    },
    {
      name: "NIS",
      selector: (row: StudentDetail) => row.nis,
      sortable: true,
      cell: (row: StudentDetail) => row.nis,
      width: "100px",
    },
    {
      name: "NISN",
      selector: (row: StudentDetail) => row.nisn,
      sortable: true,
      cell: (row: StudentDetail) => row.nisn,
      width: "100px",
    },
    {
      name: "Jurusan",
      selector: (row: StudentDetail) => row.Major.majorCode,
      sortable: true,
      cell: (row: StudentDetail) => <div className="w-100 text-center">{row.Major.majorCode}</div>,
      width: "100px",
    },
    {
      name: "Kelas",
      selector: (row: StudentDetail) => {
        if (row.status === "New") return "Siswa Baru";
        if (row.status === "Lulus") return "Lulus";
        return row.class?.name?.split("-")[0] || "";
      },
      sortable: true,
      cell: (row: StudentDetail) => {
        if (row.status === "New") {
          return <div className="text-blue w-100 text-center fw-bold">Siswa Baru</div>;
        }
        if (row.status === "Lulus") {
          return <div className="text-green w-100 text-center fw-bold">Lulus</div>;
        }
        return row.class?.name?.split("-")[0] || "";
      },
      width: "100px",
    },
    {
      name: "No.Telp",
      selector: (row: StudentDetail) => row.phone,
      sortable: true,
      cell: (row: StudentDetail) => row.phone,
      width: "120px",
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
        <div className="w-100 text-center">
          <button
            className="btn btn-info btn-sm text me-2 text-light"
            onClick={() => navigate(`detail/${row.nis}`)}
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
        </div>
      ),
      width: "120px",
    },
  ];

  const filterData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange = async (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    if (selectedOption) {
      if (name == "gradeSort") setSelectedtedGrade(selectedOption);
      else if (name == "majorSort") setSelectedtedMajor(selectedOption);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedGrade]);

  useEffect(() => {
    getData();
  }, [selectedMajor]);

  useEffect(() => {
    getMajor();
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
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-12 col-md-5">
                <Select
                  options={optionsMajor}
                  value={selectedMajor}
                  onChange={(option) => handleSelectChange("majorSort", option)}
                  placeholder="Pilih Jurusan"
                  className="form-control-lg px-0 pt-0"
                  isSearchable={false}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: "0.955rem",
                      // minHeight: "48px",
                      borderRadius: "8px",
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                  }}
                />
              </div>
              <div className="col-12 col-md-5">
                <Select
                  options={optionsGrades}
                  value={selectedGrade}
                  onChange={(option) => handleSelectChange("gradeSort", option)}
                  placeholder="Pilih Kelas"
                  className="form-control-lg px-0 pt-0"
                  isSearchable={false}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: "0.955rem",
                      // minHeight: "48px",
                      borderRadius: "8px",
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 col-md-3">
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
          Total : <span className="fw-bold">{data.length}</span>
        </div>
        <DataTable
          columns={columns}
          data={filterData}
          pagination
          paginationRowsPerPageOptions={[80, 100, 150]}
          paginationPerPage={80}
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
