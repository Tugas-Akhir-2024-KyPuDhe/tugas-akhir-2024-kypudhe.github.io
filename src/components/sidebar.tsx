import React, { ReactNode, useState, useLayoutEffect, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaCircle, FaGlobe, FaNewspaper } from "react-icons/fa6";
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from "react-pro-sidebar";
import { IoGrid } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import AuthService from "../services/authService";
import useCookie from "react-use-cookie";

interface SideBarAdminProps {
  children: ReactNode;
}

export const SideBar: React.FC<SideBarAdminProps> = ({ children }) => {
  const authService = AuthService();
  const navigate = useNavigate();
  const location = useLocation(); // Mengambil lokasi saat ini
  const [mobileToggled, setMobileToggled] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(""); // Ubah default menjadi string kosong
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileToggled(false);
        setDesktopCollapsed(false);
      } else {
        setDesktopCollapsed(false);
      }
    };

    // Set initial state based on current window size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!userLoginCookie) {
      navigate("/login");
    }
  }, [userLoginCookie, navigate]);

  useEffect(() => {
    // Update selectedMenu berdasarkan pathname saat ini
    switch (location.pathname) {
      case "/":
        setSelectedMenu("dashboard");
        break;
      case "/berita":
        setSelectedMenu("berita");
        break;
      case "/submenu2-1":
        setSelectedMenu("submenu2-1");
        break;
      default:
        setSelectedMenu(""); // Atau bisa disesuaikan sesuai kebutuhan
    }
  }, [location.pathname]); // Menjalankan effect setiap kali pathname berubah

  const handleMenuClick = (menu: string, path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <>
      {userLoginCookie && (
        <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
          {window.innerWidth < 768 ? (
            <Sidebar
              backgroundColor="#fff"
              transitionDuration={800}
              onBackdropClick={() => setMobileToggled(false)}
              toggled={mobileToggled}
              breakPoint="always"
            >
              <Menu>
                <div className="p-3 pb-4 text-center">
                  <div className="h5 fw-bold" style={{ color: "var(--blue-color)" }}>
                    SMKN 1 Lumban Julu
                  </div>
                </div>
                <MenuItem
                  onClick={() => handleMenuClick("dashboard", "/")}
                  icon={<IoGrid />}
                  style={{
                    position: "relative",
                    backgroundColor: selectedMenu === "dashboard" ? "#E5EAF2" : "",
                  }}
                  className={`fw-medium ${selectedMenu === "dashboard" ? "text-blue" : "text-dark-soft"}`}
                >
                  {selectedMenu === "dashboard" && (
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "4px", backgroundColor: "var(--blue-color)" }} />
                  )}
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClick("berita", "/berita")}
                  icon={<FaNewspaper />}
                  style={{
                    position: "relative",
                    backgroundColor: selectedMenu === "berita" ? "#E5EAF2" : "",
                  }}
                  className={`fw-medium ${selectedMenu === "berita" ? "text-blue" : "text-dark-soft"}`}
                >
                  {selectedMenu === "berita" && (
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "4px", backgroundColor: "var(--blue-color)" }} />
                  )}
                  Berita
                </MenuItem>
                <SubMenu icon={<FaGlobe />} label="Menu 2">
                  <MenuItem
                    onClick={() => handleMenuClick("submenu2-1", "/submenu2-1")}
                    style={{
                      position: "relative",
                      backgroundColor: selectedMenu === "submenu2-1" ? "#E5EAF2" : "",
                    }}
                    className={`fw-medium ${selectedMenu === "submenu2-1" ? "text-blue" : "text-dark-soft"}`}
                  >
                    {selectedMenu === "submenu2-1" && (
                      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "4px", backgroundColor: "var(--blue-color)" }} />
                    )}
                    Sub Menu 2 1
                  </MenuItem>
                </SubMenu>
              </Menu>
            </Sidebar>
          ) : (
            <Sidebar
              backgroundColor="#fff"
              collapsed={desktopCollapsed}
              collapsedWidth="0"
              transitionDuration={800}
              style={{ minHeight: "100vh" }}
            >
              <Menu>
                <div className="p-3 pb-4 text-center">
                  <div className="h5 fw-bold" style={{ color: "var(--blue-color)" }}>
                    SMKN 1 Lumban Julu
                  </div>
                </div>

                <MenuItem
                  onClick={() => handleMenuClick("dashboard", "/")}
                  icon={<IoGrid />}
                  style={{
                    position: "relative",
                    backgroundColor: selectedMenu === "dashboard" ? "#E5EAF2" : "",
                  }}
                  className={`fw-medium ${selectedMenu === "dashboard" ? "text-blue" : "text-dark-soft"}`}
                >
                  {selectedMenu === "dashboard" && (
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "4px", backgroundColor: "var(--blue-color)" }} />
                  )}
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClick("berita", "/berita")}
                  icon={<FaNewspaper />}
                  style={{
                    position: "relative",
                    backgroundColor: selectedMenu === "berita" ? "#E5EAF2" : "",
                  }}
                  className={`fw-medium ${selectedMenu === "berita" ? "text-blue" : "text-dark-soft"}`}
                >
                  {selectedMenu === "berita" && (
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "4px", backgroundColor: "var(--blue-color)" }} />
                  )}
                  Berita
                </MenuItem>
                <SubMenu
                  icon={<FaGlobe />}
                  label="Menu 2"
                  rootStyles={{
                    ["." + menuClasses.subMenuContent]: {
                      backgroundColor: "#fff",
                    },
                  }}
                  className="fw-medium"
                >
                  <MenuItem
                    onClick={() => handleMenuClick("submenu2-1", "/submenu2-1")}
                    icon={<FaCircle style={{ fontSize: "8px" }} />}
                    style={{
                      position: "relative",
                      backgroundColor: selectedMenu === "submenu2-1" ? "#E5EAF2" : "",
                    }}
                    className={`fw-medium ${selectedMenu === "submenu2-1" ? "text-blue" : "text-dark-soft"}`}
                  >
                    {selectedMenu === "submenu2-1" && (
                      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "4px", backgroundColor: "var(--blue-color)" }} />
                    )}
                    Sub Menu 2 1
                  </MenuItem>
                </SubMenu>
              </Menu>
            </Sidebar>
          )}
          <main style={{ width: "100%" }}>
            <nav className="navbar py-3 pe-4 bg-body-tertiary">
              <div className="container-fluid">
                <div className="navbar-brand">
                  <button
                    className="btn"
                    style={{ border: "2px solid #021526" }}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setMobileToggled(!mobileToggled);
                      } else {
                        setDesktopCollapsed(!desktopCollapsed);
                      }
                    }}
                  >
                    <FaBars />
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle text-dark"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ border: "2px solid #021526" }}
                    >
                      <FaUserCircle className="me-2" />
                      {userLoginCookie?.user?.name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
            <div className="container-fluid" style={{ paddingTop: "20px" }}>
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default SideBar;
