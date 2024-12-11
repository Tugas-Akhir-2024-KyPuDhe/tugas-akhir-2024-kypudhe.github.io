import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  AbsensiPage,
  ArticlePage,
  BannerPage,
  DetailArticlePage,
  FacilityPage,
  FormBannerPage,
  FormFacilityPage,
  HomePage,
  JurusanPage,
  KelasPage,
  LoginPage,
  MapelPage,
  NilaiPage,
  SchoolPage,
  FormJurusanPage,
  EkskulPage,
  FormEkskulPage,
  GuruMapelPage,
  FormGuruMapelPage,
  DaftarSiswaPage,
  FormDaftarSiswaPage,
  DaftarKelasPage,
  FormDaftarKelasPage,
  NilaiSiswaPage,
  FormNilaiSiswaPage,
  FormArticlePage,
  ProfilePage,
  AbsensiSiswaPage,
  DetailAbsensiSiswaPage,
  DataSiswaMangementSiswaPage,
  FormSiswaMangementSiswaPage,
  DetailSiswaMangementSiswa,
  GaleriPage,
  FormGaleriPage,
  NotFoundPage,
  UpdateGaleriColletion,
  DataKelasMangementSiswaPage,
  FormDataKelasMangementSiswaPage,
  DetailKelasMangementSiswaPage,
  DataMapelMangementSiswaPage,
  FormMapelMangementSiswaPage,
  DataStaffMangementStaffPage,
  FormStaffMangementStaffPage,
  DaftarKelasNilaiSiswaPage,
} from "./pages";
import { SideBar } from "./components/sidebar";
import PrivateRoute from "./components/privateRoute";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const location = useLocation();
  const excludePathsWithoutSidebar = [/^\/login$/i];
  const isSidebarExcluded = excludePathsWithoutSidebar.some((pattern) =>
    pattern.test(location.pathname)
  );

  return (
    <>
      {isSidebarExcluded ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : (
        <SideBar>
          <Routes>
            {/* #region | Global */}
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<PrivateRoute Component={HomePage} />} />
            <Route
              path="/profil"
              element={<PrivateRoute Component={ProfilePage} />}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute Component={HomePage} />}
            />
            <Route
              path="/berita"
              element={<PrivateRoute Component={ArticlePage} />}
            />
            <Route
              path="/berita/:id"
              element={<PrivateRoute Component={DetailArticlePage} />}
            />
            {/* #endregion */}

            {/* #region | Staff */}
            <Route
              path="/berita/tambah"
              element={<PrivateRoute Component={FormArticlePage} />}
            />
            <Route
              path="/berita/update/:id"
              element={<PrivateRoute Component={FormArticlePage} />}
            />
            <Route
              path="/content-web/banner"
              element={<PrivateRoute Component={BannerPage} />}
            />
            <Route
              path="/content-web/banner/tambah"
              element={<PrivateRoute Component={FormBannerPage} />}
            />
            <Route
              path="/content-web/banner/update/:id"
              element={<PrivateRoute Component={FormBannerPage} />}
            />
            <Route
              path="/content-web/sekolah"
              element={<PrivateRoute Component={SchoolPage} />}
            />
            <Route
              path="/content-web/fasilitas"
              element={<PrivateRoute Component={FacilityPage} />}
            />
            <Route
              path="/content-web/fasilitas/tambah"
              element={<PrivateRoute Component={FormFacilityPage} />}
            />
            <Route
              path="/content-web/fasilitas/update/:id"
              element={<PrivateRoute Component={FormFacilityPage} />}
            />
            <Route
              path="/content-web/jurusan"
              element={<PrivateRoute Component={JurusanPage} />}
            />
            <Route
              path="/content-web/jurusan/tambah"
              element={<PrivateRoute Component={FormJurusanPage} />}
            />
            <Route
              path="/content-web/jurusan/update/:id"
              element={<PrivateRoute Component={FormJurusanPage} />}
            />
            <Route
              path="/content-web/ekstra-kurikuler"
              element={<PrivateRoute Component={EkskulPage} />}
            />
            <Route
              path="/content-web/ekstra-kurikuler/tambah"
              element={<PrivateRoute Component={FormEkskulPage} />}
            />
            <Route
              path="/content-web/ekstra-kurikuler/update/:id"
              element={<PrivateRoute Component={FormEkskulPage} />}
            />
            <Route
              path="/content-web/galeri"
              element={<PrivateRoute Component={GaleriPage} />}
            />
            <Route
              path="/content-web/galeri/tambah"
              element={<PrivateRoute Component={FormGaleriPage} />}
            />
            <Route
              path="/content-web/galeri/update/:id"
              element={<PrivateRoute Component={FormGaleriPage} />}
            />
            <Route
              path="/content-web/galeri/koleksi/:id"
              element={<PrivateRoute Component={UpdateGaleriColletion} />}
            />
            <Route
              path="/manajemen-siswa/data-siswa-baru"
              element={<PrivateRoute Component={DataSiswaMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-siswa-baru/tambah"
              element={<PrivateRoute Component={FormSiswaMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-siswa-baru/update/:id"
              element={<PrivateRoute Component={FormSiswaMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-siswa-baru/detail/:id"
              element={<PrivateRoute Component={DetailSiswaMangementSiswa} />}
            />
            <Route
              path="/manajemen-siswa/data-kelas"
              element={<PrivateRoute Component={DataKelasMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-kelas/tambah"
              element={<PrivateRoute Component={FormDataKelasMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-kelas/update/:id"
              element={<PrivateRoute Component={FormDataKelasMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-kelas/detail/:id"
              element={<PrivateRoute Component={DetailKelasMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-mapel"
              element={<PrivateRoute Component={DataMapelMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-mapel/tambah"
              element={<PrivateRoute Component={FormMapelMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-siswa/data-mapel/update/:id"
              element={<PrivateRoute Component={FormMapelMangementSiswaPage} />}
            />
            <Route
              path="/manajemen-staff/data-staff"
              element={<PrivateRoute Component={DataStaffMangementStaffPage} />}
            />
            <Route
              path="/manajemen-staff/data-staff/tambah"
              element={<PrivateRoute Component={FormStaffMangementStaffPage} />}
            />
            <Route
              path="/manajemen-staff/data-staff/detail/:id"
              element={<PrivateRoute Component={FormStaffMangementStaffPage} />}
            />
            <Route
              path="/manajemen-staff/data-staff/update/:id"
              element={<PrivateRoute Component={FormStaffMangementStaffPage} />}
            />
            {/* === #endregion */}

            {/* #region | Teacher */}
            <Route
              path="/guru/mata-pelajaran"
              element={<PrivateRoute Component={GuruMapelPage} />}
            />
            <Route
              path="/guru/mata-pelajaran/tambah"
              element={<PrivateRoute Component={FormGuruMapelPage} />}
            />
            <Route
              path="/guru/mata-pelajaran/update/:id"
              element={<PrivateRoute Component={FormGuruMapelPage} />}
            />
            <Route
              path="/pengelolaan-siswa/daftar-siswa"
              element={<PrivateRoute Component={DaftarSiswaPage} />}
            />
            <Route
              path="/pengelolaan-siswa/daftar-siswa/tambah"
              element={<PrivateRoute Component={FormDaftarSiswaPage} />}
            />
            <Route
              path="/pengelolaan-siswa/daftar-siswa/update/:id"
              element={<PrivateRoute Component={FormDaftarSiswaPage} />}
            />
            <Route
              path="/pengelolaan-siswa/daftar-kelas"
              element={<PrivateRoute Component={DaftarKelasPage} />}
            />
            <Route
              path="/pengelolaan-siswa/daftar-kelas/tambah"
              element={<PrivateRoute Component={FormDaftarKelasPage} />}
            />
            <Route
              path="/pengelolaan-siswa/daftar-kelas/update/:id"
              element={<PrivateRoute Component={FormDaftarKelasPage} />}
            />
            <Route
              path="/pengelolaan-siswa/nilai-siswa"
              element={<PrivateRoute Component={NilaiSiswaPage} />}
            />
            <Route
              path="/pengelolaan-siswa/nilai-siswa/tambah"
              element={<PrivateRoute Component={FormNilaiSiswaPage} />}
            />
            <Route
              path="/pengelolaan-siswa/nilai-siswa/update/:id"
              element={<PrivateRoute Component={FormNilaiSiswaPage} />}
            />
            <Route
              path="/pengelolaan-siswa/absensi-siswa"
              element={<PrivateRoute Component={AbsensiSiswaPage} />}
            />
            <Route
              path="/pengelolaan-siswa/absensi-siswa/:id"
              element={<PrivateRoute Component={DetailAbsensiSiswaPage} />}
            />
            <Route
              path="/pengelolaan-siswa/daftar-kelas/nilai/:id"
              element={<PrivateRoute Component={DaftarKelasNilaiSiswaPage} />}
            />
            {/* #endregion */}

            {/* #region | Student  */}
            <Route
              path="/nilai"
              element={<PrivateRoute Component={NilaiPage} />}
            />
            <Route
              path="/kelas"
              element={<PrivateRoute Component={KelasPage} />}
            />
            <Route
              path="/mata-pelajaran"
              element={<PrivateRoute Component={MapelPage} />}
            />
            <Route
              path="/absensi"
              element={<PrivateRoute Component={AbsensiPage} />}
            />
            {/* #endregion */}
          </Routes>
        </SideBar>
      )}
    </>
  );
}

export default App;
