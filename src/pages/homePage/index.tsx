// import { CardMapel } from "../../features/homePage/components/cardMapel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import { Hero } from "../../features/homePage/components/hero";
import ArtikelService from "../../services/artikelService";
import { useEffect, useState } from "react";
import { Artikel } from "../../interface/artikel.interface";
import { Link } from "react-router-dom";
import {
  FaCaretRight,
  FaCodeBranch,
  FaGraduationCap,
  FaPersonChalkboard,
} from "react-icons/fa6";
import { CardBerita } from "../../components/cardBerita";
import { CardBeritaSkeleton } from "../../components/cardBeritaSkeleton";
import { CardInformasi } from "../../features/homePage/components/cardInformasi";
import ConfigSchoolService from "../../services/sekolahConfigService";
import { Statistik } from "../../interface/school.interface";
import StudentService from "../../services/studentService";
import {
  bgColorAttendance,
  decodeToken,
  formatMonthAndYear,
  formatTanggal,
  getDayMonth,
  getDayNow,
  statusAttendance,
} from "../../utils/myFunctions";
import useCookie from "react-use-cookie";
import CourseInClassService from "../../services/courseInClassService";
import { CourseInClass } from "../../interface/courseInClass.interface";
import weekend from "./../../../src/assets/images/weekend.svg";
import { Tooltip } from "react-tooltip";
import { AttendanceMonth } from "../../interface/studentAttendance.interface";
import StudentAttendanceService from "../../services/studentAttendanceService";
import imgEmpty from "./../../assets/images/empty-data.svg";

