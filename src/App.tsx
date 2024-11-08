import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AbsensiPage, ArticlePage, BannerPage, CreateArticlePage, CreateFacilityPage, DetailArticlePage, FacilityPage, FormBanner, HomePage, KelasPage, LoginPage, MapelPage, NilaiPage, SchoolPage } from "./pages";
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
            <Route path="/content-web/facility/create" element={ <PrivateRoute Component={CreateFacilityPage} /> } />
          </Routes>
        </SideBar>
      )}
    </>
  );
}

export default App;
