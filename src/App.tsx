import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AbsensiPage, ArticlePage, BannerPage, DetailArticlePage, FacilityPage, FormBanner, FormFacilityPage, HomePage, JurusanPage, KelasPage, LoginPage, MapelPage, NilaiPage, SchoolPage, FormJurusanPage, EkskulPage, FormEkskulPage, GuruMapelPage, FormGuruMapelPage, DaftarSiswaPage, FormDaftarSiswaPage, DaftarKelasPage, FormDaftarKelasPage, NilaiSiswaPage, FormNilaiSiswaPage, FormArticlePage, ProfilePage, AbsensiSiswaPage, DetailAbsensiSiswaPage } from "./pages";
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
            <Route path="/" element={<PrivateRoute Component={HomePage} />} />
            <Route path="/profil" element={<PrivateRoute Component={ProfilePage} />} />
            <Route path="/dashboard" element={<PrivateRoute Component={HomePage} />} />
            <Route path="/berita" element={<PrivateRoute Component={ArticlePage} /> } />
            <Route path="/berita/:id" element={<PrivateRoute Component={DetailArticlePage} /> } />
            <Route path="/berita/tambah" element={ <PrivateRoute Component={FormArticlePage} /> } />
            <Route path="/berita/update/:id" element={<PrivateRoute Component={FormArticlePage} /> } />
            <Route path="/content-web/banner" element={ <PrivateRoute Component={BannerPage} /> } />
            <Route path="/content-web/banner/tambah" element={ <PrivateRoute Component={FormBanner} /> } />
            <Route path="/content-web/banner/update/:id" element={ <PrivateRoute Component={FormBanner} /> } />
            <Route path="/nilai" element={ <PrivateRoute Component={NilaiPage} /> } />
            <Route path="/kelas" element={ <PrivateRoute Component={KelasPage} /> } />
            <Route path="/mata-pelajaran" element={ <PrivateRoute Component={MapelPage} /> } />
            <Route path="/absensi" element={ <PrivateRoute Component={AbsensiPage} /> } />
            <Route path="/content-web/school" element={ <PrivateRoute Component={SchoolPage} /> } />
            <Route path="/content-web/facility" element={ <PrivateRoute Component={FacilityPage} /> } />
            <Route path="/content-web/facility/tambah" element={ <PrivateRoute Component={FormFacilityPage} /> } />
            <Route path="/content-web/facility/update/:id" element={ <PrivateRoute Component={FormFacilityPage} /> } />
            <Route path="/content-web/jurusan" element={ <PrivateRoute Component={JurusanPage} /> } />
            <Route path="/content-web/jurusan/tambah" element={ <PrivateRoute Component={FormJurusanPage} /> } />
            <Route path="/content-web/jurusan/update/:id" element={ <PrivateRoute Component={FormJurusanPage} /> } />
            <Route path="/content-web/ekstra-kurikuler" element={ <PrivateRoute Component={EkskulPage} /> } />
            <Route path="/content-web/ekstra-kurikuler/tambah" element={ <PrivateRoute Component={FormEkskulPage} /> } />
            <Route path="/content-web/ekstra-kurikuler/update/:id" element={ <PrivateRoute Component={FormEkskulPage} /> } />
            <Route path="/guru/mata-pelajaran" element={ <PrivateRoute Component={GuruMapelPage} /> } />
            <Route path="/guru/mata-pelajaran/tambah" element={ <PrivateRoute Component={FormGuruMapelPage} /> } />
            <Route path="/guru/mata-pelajaran/update/:id" element={ <PrivateRoute Component={FormGuruMapelPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-siswa" element={ <PrivateRoute Component={DaftarSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-siswa/tambah" element={ <PrivateRoute Component={FormDaftarSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-siswa/update/:id" element={ <PrivateRoute Component={FormDaftarSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-kelas" element={ <PrivateRoute Component={DaftarKelasPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-kelas/tambah" element={ <PrivateRoute Component={FormDaftarKelasPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-kelas/update/:id" element={ <PrivateRoute Component={FormDaftarKelasPage} /> } />
            <Route path="/pengelolaan-siswa/nilai-siswa" element={ <PrivateRoute Component={NilaiSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/nilai-siswa/tambah" element={ <PrivateRoute Component={FormNilaiSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/nilai-siswa/update/:id" element={ <PrivateRoute Component={FormNilaiSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/absensi-siswa" element={ <PrivateRoute Component={AbsensiSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/absensi-siswa/:id" element={ <PrivateRoute Component={DetailAbsensiSiswaPage} /> } />
          </Routes>
        </SideBar>
      )}
    </>
  );
}

export default App;
