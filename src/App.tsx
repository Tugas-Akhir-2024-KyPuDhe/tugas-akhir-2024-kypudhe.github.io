import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AbsensiPage, ArticlePage, BannerPage, CreateArticlePage, DetailArticlePage, FormBanner, HomePage, KelasPage, LoginPage, MapelPage, NilaiPage } from "./pages";
import { SideBar } from "./components/sidebar";
import PrivateRoute from "./components/privateRoute";

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
            <Route path="/content-web-banner" element={ <PrivateRoute Component={BannerPage} /> } />
            <Route path="/content-web-banner/tambah" element={ <PrivateRoute Component={FormBanner} /> } />
            <Route path="/content-web-banner/update/:id" element={ <PrivateRoute Component={FormBanner} /> } />
            <Route path="/nilai" element={ <PrivateRoute Component={NilaiPage} /> } />
            <Route path="/kelas" element={ <PrivateRoute Component={KelasPage} /> } />
            <Route path="/mata-pelajaran" element={ <PrivateRoute Component={MapelPage} /> } />
            <Route path="/absensi" element={ <PrivateRoute Component={AbsensiPage} /> } />
          </Routes>
        </SideBar>
      )}
    </>
  );
}

export default App;
