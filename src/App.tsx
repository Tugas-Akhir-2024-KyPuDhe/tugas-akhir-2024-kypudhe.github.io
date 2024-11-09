import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AbsensiPage, ArticlePage, BannerPage, CreateArticlePage, DetailArticlePage, FacilityPage, FormBanner, FormFacilityPage, HomePage, JurusanPage, KelasPage, LoginPage, MapelPage, NilaiPage, SchoolPage, FormJurusanPage, EkskulPage, FormEkskulPage, GuruMapelPage, FormGuruMapelPage, DaftarSiswaPage, FormDaftarSiswaPage, DaftarKelasPage, FormDaftarKelasPage } from "./pages";
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
            <Route path="/dashboard" element={<PrivateRoute Component={HomePage} />} />
            <Route path="/berita" element={<PrivateRoute Component={ArticlePage} /> } />
            <Route path="/berita/:id" element={<PrivateRoute Component={DetailArticlePage} /> } />
            <Route path="/berita/tambah" element={ <PrivateRoute Component={CreateArticlePage} /> } />
            <Route path="/content-web/banner" element={ <PrivateRoute Component={BannerPage} /> } />
            <Route path="/content-web/banner/tambah" element={ <PrivateRoute Component={FormBanner} /> } />
            <Route path="/content-web/banner/update/:id" element={ <PrivateRoute Component={FormBanner} /> } />
            <Route path="/nilai" element={ <PrivateRoute Component={NilaiPage} /> } />
            <Route path="/kelas" element={ <PrivateRoute Component={KelasPage} /> } />
            <Route path="/mata-pelajaran" element={ <PrivateRoute Component={MapelPage} /> } />
            <Route path="/absensi" element={ <PrivateRoute Component={AbsensiPage} /> } />
            <Route path="/content-web/school" element={ <PrivateRoute Component={SchoolPage} /> } />
            <Route path="/content-web/facility" element={ <PrivateRoute Component={FacilityPage} /> } />
            <Route path="/content-web/facility/create" element={ <PrivateRoute Component={FormFacilityPage} /> } />
            <Route path="/content-web/facility/update/:id" element={ <PrivateRoute Component={FormFacilityPage} /> } />
            <Route path="/content-web/jurusan" element={ <PrivateRoute Component={JurusanPage} /> } />
            <Route path="/content-web/jurusan/create" element={ <PrivateRoute Component={FormJurusanPage} /> } />
            <Route path="/content-web/jurusan/update/:id" element={ <PrivateRoute Component={FormJurusanPage} /> } />
            <Route path="/content-web/ekstra-kurikuler" element={ <PrivateRoute Component={EkskulPage} /> } />
            <Route path="/content-web/ekstra-kurikuler/create" element={ <PrivateRoute Component={FormEkskulPage} /> } />
            <Route path="/content-web/ekstra-kurikuler/update/:id" element={ <PrivateRoute Component={FormEkskulPage} /> } />
            <Route path="/guru/mata-pelajaran" element={ <PrivateRoute Component={GuruMapelPage} /> } />
            <Route path="/guru/mata-pelajaran/create" element={ <PrivateRoute Component={FormGuruMapelPage} /> } />
            <Route path="/guru/mata-pelajaran/update/:id" element={ <PrivateRoute Component={FormGuruMapelPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-siswa" element={ <PrivateRoute Component={DaftarSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-siswa/create" element={ <PrivateRoute Component={FormDaftarSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-siswa/update/:id" element={ <PrivateRoute Component={FormDaftarSiswaPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-kelas" element={ <PrivateRoute Component={DaftarKelasPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-kelas/create" element={ <PrivateRoute Component={FormDaftarKelasPage} /> } />
            <Route path="/pengelolaan-siswa/daftar-kelas/update/:id" element={ <PrivateRoute Component={FormDaftarKelasPage} /> } />
          </Routes>
        </SideBar>
      )}
    </>
  );
}

export default App;
