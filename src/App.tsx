import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { ArticlePage, CreateArticlePage, DetailArticlePage, HomePage, LoginPage } from "./pages";
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
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      
    </>
  );
}

export default App;
