import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../../../services/authService";
import { formatGender, Toast } from "../../../../utils/myFunctions";
import { CardProfil } from "../../../../features/staffPages/managementSiswaPage/dataSiswaPage/cardProfil";
import noPhotoFemale from "./../../../../assets/images/profile-female.jpg";
import noPhotoMale from "./../../../../assets/images/profile-male.jpg";
import { CardDataOrangTua } from "../../../../components/cardDataOrangTua";
import { CardRiwayatAkademik } from "../../../../components/cardRiwayatAkademik";
import { CardDataAkademik } from "../../../../components/cardDataAkademik";
import { AxiosError } from "axios";
import { StudentDetail } from "../../../../interface/auth.interface";
import moment from "moment";

export const DetailSiswaMangementSiswa: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const studentService = AuthService();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("data-akademik");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const [data, setData] = useState<StudentDetail | null>(null);

  useEffect(() => {
    const getDataSiswa = async () => {
      if (id) {
        try {
          const response = await studentService.getStudentByNis(parseFloat(id));
          const data = response.data;
          setData(response.data);
          setImageUrl(data.photo.url);
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            Toast.fire({
              icon: "error",
              title: `Data Tidak Ditemukan!`,
              timer: 4000,
            });
            navigate("/");
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getDataSiswa();
  }, []);
  return (
    <>
      <HeaderTitlePage
        title="Detail Siswa"
        subTitle="Detail Siswa SMKN 1 Lumban Julu"
        backDisplay={true}
        addDisplay={false}
        linkAdd=""
      />
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

        <CardProfil
          id={data?.id || 0}
          photo={
            imageUrl || (data?.gender === "L" ? noPhotoMale : noPhotoFemale)
          }
          name={data?.name || ""}
          nis={data?.nis || ""}
          nisn={data?.nisn || ""}
          email={data?.email || ""}
          phone={data?.phone || ""}
          address={data?.address || ""}
          gender={formatGender(data?.gender || "-")}
          birthPlace={data?.birthPlace || ""}
        />
      </div>

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
                activeMenu === "riwayat-akademik"
                  ? "active text-blue"
                  : "text-dark"
              }`}
              onClick={() => handleMenuClick("riwayat-akademik")}
            >
              Riwayat Akademik
            </a>
          </li>
        </ul>
      </div>

      <div
        className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
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
        {activeMenu === "data-akademik" ? (
          <CardDataAkademik
            kelas={data?.class.name || "-"}
            major={data?.Major.name || "-"}
            startYear={moment(data?.startYear).year().toString() || ""}
            studentStatus={data?.status || ""}
          />
        ) : activeMenu === "data-orang-tua" ? (
          <CardDataOrangTua
            nis={112233}
            fatherName={data?.ParentOfStudent.fatherName || "-"}
            motherName={data?.ParentOfStudent.motherName || "-"}
            phone={data?.ParentOfStudent.phone || "-"}
            parentJob={data?.ParentOfStudent.parentJob || ""}
            parentAddress={data?.ParentOfStudent.parentAddress || "-"}
          />
        ) : activeMenu === "riwayat-akademik" ? (
          <CardRiwayatAkademik />
        ) : (
          <div>Halaman tidak ditemukan</div>
        )}
      </div>
    </>
  );
};
