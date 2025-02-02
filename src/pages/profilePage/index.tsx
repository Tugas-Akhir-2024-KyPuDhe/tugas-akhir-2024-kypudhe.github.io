import { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import { CardBiodata } from "../../features/profilePage/cardBiodata";
import { CardInformasi1 } from "../../features/profilePage/cardInformasi1";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  DetailUserResponse,
  UpdatedBiodata,
} from "../../interface/auth.interface";
import { decodeToken, formatGender, Toast } from "../../utils/myFunctions";
import noPhotoFemale from "./../../assets/images/profile-female.jpg";
import noPhotoMale from "./../../assets/images/profile-male.jpg";
import { CardDataOrangTua } from "../../components/cardDataOrangTua";
import { CardDataAkademik } from "../../components/cardDataAkademik";
import { CardRiwayatAkademik } from "../../components/cardRiwayatAkademik";
import { NavSubMenu } from "../../components/navSubmenu";
import useCookie from "react-use-cookie";
import { CardClassTeacher } from "../../features/profilePage/cardClassTeacher";
import { FormParentOfStudent } from "../../interface/student.interface";
import { Course } from "../../interface/course.interface";
import CourseService from "../../services/courseService";
import moment from "moment";
import StudentHistoryService from "../../services/studentHistoryService";
import { StudentHistory } from "../../interface/studentHistory.interface";

const subMenuItemsStudent = [
  { label: "Data Akademik", key: "data-akademik" },
  { label: "Data Orang Tua", key: "data-orang-tua" },
  { label: "Riwayat Akademik", key: "riwayat-akademik" },
];
const subMenuItemsTeacher = [{ label: "Kelas", key: "kelas" }];

