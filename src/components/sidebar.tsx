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
import { Footer } from "./footer";
import { MdLibraryBooks } from "react-icons/md";
import { LuCheckSquare } from "react-icons/lu";
import { RiSchoolLine } from "react-icons/ri";
import { TbBooks } from "react-icons/tb";
import { Link } from "react-router-dom";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useLayoutEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1200;
      setIsMobile(mobile);
      
      if (mobile) {
        setMobileToggled(false); 
        setDesktopCollapsed(false);
      } else {
        console.log("asd");
        
        setMobileToggled(true);
        setDesktopCollapsed(false);
      }
    };
    handleResize(); 
  
    window.addEventListener("resize", handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }
  
    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setMobileToggled(true);
      setDesktopCollapsed(true);
    } else {
      setMobileToggled(false);
      setDesktopCollapsed(false);
    }
  }, [isMobile]);
  

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
          {isMobile ? (
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
                      if (window.innerWidth < 1200) {
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
                        <Link to='/profil' className="dropdown-item py-3">Profil</Link>
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
                paddingBottom: "1px",
                minHeight: "90vh",
                backgroundColor: "#EFF2F5",
              }}
            >
              {children}
              <Footer />
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
    console.log(location.pathname);
    setSelectedMenu(location.pathname);
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
          backgroundColor: selectedMenu === "/" ? "#E5EAF2" : "",
        }}
        className={`fw-medium ${
          selectedMenu === "/" ? "text-blue" : "text-dark-soft"
        }`}
      >
        {selectedMenu === "/" && (
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
          backgroundColor: selectedMenu === "/berita" ? "#E5EAF2" : "",
        }}
        className={`fw-medium ${
          selectedMenu === "/berita" ? "text-blue" : "text-dark-soft"
        }`}
      >
        {selectedMenu === "/berita" && (
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
      {userLoginCookie?.role === "STUDENT" && (
        <>
          <MenuItem
            onClick={() => handleMenuClick("/nilai")}
            icon={<MdLibraryBooks />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "/nilai" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/nilai"
                ? "text-blue"
                : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/nilai" && (
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
          <MenuItem
            onClick={() => handleMenuClick("/absensi")}
            icon={<LuCheckSquare />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "/absensi" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/absensi" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/absensi" && (
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
            onClick={() => handleMenuClick("/kelas")}
            icon={<RiSchoolLine />}
            style={{
              position: "relative",
              backgroundColor: selectedMenu === "/kelas" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/kelas" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/kelas" && (
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
            Kelas Saya
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("/mata-pelajaran")}
            icon={<TbBooks />}
            style={{
              position: "relative",
              backgroundColor: selectedMenu === "/mata-pelajaran" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/mata-pelajaran" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/mata-pelajaran" && (
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
            Mata Pelajaran
          </MenuItem>
        </>
      )}
      {/* pengelolaan siswa | TEACHER */}
      {userLoginCookie?.role === "TEACHER" && (
        <>
          <MenuItem
            onClick={() => handleMenuClick("/guru/mata-pelajaran")}
            icon={<TbBooks />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "/guru/mata-pelajaran" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/guru/mata-pelajaran"
                ? "text-blue"
                : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/guru/mata-pelajaran" && (
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
            Mata Pelajaran
          </MenuItem>

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
              onClick={() => handleMenuClick("/pengelolaan-siswa/absensi-siswa")}
              icon={<FaCircle style={{ fontSize: "8px" }} />}
              style={{
                position: "relative",
                backgroundColor:
                  selectedMenu === "/pengelolaan-siswa/absensi-siswa" ? "#E5EAF2" : "",
              }}
              className={`fw-medium ${
                selectedMenu === "/pengelolaan-siswa/absensi-siswa"
                  ? "text-blue"
                  : "text-dark-soft"
              }`}
            >
              {selectedMenu === "/pengelolaan-siswa/absensi-siswa" && (
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
              onClick={() => handleMenuClick("/pengelolaan-siswa/daftar-siswa")}
              icon={<FaCircle style={{ fontSize: "8px" }} />}
              style={{
                position: "relative",
                backgroundColor:
                  selectedMenu === "/pengelolaan-siswa/daftar-siswa" ? "#E5EAF2" : "",
              }}
              className={`fw-medium ${
                selectedMenu === "/pengelolaan-siswa/daftar-siswa"
                  ? "text-blue"
                  : "text-dark-soft"
              }`}
            >
              {selectedMenu === "/pengelolaan-siswa/daftar-siswa" && (
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
              onClick={() => handleMenuClick("/pengelolaan-siswa/daftar-kelas")}
              icon={<FaCircle style={{ fontSize: "8px" }} />}
              style={{
                position: "relative",
                backgroundColor: selectedMenu === "/pengelolaan-siswa/daftar-kelas" ? "#E5EAF2" : "",
              }}
              className={`fw-medium ${
                selectedMenu === "/pengelolaan-siswa/daftar-kelas" ? "text-blue" : "text-dark-soft"
              }`}
            >
              {selectedMenu === "/pengelolaan-siswa/daftar-kelas" && (
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
              onClick={() => handleMenuClick("/pengelolaan-siswa/nilai-siswa")}
              icon={<FaCircle style={{ fontSize: "8px" }} />}
              style={{
                position: "relative",
                backgroundColor:
                  selectedMenu === "/pengelolaan-siswa/nilai-siswa" ? "#E5EAF2" : "",
              }}
              className={`fw-medium ${
                selectedMenu === "/pengelolaan-siswa/nilai-siswa"
                  ? "text-blue"
                  : "text-dark-soft"
              }`}
            >
              {selectedMenu === "/pengelolaan-siswa/nilai-siswa" && (
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
              Nilai Siswa
            </MenuItem>
          </SubMenu>
          
        </>
      )}
      {/* Config | STAFF */}
      {userLoginCookie?.role === "STAFF" && (
        <SubMenu
          icon={<FaGlobe />}
          label="Content Web"
          rootStyles={{
            ["." + menuClasses.subMenuContent]: {
              backgroundColor: "#fff",
            },
          }}
          className="fw-medium"
        >
          <MenuItem
            onClick={() => handleMenuClick("/content-web/banner")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "/content-web/banner" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/content-web/banner" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/content-web/banner" && (
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
            Banner
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuClick("/content-web/sekolah")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "/content-web/sekolah" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/content-web/sekolah" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/content-web/sekolah" && (
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
            onClick={() => handleMenuClick("/content-web/jurusan")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "/content-web/jurusan" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/content-web/jurusan" ? "text-blue" : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/content-web/jurusan" && (
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
            onClick={() => handleMenuClick("/content-web/fasilitas")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "/content-web/fasilitas" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/content-web/fasilitas"
                ? "text-blue"
                : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/content-web/fasilitas" && (
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
            onClick={() => handleMenuClick("/content-web/ekstra-kurikuler")}
            icon={<FaCircle style={{ fontSize: "8px" }} />}
            style={{
              position: "relative",
              backgroundColor:
                selectedMenu === "/content-web/ekstra-kurikuler" ? "#E5EAF2" : "",
            }}
            className={`fw-medium ${
              selectedMenu === "/content-web/ekstra-kurikuler"
                ? "text-blue"
                : "text-dark-soft"
            }`}
          >
            {selectedMenu === "/content-web/ekstra-kurikuler" && (
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
