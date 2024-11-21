import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa6";
import Select from "react-select";
import JurusanService from "../../../../services/jurusanService";
import { Fajusek } from "../../../../interface/fajusek.interfase";
import Swal from "sweetalert2";
import StudentService from "../../../../services/studentService";
import { StudentDetail } from "../../../../interface/student.interface";
import ClassStudentService from "../../../../services/classStudentService";
import { Toast } from "../../../../utils/myFunctions";

export const Table: React.FC = () => {
  const studentService = StudentService();
  const jurusanService = JurusanService();
  const classStudentService = ClassStudentService();
  const navigate = useNavigate();

  const [data, setData] = useState<StudentDetail[]>([]);
  const [dataMajor, setDataMajor] = useState<Fajusek[]>([]);
  const [selectedMajor, setSelectedtedMajor] = useState<{
    value: string;
  }>();
  const [kapasitasPerKelas, setKapasitasPerKelas] = useState<number>(0);
  const [distribusiSiswa, setDistribusiSiswa] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (major?: string) => {
    setLoading(true);
    try {
      const response = await studentService.getNewStudent(major);
      if (response.data && response.data.length > 0) {
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
    { value: "", label: "Semua Jurusan" }, // opsi hardcode yang baru
    ...dataMajor.map((data) => ({
      value: data.majorCode,
      label: data.majorCode,
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
      cell: (row: StudentDetail) => row.Major.majorCode,
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
        <>
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
        </>
      ),
      width: "150px",
    },
  ];

  const filterData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange = async (
    selectedOption: { value: string } | null
  ) => {
    setDistribusiSiswa([]);
    if (selectedOption) {
      setSelectedtedMajor(selectedOption);
    }
    await getData(selectedOption?.value);
  };

  const handleKapasitasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const kapasitas = parseInt(e.target.value) || 0;
    if (selectedMajor?.value == undefined || selectedMajor?.value == "") {
      return Swal.fire("", "Harap Pilih Jurusan Terlebih Dahulu!", "warning");
    }
    if (kapasitas > data.length) {
      return Swal.fire(
        "",
        "Kapasitas yang anda masukkan lebihi jumlah siswa yang ada!",
        "warning"
      );
    }
    setKapasitasPerKelas(kapasitas);
    if (kapasitas > 0) {
      const totalSiswa = data.length; // Total siswa dari data
      let hitungKelas = Math.ceil(totalSiswa / kapasitas); // Hitung jumlah kelas awal
      const siswaTerakhir = totalSiswa % kapasitas; // Sisa siswa di kelas terakhir

      // Jika siswa di kelas terakhir terlalu sedikit, kurangi jumlah kelas
      if (
        hitungKelas > 1 &&
        siswaTerakhir > 0 &&
        siswaTerakhir <= kapasitas / 2
      ) {
        hitungKelas -= 1;
      }

      // Distribusi siswa ke setiap kelas
      const distribusi: number[] = Array(hitungKelas).fill(kapasitas); // Awalnya semua kelas kapasitas penuh
      const sisa = totalSiswa % kapasitas;

      if (sisa > 0) {
        distribusi[distribusi.length - 1] = sisa + kapasitas; // Tambahkan sisa ke kelas terakhir
      }
      setDistribusiSiswa(distribusi); // Simpan distribusi siswa
    } else {
      setDistribusiSiswa([]);
    }
  };

  useEffect(() => {
    getData();
    getMajor();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await classStudentService.createClassInvStudent(
        kapasitasPerKelas,
        selectedMajor?.value || ""
      );
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: `Kelas Berhasil Dibuat & Siswa Berhasil Masuk Kedalam nya`,
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: `${error}`,
      });
      console.error("Error processing banner:", error);
    }finally{
      setLoading(false);
    }
  };

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

        <div className="row g-2">
          <div className="col-12">
            <div className="fw-bold position-relative pb-2">
              Buat Kelas
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
          <div className="col-6 col-lg-3">
            <div className="fw-medium mt-2 m-auto">Jurusan :</div>
          </div>
          <div className="col-6 col-lg-9">
            <div className="" style={{ width: "200px" }}>
              <Select
                options={optionsMajor}
                value={selectedMajor}
                onChange={(option) => handleSelectChange(option)}
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
          </div>
          <div className="col-6 col-lg-3">
            <div className="fw-medium m-auto">Kapasitas Kelas :</div>
          </div>
          <div className="col-6 col-lg-9 d-flex">
            <div className="" style={{ width: "80px" }}>
              <input
                type="text"
                name="title"
                value={kapasitasPerKelas}
                onChange={handleKapasitasChange}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                className={`form-control text-center`}
                placeholder=""
              />
            </div>
            <span className="mt-2 ms-2">Siswa/Kelas</span>
          </div>
          <div className="col-6 col-lg-3">
            <div className="fw-medium">Total Siswa :</div>
          </div>
          <div className="col-6 col-lg-9">
            <span className="">{selectedMajor?.value && data.length}</span>
          </div>
          <div className="col-6 col-lg-3">
            <div className="fw-medium">Jurusan :</div>
          </div>
          <div className="col-6 col-lg-9">
            <span className="">{selectedMajor?.value || ""}</span>
          </div>
          <div className="col-6 col-lg-3">
            <div className="fw-medium">Menjadi :</div>
          </div>
          <div className="col-6 col-lg-9">
            {distribusiSiswa.map((jumlah, index) => (
              <span key={index} className="me-4">
                X-{selectedMajor?.value}-{index + 1}({jumlah})
              </span>
            ))}
          </div>
          <div className="col-2">
            <button onClick={handleSubmit} className={`btn btn-success mt-2`}>
              Simpan
            </button>
          </div>
        </div>
      </div>
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
              Siswa Baru
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