export const ProfilePage = () => {
  const authService = AuthService();
  const courseService = CourseService();
  const studentHistory = StudentHistoryService();

  const [cookieLogin] = useCookie("userLoginCookie", "");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const dtoken = decodeToken(userLoginCookie.token);

  const [profileDetail, setProfileDetail] = useState<DetailUserResponse | null>(
    null
  );
  const [allCourse, setAllCourse] = useState<Course[]>([]);
  const [DataStudentHistory, setDataStudentHistory] = useState<
    StudentHistory[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [statusUpdateDataIdentity, setstatusUpdateDataIdentity] =
    useState(false);
  const [loadingUpdateDataIdentity, setloadingUpdateDataIdentity] =
    useState(false);
  const [statusUpdateDataParent, setstatusUpdateDataParent] = useState(false);
  const [loadingUpdateDataParent, setloadingUpdateDataParent] = useState(false);
  const [activeMenu, setActiveMenu] = useState(
    userLoginCookie.role === "STUDENT"
      ? subMenuItemsStudent[0]?.key || ""
      : userLoginCookie.role === "TEACHER"
      ? subMenuItemsTeacher[0]?.key || ""
      : ""
  );

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const getUser = async () => {
    try {
      const user = await authService.getUser();
      setProfileDetail(user);
      if (user.details[0].nis) {
        await getStudentHistory();
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user data");
      setLoading(false);
    }
  };

  const getStudentHistory = async () => {
    try {
      setLoading(true);
      const response = await studentHistory.getStudentHistory(
        dtoken.student_id
      );
      setDataStudentHistory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCourse = async () => {
    setLoading(true);
    try {
      const response = await courseService.getAllCourses();
      if (response.data && response.data.length > 0) {
        setAllCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching Course data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getAllCourse();
  }, []);

  const handleUpdateAccessIdentity = () =>
    setstatusUpdateDataIdentity(!statusUpdateDataIdentity);
  const handleUpdateAccessParent = () =>
    setstatusUpdateDataParent(!statusUpdateDataParent);

  const handleSaveUpdateIdentity = async (updatedData: UpdatedBiodata) => {
    try {
      setloadingUpdateDataIdentity(true);
      const response = await authService.updateUser(updatedData);
      if (response.status === 200) {
        await getUser();
        setstatusUpdateDataIdentity(false);
        setloadingUpdateDataIdentity(false);
        Toast.fire({
          icon: "success",
          title: `Data Berhasil Diupdate!`,
          timer: 4000,
        });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
    setloadingUpdateDataIdentity(false);
  };

  const handleSaveUpdateParent = async (
    nis: string,
    updatedData: FormParentOfStudent
  ) => {
    try {
      setloadingUpdateDataParent(true);
      const response = await authService.updateDataParent(nis, updatedData);
      if (response.status === 200) {
        await getUser();
        setstatusUpdateDataParent(false);
        setloadingUpdateDataParent(false);
        Toast.fire({
          icon: "success",
          title: `Data Berhasil Diupdate!`,
          timer: 4000,
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: `Data gagal Diupdate!`,
        timer: 4000,
      });
      console.error("Error updating user data:", error);
    }
    setloadingUpdateDataParent(false);
  };

  const handleSavePhotoUpdateIdentity = async (id: number, photoFile: File) => {
    try {
      setloadingUpdateDataIdentity(true);
      const formData = new FormData();
      formData.append("photo", photoFile);

      const response = await authService.updatePhotoUser(id, formData);
      if (response.status === 200) {
        await getUser();
        setstatusUpdateDataIdentity(false);
        setloadingUpdateDataIdentity(false);
        Toast.fire({
          icon: "success",
          title: "Foto Profil Berhasil di Perbarui",
          timer: 4000,
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Foto Profile Gagal di Perbarui",
        timer: 4000,
      });
      console.error("Error updating photo:", error);
    }
    setloadingUpdateDataIdentity(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {!loading && profileDetail ? (
        <div className="row g-0">
          <CardBiodata
            handleUpdateAccess={handleUpdateAccessIdentity}
            onSaveUpdate={handleSaveUpdateIdentity}
            onSavePhotoUpdate={handleSavePhotoUpdateIdentity}
            statusUpdateData={statusUpdateDataIdentity}
            loadingUpdateData={loadingUpdateDataIdentity}
            photo={
              profileDetail.details[0].photo?.url ||
              (profileDetail.details[0].gender === "L"
                ? noPhotoMale
                : noPhotoFemale)
            }
            id={profileDetail.details[0].id}
            name={profileDetail.details[0].name}
            email={profileDetail.details[0].email || "-"}
            phone={profileDetail.details[0].phone || "-"}
            address={profileDetail.details[0].address || "-"}
            gender={formatGender(profileDetail.details[0].gender || "-")}
            birthPlace={profileDetail.details[0].birthPlace || "-"}
          />
          <div className="col-12 col-lg-7 col-md-7">
            <div className="row">
              <CardInformasi1
                //STAFF OR TEACHER
                nip={profileDetail.details[0].nip || "-"}
                position={profileDetail.details[0].position || "-"}
                startDate={profileDetail.details[0].startDate || "-"}
                typeStaff={profileDetail.details[0].type || "-"}
                myCourse={profileDetail.details[0].mapel || []}
                allCourse={allCourse}
                //STUDENT
                nis={profileDetail.details[0].nis || ""}
                currentClass={profileDetail.details[0].HistoryClass![0]?.currentClass.name || ""}
                currentClassUuid={profileDetail.details[0].HistoryClass![0]?.uuid || ""}
                currentHoomRoomTeacher={profileDetail.details[0].HistoryClass![0]?.currentClass.homeRoomTeacher.name || ""}
                nisn={profileDetail.details[0].nisn || 0}
              />
              {(userLoginCookie.role === "STUDENT" ||
                userLoginCookie.role === "TEACHER") && (
                <div className="col-12">
                  <NavSubMenu
                    menuItems={
                      userLoginCookie.role === "STUDENT"
                        ? subMenuItemsStudent
                        : subMenuItemsTeacher
                    }
                    activeMenu={activeMenu}
                    onMenuClick={handleMenuClick}
                  />
                </div>
              )}

              {(userLoginCookie.role === "STUDENT" ||
                userLoginCookie.role == "TEACHER") && (
                <div className="col-12">
                  <div
                    className="shadow p-4 m-1 mx-md-4 rounded"
                    style={{
                      backgroundColor: "#fff",
                      position: "relative",
                      minHeight: "450px",
                    }}
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
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    {/* === STUDENT */}
                    {activeMenu === "data-akademik" && (
                      <CardDataAkademik
                        kelas={profileDetail?.details?.[0]?.class?.name || "-"}
                        major={profileDetail?.details?.[0]?.Major?.name || "-"}
                        startYear={
                          moment(profileDetail?.details?.[0]?.startYear)
                            .year()
                            .toString() || "-"
                        }
                        studentStatus={
                         profileDetail?.details?.[0]?.status || "-"
                        }
                      />
                    )}
                    {activeMenu === "data-orang-tua" && (
                      <CardDataOrangTua
                        handleUpdateAccess={handleUpdateAccessParent}
                        onSaveUpdate={handleSaveUpdateParent}
                        statusUpdateData={statusUpdateDataParent}
                        loadingUpdateData={loadingUpdateDataParent}
                        nis={profileDetail?.details?.[0]?.nis || ""}
                        fatherName={
                          profileDetail?.details?.[0]?.ParentOfStudent?.[0]
                            ?.fatherName || "-"
                        }
                        motherName={
                          profileDetail?.details?.[0]?.ParentOfStudent?.[0]
                            ?.motherName || "-"
                        }
                        phone={
                          profileDetail?.details?.[0]?.ParentOfStudent?.[0]
                            ?.phone || "-"
                        }
                        parentJob={
                          profileDetail?.details?.[0]?.ParentOfStudent?.[0]
                            ?.parentJob || "-"
                        }
                        parentAddress={
                          profileDetail?.details?.[0]?.ParentOfStudent?.[0]
                            ?.parentAddress || "-"
                        }
                      />
                    )}
                    {activeMenu === "riwayat-akademik" && (
                      <CardRiwayatAkademik nis={profileDetail?.details[0].nis || ""} data={DataStudentHistory} />
                    )}

                    {/* === TEACHER */}
                    {activeMenu === "kelas" && <CardClassTeacher />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 m-1 m-lg-4 m-md-4 my-4 me-lg-0 me-md-0 rounded">
          <div className="row">
            <div className="col-12 col-lg-5 col-md-5">
              <Skeleton height={650} />
            </div>
            <div className="col-12 col-lg-7 col-md-7">
              <div className="row g-4">
                <div className="col-12">
                  <Skeleton height={350} />
                </div>
                <div className="col-12">
                  <Skeleton height={300} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