export const HomePage = () => {
  const articleService = ArtikelService();
  const schoolService = ConfigSchoolService();
  const studentService = StudentService();
  const courseInClass = CourseInClassService();
  const studentAttendanceService = StudentAttendanceService();

  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const [dataStatistik, setDataStatistik] = useState<Statistik>();
  const dtoken = decodeToken(userLoginCookie.token);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataMapel, setDataMapel] = useState<CourseInClass[]>([]);
  const [dataArtikel, setDataArtikel] = useState<Artikel[]>([]);
  const [dataAttendance, setDataAttendance] = useState<AttendanceMonth[]>([]);

  const getAllArtikel = async () => {
    const response = await articleService.getAllArtikels("1", 8);
    setDataArtikel(response.data);
  };

  const getStatistik = async () => {
    const response = await schoolService.getStatikSchool();
    setDataStatistik(response.data);
  };

  const getStudent = async () => {
    if (dtoken.nis) {
      try {
        setLoading(true);
        const response = await studentService.getStudentByNis(dtoken.nis);
        if (response.status === 200) {
          console.log(response.data);
          
          await getStudentDetailAttendance(
            dtoken.nis,
            parseInt(response.data.HistoryClass[0].currentClassId)
          );
          if (getDayNow() === "Minggu") return;
          const resCourse = await courseInClass.getCourseinClass(
            parseInt(response.data.HistoryClass[0].currentClassId),
            getDayNow()
          );
          
          setDataMapel(resCourse.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStudentDetailAttendance = async (nis: string, classId: number) => {
    try {
      const response =
        await studentAttendanceService.getStudentDetailAttendance(nis, classId);
      setDataAttendance(response.data.attendances);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStatistik();
    getStudent();
    getAllArtikel();
  }, []);

  return (
    <>
      {userLoginCookie.role === "STAFF" ||
      userLoginCookie.role === "TEACHER" ? (
        <div className="m-1 m-lg-4 m-md-4 my-4">
          <div className="fw-bold fs-5 mb-3 text-dark-soft">Dashboard</div>
          <div className="container-fluid px-0">
            <div className="row">
              <CardInformasi
                icon={<FaGraduationCap className="display-6" />}
                title="Total Siswa"
                total={dataStatistik?.student || 0}
                bgColor="#FBD288"
              />
              <CardInformasi
                icon={<FaPersonChalkboard className="display-6" />}
                title="Total Guru"
                total={dataStatistik?.teacher || 0}
                bgColor="#D4F6FF"
              />
              <CardInformasi
                icon={<FaCodeBranch className="display-6" />}
                title="Total Jurusan"
                total={dataStatistik?.major || 0}
                bgColor="#F95454"
              />
              <CardInformasi
                icon={<FaGraduationCap className="display-6" />}
                title="Total Alumni"
                total={dataStatistik?.alumni || 0}
                bgColor="#A8DADC"
              />
            </div>
          </div>
        </div>
      ) : (
        <Hero />
      )}

      {userLoginCookie.role === "STUDENT" && (
        <>
          <div className="m-1 m-lg-4 m-md-4 my-4">
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold fs-5 text-dark-soft">
                Mata Pelajaran <span className="text-blue">Hari ini</span>
              </span>
              <Link
                to="/mata-pelajaran"
                className="fw-medium text-blue text-decoration-none"
              >
                Lainnya <FaCaretRight />
              </Link>
            </div>
            <div className="container-fluid px-0" style={{ minHeight: "20vh" }}>
              <div className="row">
                {getDayNow() === "Minggu" ? ( // Jika hari ini Minggu
                  <div className="text-center">
                    <img
                      src={weekend}
                      alt=""
                      className="img-fluid"
                      style={{ width: "400px" }}
                    />
                    <div className="text-blue fw-bold mt-3 fs-5">
                      Happy Weekend
                    </div>
                  </div>
                ) : loading ? ( // Jika sedang loading
                  <div className="text-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                ) : // Jika tidak Minggu dan tidak loading
                dataMapel.length > 0 ? (
                  dataMapel.map((dt) => (
                    <div
                      className="col-12 col-lg-4 col-md-3 mb-3"
                      key={dt.courseDetail.name}
                    >
                      <div className="card card-body border-0 shadow-sm">
                        <span
                          className={`badge mb-2 text-bg-info bg-blue text-light`}
                          style={{ maxWidth: "fit-content" }}
                        >
                          {dt.day}
                        </span>
                        <h4>{dt.courseDetail.name}</h4>
                        <h6>Guru : {dt.teacher.name}</h6>
                        <hr />
                        <div className="d-flex gap-3">
                          <div>
                            <h6>Jam Mulai</h6>
                            <p>{dt.timeStart}</p>
                          </div>
                          <div>
                            <h6>Jam Selesai</h6>
                            <p>{dt.timeEnd}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <img
                      src={imgEmpty}
                      alt=""
                      className="img-fluid"
                      style={{ width: "200px" }}
                    />
                    <div className="text-blue fw-bold mt-3 fs-6">
                      Mata Pelajaran hari ini masing kosong!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="m-1 m-lg-4 m-md-4 my-4">
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold fs-5 text-dark-soft">
                Absensi Bulan <span className="text-blue">{getDayMonth()}</span>
              </span>
              <Link
                to="/absensi"
                className="fw-medium text-blue text-decoration-none"
              >
                Lainnya <FaCaretRight />
              </Link>
            </div>
            <div className="container-fluid px-0" style={{ minHeight: "20vh" }}>
              <div className="row g-3">
                {loading ? (
                  <div className="text-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                ) : dataAttendance.length > 0 ? (
                  <div className="col-12">
                    <div className="card card-body border-0 shadow-sm">
                      <div className="fw-medium">
                        {formatMonthAndYear(dataAttendance[0].month)}
                      </div>
                      <hr />
                      <div className="d-flex flex-wrap">
                        {dataAttendance[0].records.map((dataRecord, index2) => {
                          const tooltipId = `tooltip-${index2}`;
                          return (
                            <>
                              <div
                                key={index2}
                                style={{ width: 50 }}
                                id={tooltipId}
                                className={`
                            py-1 px-2 text-center text-light fw-medium border border-light ${bgColorAttendance(
                              dataRecord.status
                            )} 
                          `}
                              >
                                {dataRecord.date.split("-")[2]}
                              </div>
                              <Tooltip
                                anchorId={tooltipId}
                                className="text-light"
                                style={{
                                  backgroundColor: "var(--blue-color)",
                                  fontSize: "12px",
                                  padding: "5px",
                                }}
                                content={
                                  formatTanggal(dataRecord.date) +
                                  " (" +
                                  statusAttendance(dataRecord.status, 1) +
                                  ")"
                                }
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={imgEmpty}
                      alt=""
                      className="img-fluid"
                      style={{ width: "200px" }}
                    />
                    <div className="text-blue fw-bold mt-3 fs-6">
                      Data Absensi Bulan ini Masih Kosong!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="m-1 m-lg-4 m-md-4 my-4">
        <div className="d-flex justify-content-between mb-3">
          <span className="fw-bold fs-5 text-dark-soft">Berita/Artikel</span>
          <Link
            to="/berita"
            className="fw-medium text-blue text-decoration-none"
          >
            Lainnya <FaCaretRight />
          </Link>
        </div>
        <section className="">
          <div className="container-fluid px-0">
            <div className="row g-3 d-flex">
              {!loading ? (
                dataArtikel.length > 0 ? (
                  dataArtikel.map((data, index) => (
                    <div className="col-12 col-lg-3 col-md-6" key={index}>
                      <CardBerita
                        idArtikel={data.id}
                        uuidArtikel={data.uuid}
                        imageArtikel={
                          data.banner?.url ||
                          "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzc2luZXNzfGVufDB8fDB8fHww"
                        }
                        tipeArtikel={data.type}
                        dateArtikel={data.createdAt}
                        statusArtikel={data.status}
                        titleArtikel={data.title}
                        descArtikel={data.description}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <img
                      src={imgEmpty}
                      alt=""
                      className="img-fluid"
                      style={{ width: "200px" }}
                    />
                    <div className="text-blue fw-bold mt-3 fs-6">
                      Data Berita/Artikel Masih Kosong!
                    </div>
                  </div>
                )
              ) : (
                Array.from({ length: 8 }).map((_, index) => (
                  <CardBeritaSkeleton key={index} />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
