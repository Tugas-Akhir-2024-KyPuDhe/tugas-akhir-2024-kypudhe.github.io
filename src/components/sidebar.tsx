import React, { ReactNode, useState, useLayoutEffect, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaCircle,
  FaFileLines,
  FaGlobe,
  FaNewspaper,
} from "react-icons/fa6";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
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
  const [mobileToggled, setMobileToggled] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
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
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!userLoginCookie) {
      navigate("/login");
    }
  }, [userLoginCookie, navigate]);

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
              transitionDuration={600}
              onBackdropClick={() => setMobileToggled(false)}
              toggled={mobileToggled}
              breakPoint="always"
            >
              <ListMenu />
            </Sidebar>
          ) : (
            <Sidebar
              backgroundColor="#fff"
              collapsed={desktopCollapsed}
              collapsedWidth="0"
              transitionDuration={600}
              style={{ minHeight: "100vh" }}
            >
              <ListMenu />
            </Sidebar>
          )}
          <main style={{ width: "100%" }}>
            <nav
              className="navbar py-3 pe-4 shadow-sm"
              style={{ backgroundColor: "#fff" }}
            >
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
                    >
                      <FaUserCircle className="me-3 fs-3" />
                      {userLoginCookie?.name}
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      style={{ width: "250px" }}
                    >
                      <li>
                        <button className="dropdown-item py-3">Profil</button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item py-3"
                          onClick={handleLogout}
                        >
                          Other
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item py-3"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
            <div
              className="container-fluid"
              style={{
                paddingTop: "20px",
                paddingBottom: "20px",
                minHeight: "90vh",
                backgroundColor: "#EFF2F5",
              }}
            >
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default SideBar;

export const ListMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedMenu("dashboard");
        break;
      case "/berita":
        setSelectedMenu("berita");
        break;
      case "/config-sekolah":
        setSelectedMenu("config-sekolah");
        break;
      case "/config-jurusan":
        setSelectedMenu("config-jurusan");
        break;
      case "/config-fasilitas":
        setSelectedMenu("config-fasilitas");
        break;
      case "/config-ekstra-kurikuler":
        setSelectedMenu("config-ekstra-kurikuler");
        break;
      case "/absensi-siswa":
        setSelectedMenu("absensi-siswa");
        break;
      case "/daftar-siswa":
        setSelectedMenu("daftar-siswa");
        break;
      case "/data-kelas":
        setSelectedMenu("data-kelas");
        break;
      case "/nilai-siswa":
        setSelectedMenu("nilai-siswa");
        break;
      default:
        setSelectedMenu("");
    }
  }, [location.pathname]);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <Menu>
      <div className="p-3 pb-4 text-center">
        <div className="h5 fw-bold" style={{ color: "var(--blue-color)" }}>
          SMKN 1 Lumban Julu
        </div>
      </div>
      {/* <MenuItem disabled className="fw-medium">
            Menu
          </MenuItem> */}
      <MenuItem
        onClick={() => handleMenuClick("/")}
        icon={<IoGrid />}
        style={{
          position: "relative",
          backgroundColor: selectedMenu === "dashboard" ? "#E5EAF2" : "",
        }}
        className={`fw-medium ${
          selectedMenu === "dashboard" ? "text-blue" : "text-dark-soft"
        }`}
      >
        {selectedMenu === "dashboard" && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              backgroundColor: "var(--blue-color)",
            }}
          />
        )}
        Dashboard
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuClick("/berita")}
        icon={<FaNewspaper />}
        style={{
          position: "relative",
          backgroundColor: selectedMenu === "berita" ? "#E5EAF2" : "",
        }}
        className={`fw-medium ${
          selectedMenu === "berita" ? "text-blue" : "text-dark-soft"
        }`}
      >
        {selectedMenu === "berita" && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              backgroundColor: "var(--blue-color)",
            }}
          />
        )}
        Berita
      </MenuItem>
      {userLoginCookie?.role === "STAFF" && (
        <SubMenu
          icon={<FaFileLines />}
          label="Pengelolaan Siswa"
          rootStyles={{
            ["." + menuClasses.subMenuContent]: {
              backgroundColor: "#fff",
            },
          }}
          className="fw-medium"
        >
          <MenuItem
            onClick={() => handleMenuClick("/absensi-siswa")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "absensi-siswa" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "absensi-siswa" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "absensi-siswa" && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            )}
            Absensi
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("/daftar-siswa")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor: selectedMenu === "daftar-siswa" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "daftar-siswa" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "daftar-siswa" && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            )}
            Daftar Siswa
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("/data-kelas")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor: selectedMenu === "data-kelas" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "data-kelas" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "data-kelas" && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            )}
            Data Kelas
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("/nilai-siswa")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor: selectedMenu === "nilai-siswa" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "nilai-siswa" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "nilai-siswa" && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            )}
            Nilai
          </MenuItem>
        </SubMenu>
      )}
      {userLoginCookie?.role === "STAFF" && (
        <SubMenu
          icon={<FaGlobe />}
          label="Config"
          rootStyles={{
            ["." + menuClasses.subMenuContent]: {
              backgroundColor: "#fff",
            },
          }}
          className="fw-medium"
        >
          <MenuItem
            onClick={() => handleMenuClick("/config-sekolah")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "config-sekolah" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "config-sekolah" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "config-sekolah" && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            )}
            Sekolah
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("/config-jurusan")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "config-jurusan" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "config-jurusan" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "config-jurusan" && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            )}
            Jurusan
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("/config-fasilitas")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "config-fasilitas" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "config-fasilitas"
                ? "text-blue"
                : "text-dark-soft"
            }`}
          >
            {selectedMenu === "config-fasilitas" && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            )}
            Fasilitas
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("/config-ekstra-kurikuler")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "config-ekstra-kurikuler" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "config-ekstra-kurikuler"
                ? "text-blue"
                : "text-dark-soft"
            }`}
          >
            {selectedMenu === "config-ekstra-kurikuler" && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "var(--blue-color)",
                }}
              />
            )}
            Ekstra Kurikuler
          </MenuItem>
        </SubMenu>
      )}
    </Menu>
  );
};
