import React, { useEffect, useState } from "react";
import { HeaderTitlePage } from "../../../../components/headerTitlePage";
import { useParams } from "react-router-dom";
import { decodeToken } from "../../../../utils/myFunctions";
import StaffService from "../../../../services/staffService";
import useCookie from "react-use-cookie";
import { CourseInClass } from "../../../../interface/courseInClass.interface";
import { CardDetailKelas } from "../../../../features/teacherPages/pengelolaanSiswa/daftarKelasPage/cardDetailKelas";
import { CardAbsensiKelas } from "../../../../features/teacherPages/pengelolaanSiswa/daftarKelasPage/cardAbsensiKelas";
import { CardNilaiKelas } from "../../../../features/teacherPages/pengelolaanSiswa/daftarKelasPage/cardNilaiKelas";

export const DetailKelasPage: React.FC = () => {
  const teacherService = StaffService();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CourseInClass>();
  const [teacherName, setTeacherName] = useState("");

  const [activeMenu, setActiveMenu] = useState("absensi");
  const handleMenuClick = (menu: string) => {
    if (!loading) {  // Only allow menu click if not loading
      setActiveMenu(menu);
    }
  };

  const getData = async () => {
    const dtoken = decodeToken(userLoginCookie.token);
    try {
      setLoading(true);
      const response = await teacherService.getClassOfTeacher(dtoken.username, id);
      setTeacherName(response.data.name);
      setData(response.data.CourseInClass[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HeaderTitlePage
        title="Detail Kelas Guru"
        subTitle="Detail Kelas Guru SMKN 1 Lumban Julu"
        backDisplay={true}
        addDisplay={false}
        linkAdd="tambah"
      />

      <CardDetailKelas
        loading={loading}
        data={data!}
        teacherName={teacherName}
      />

      <div className="m-lg-4 m-md-4 my-4 rounded">
        <ul
          className="nav nav-underline"
          style={{ borderBottom: "0.5px solid grey" }}
        >
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${loading ? "disabled" : ""} ${
                activeMenu === "#" ? "active text-blue" : "text-dark"
              }`}
              aria-disabled="true"
              onClick={() => handleMenuClick("#")}
            >
              Daftar Siswa
            </a>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${loading ? "disabled" : ""} ${
                activeMenu === "absensi" ? "active text-blue" : "text-dark"
              }`}
              onClick={() => handleMenuClick("absensi")}
            >
              Absensi
            </a>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${loading ? "disabled" : ""} ${
                activeMenu === "nilai" ? "active text-blue" : "text-dark"
              }`}
              onClick={() => handleMenuClick("nilai")}
            >
              Nilai
            </a>
          </li>
        </ul>
      </div>

      {activeMenu === "absensi" ? (
        <CardAbsensiKelas loading={loading} />
      ) : (
        <CardNilaiKelas refreshData={getData} loading={loading} data={data!} />
      )}
    </>
  );
};
