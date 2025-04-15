import React, { useEffect, useState } from "react";
import { StudentDetail } from "../../../interface/student.interface";
import { CourseInClass } from "../../../interface/courseInClass.interface";
import DataTable from "react-data-table-component";
import { FaSave } from "react-icons/fa";
import StudentGradeService from "../../../services/studentGradeService";
import {
  convertToPercentage,
  showConfirmationDialog,
  Toast,
} from "../../../utils/myFunctions";
import { FormStateStudentGrade, StudentsGrades } from "../../../interface/studentGrade.interface";
import { FaPenToSquare } from "react-icons/fa6";

interface CardProps {
  loading: boolean;
  data: CourseInClass;
  refreshData?: () => void;
}

export const CardNilaiKelas: React.FC<CardProps> = ({
  loading,
  data,
  refreshData,
}) => {
  const studentGradeService = StudentGradeService();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [grades, setGrades] = useState<Record<string, FormStateStudentGrade>>(
    {}
  );
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail | null>(
    null
  );
  const [manualFinalGrades, setManualFinalGrades] = useState<
    Record<string, string>
  >({});
  const [weights, setWeights] = useState({
    task: 0,
    UH: 0,
    PTS: 0,
    PAS: 0,
    portofolio: 0,
    proyek: 0,
  });
  const [weightPercentages, setWeightPercentages] = useState({
    task: "0%",
    UH: "0%",
    PTS: "0%",
    PAS: "0%",
    portofolio: "0%",
    proyek: "0%",
  });
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  useEffect(() => {
    if (data?.class?.student) {
      const initialGrades: Record<string, FormStateStudentGrade> = {};
      const initialManualFinalGrades: Record<string, string> = {};

      data.class.student.forEach((student) => {
        // const studentGrade = student.StudentsGrades[0] || {};
        const studentGrade = student.StudentsGrades.find(
          (grade) => grade.courseCode === data.courseDetail.code
        ) || {} as StudentsGrades;
        
        initialGrades[student.nis] = {
          courseCode: data.courseDetail.code || "",
          classId: studentGrade.classId,
          nis: studentGrade.nis,
          teacherId: studentGrade.teacherId,
          task: studentGrade.task || "",
          UH: studentGrade.UH || "",
          PTS: studentGrade.PTS || "",
          PAS: studentGrade.PAS || "",
          portofolio: studentGrade.portofolio || "",
          proyek: studentGrade.proyek || "",
          attitude: studentGrade.attitude || "",
          description: studentGrade.description || "",
        };

        // Jika finalGrade sudah ada, simpan ke state manualFinalGrades
        if (studentGrade.finalGrade !== undefined) {
          initialManualFinalGrades[student.nis] = studentGrade.finalGrade;
        }
      });

      setGrades(initialGrades);
      setManualFinalGrades(initialManualFinalGrades); // Set nilai finalGrade dari backend
    }
  }, [data]);

  const handleInputChange = (
    studentId: string,
    field: string,
    value: string
  ) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSaveAllGrades = async () => {
    const result = await showConfirmationDialog({
      title: "<b>Data nilai yang ingin diupdate sudah sesuai semua?</b>",
      icon: "warning",
      confirmButtonText: "Ya, Sudah!",
      cancelButtonText: "Cek Lagi",
    });
    if (result.isConfirmed) {
      setLoadingButton(true);

      const payload = Object.keys(grades).map((nis) => ({
        ...grades[nis],
        academicYear: data.class.academicYear,
        nis: nis,
        teacherId: data.teacher.id,
        classId: data.class.id,
        courseCode: data.courseDetail.code,
        finalGrade:
          manualFinalGrades[nis] !== undefined // Jika ada nilai manual
            ? manualFinalGrades[nis] // Gunakan nilai manual
            : calculateFinalGrade(nis), // Jika tidak, gunakan nilai otomatis
      }));

      try {
        const response = await studentGradeService.insertGrade(payload);
        refreshData!();
        if (response.status === 201) {
          Toast.fire({
            icon: "success",
            timer: 5000,
            title: `Nilai semua siswa berhasil diupdate`,
          });
        }
      } catch (error) {
        console.error(error);
        Toast.fire({
          icon: "error",
          timer: 5000,
          title: `Gagal mengupdate nilai siswa`,
        });
      } finally {
        setLoadingButton(false);
      }
    }
  };

  const handleWeightChange = (field: string, value: string) => {
    // Update nilai bobot
    setWeights((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));

    // Update nilai persentase
    setWeightPercentages((prev) => ({
      ...prev,
      [field]: convertToPercentage(value),
    }));
  };

  const handleGenerateFinalGrades = () => {
    const updatedManualFinalGrades: Record<string, string> = {};

    Object.keys(grades).forEach((nis) => {
      updatedManualFinalGrades[nis] = calculateFinalGrade(nis);
    });

    setManualFinalGrades(updatedManualFinalGrades);
  };

  const calculateFinalGrade = (studentId: string) => {
    const studentGrades = grades[studentId];
    if (!studentGrades) return "0.00"; // Pastikan mengembalikan string agar konsisten

    // Ambil nilai siswa dengan default 0 jika undefined
    const {
      task = "0",
      UH = "0",
      PTS = "0",
      PAS = "0",
      portofolio = "0",
      proyek = "0",
    } = studentGrades;

    // Ambil bobot dengan default 0 jika undefined
    const {
      task: taskWeight = 0,
      UH: UHWeight = 0,
      PTS: PTSWeight = 0,
      PAS: PASWeight = 0,
      portofolio: portofolioWeight = 0,
      proyek: proyekWeight = 0,
    } = weights;

    // Hitung total bobot
    const totalWeight =
      taskWeight +
      UHWeight +
      PTSWeight +
      PASWeight +
      portofolioWeight +
      proyekWeight;

    // Hindari pembagian dengan nol
    if (totalWeight === 0) return "-";

    // Hitung nilai akhir
    const finalGrade =
      (parseFloat(task) * taskWeight +
        parseFloat(UH) * UHWeight +
        parseFloat(PTS) * PTSWeight +
        parseFloat(PAS) * PASWeight +
        parseFloat(portofolio) * portofolioWeight +
        parseFloat(proyek) * proyekWeight) /
      totalWeight;

      return Math.floor(finalGrade).toString();
  };

  const columns = [
    {
      name: "No",
      cell: (_row: StudentDetail, index: number) => (
        <div className="w-100 text-center">{index + 1}</div>
      ),
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
      name: <div className="w-100 text-center">Nilai Tugas</div>,
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].task || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={grades[row.nis]?.task ?? (row.StudentsGrades[0]?.task || "")}
            onChange={(e) => handleInputChange(row.nis, "task", e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: <div className="w-100 text-center">Nilai UH</div>,
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].UH || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={grades[row.nis]?.UH ?? (row.StudentsGrades[0]?.UH || "")}
            onChange={(e) => handleInputChange(row.nis, "UH", e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: <div className="w-100 text-center">Nilai PTS</div>,
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].PTS || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={grades[row.nis]?.PTS ?? (row.StudentsGrades[0]?.PTS || "")}
            onChange={(e) => handleInputChange(row.nis, "PTS", e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: <div className="w-100 text-center">Nilai PAS</div>,
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].PAS || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={grades[row.nis]?.PAS ?? (row.StudentsGrades[0]?.PAS || "")}
            onChange={(e) => handleInputChange(row.nis, "PAS", e.target.value)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: <div className="w-100 text-center">Nilai Portofolio</div>,
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].portofolio || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={
              grades[row.nis]?.portofolio ??
              (row.StudentsGrades[0]?.portofolio || "")
            }
            onChange={(e) =>
              handleInputChange(row.nis, "portofolio", e.target.value)
            }
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: <div className="w-100 text-center">Nilai Proyek</div>,
      selector: (row: StudentDetail) =>
        row.StudentsGrades[0] && (row.StudentsGrades[0].proyek || "-"),
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={
              grades[row.nis]?.proyek ?? (row.StudentsGrades[0]?.proyek || "")
            }
            onChange={(e) =>
              handleInputChange(row.nis, "proyek", e.target.value)
            }
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: <>Nilai Akhir</>,
      selector: (row: StudentDetail) =>
        manualFinalGrades[row.nis] !== undefined // Cek apakah ada nilai manual
          ? manualFinalGrades[row.nis] // Tampilkan nilai manual
          : calculateFinalGrade(row.nis), // Jika tidak, tampilkan nilai otomatis
      cell: (row: StudentDetail) => (
        <>
          <input
            type="text"
            className="form-control text-center fw-medium px-0"
            value={
              manualFinalGrades[row.nis] !== undefined // Cek apakah ada nilai manual
                ? manualFinalGrades[row.nis] // Tampilkan nilai manual
                : calculateFinalGrade(row.nis) // Jika tidak, tampilkan nilai otomatis
            }
            onChange={(e) => {
              const value = e.target.value;
              setManualFinalGrades((prev) => ({
                ...prev,
                [row.nis]: value,
              }));
            }}
          />
        </>
      ),
      width: "80px",
    },
    {
      name: <div className="w-100 text-center">Ket</div>,
      cell: (row: StudentDetail) => (
        <>
          <button
            className="btn btn-link"
            data-bs-toggle="modal"
            data-bs-target="#modalDetailDesk"
            onClick={() => setSelectedStudent(row)}
            style={{ fontSize: "0.9rem" }}
          >
            Lihat
          </button>
        </>
      ),
      width: "95px",
    },
  ];

  const filteredData =
    data?.class.student.filter((dt) =>
      dt.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
              Buat Penilaian Akhir
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
          <div className="col-12">
            <div className="alert alert-primary border-0 py-2">
              Penilaian akhir ini digunakan untuk membantu perhitungan{" "}
              <b>nilai akhir</b> setiap siswa. Nilai tersebut dihitung
              berdasarkan bobot dan komponen penilaian seperti tugas, UH, PTS,
              PAS, portofolio, dan proyek.
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">
                Bobot Tugas{" "}
                <b className="d-block text-blue">({weightPercentages.task})</b>
              </div>
              <div className="col-auto d-flex align-items-center">:</div>
              <div className="col col-md-5 fw-medium my-auto">
                <input
                  type="text"
                  name="bobotTugas"
                  placeholder="Bobot (desimal)"
                  className="form-control"
                  onChange={(e) => handleWeightChange("task", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">
                Bobot UH{" "}
                <b className="d-block text-blue">({weightPercentages.UH})</b>
              </div>
              <div className="col-auto d-flex align-items-center">:</div>
              <div className="col col-md-5 fw-medium my-auto">
                <input
                  type="text"
                  name="bobotUH"
                  placeholder="Bobot (desimal)"
                  className="form-control"
                  onChange={(e) => handleWeightChange("UH", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">
                Bobot PTS{" "}
                <b className="d-block text-blue">({weightPercentages.PTS})</b>
              </div>
              <div className="col-auto d-flex align-items-center">:</div>
              <div className="col col-md-5 fw-medium my-auto">
                <input
                  type="text"
                  name="bobotPTS"
                  placeholder="Bobot (desimal)"
                  className="form-control"
                  onChange={(e) => handleWeightChange("PTS", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">
                Bobot PAS{" "}
                <b className="d-block text-blue">({weightPercentages.PAS})</b>
              </div>
              <div className="col-auto d-flex align-items-center">:</div>
              <div className="col col-md-5 fw-medium my-auto">
                <input
                  type="text"
                  name="bobotPAS"
                  placeholder="Bobot (desimal)"
                  className="form-control"
                  onChange={(e) => handleWeightChange("PAS", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">
                Bobot Portofolio{" "}
                <b className="d-block text-blue">
                  ({weightPercentages.portofolio})
                </b>
              </div>
              <div className="col-auto d-flex align-items-center">:</div>
              <div className="col col-md-5 fw-medium my-auto">
                <input
                  type="text"
                  name="bobotPortofolio"
                  placeholder="Bobot (desimal)"
                  className="form-control"
                  onChange={(e) =>
                    handleWeightChange("portofolio", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row mb-3">
              <div className="col-3 col-md-2 fw-medium">
                Bobot Proyek{" "}
                <b className="d-block text-blue">
                  ({weightPercentages.proyek})
                </b>
              </div>
              <div className="col-auto d-flex align-items-center">:</div>
              <div className="col col-md-5 fw-medium my-auto">
                <input
                  type="text"
                  name="bobotProyek"
                  placeholder="Bobot (desimal)"
                  className="form-control"
                  onChange={(e) => handleWeightChange("proyek", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn btn-success py-2 px-4"
              onClick={handleGenerateFinalGrades}
            >
              <FaPenToSquare className="me-3" /> Generate Nilai
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
              Daftar Nilai Siswa
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
            Total : <span className="fw-bold">{data.class.student.length}</span>
          </div>
        </div>

        <div className="col-12">
          <DataTable
            columns={columns}
            data={searchTerm ? filteredData : data?.class.student || []}
            pagination
            highlightOnHover
            className="mt-3"
            paginationDefaultPage={50}
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
        {/* Tombol Simpan untuk Semua Data */}
        <div className="col-12">
          <div className="text-end">
            <button
              type="button"
              onClick={handleSaveAllGrades}
              className="btn btn-success border-0 me-3 py-2"
              disabled={loading || loadingButton} // Disable button if loading
            >
              {loadingButton ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <FaSave className="me-2" /> Simpan Semua
                </>
              )}
            </button>
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="modalDetailDesk"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detail Keterangan Siswa</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-2 fw-medium">Nama</div>
                      <div className="col-auto">:</div>
                      <div className="col-9 fw-medium">
                        {(selectedStudent && selectedStudent.name) || ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-2 fw-medium">NIS</div>
                      <div className="col-auto">:</div>
                      <div className="col-9 fw-medium">
                        {(selectedStudent && selectedStudent.nis) || ""}
                      </div>
                    </div>
                  </div>
                </div>
                <textarea
                  className="form-control"
                  placeholder="Masukkan Catatan..."
                  value={
                    grades[(selectedStudent && selectedStudent.nis) || ""]
                      ?.description || ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      (selectedStudent && selectedStudent.nis) || "",
                      "description",
                      e.target.value
                    )
                  }
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
