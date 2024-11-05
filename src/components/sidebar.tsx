import React, { ReactNode, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaCircle, FaGlobe, FaNewspaper } from "react-icons/fa6";
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
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
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

  const handleMenuClick = (menu: string, path: string) => {
    setSelectedMenu(menu);
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
                    onClick={() => handleMenuClick("submenu2-1", "/")}
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
                    onClick={() => handleMenuClick("submenu2-1", "/")}
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
                        console.log("1");
                        setMobileToggled(!mobileToggled);
                      } else {
                        console.log("2");
                        setDesktopCollapsed(!desktopCollapsed);
                      }
                    }}
                  >
                    <FaBars className="fs-4" />
                  </button>
                </div>
                <div className="dropdown">
                  <a
                    className="dropdown-toggle text-decoration-none text-dark-soft"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserCircle className="fs-3 me-2" />
                    {userLoginCookie.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {children}
          </main>
        </div>
      )}
    </>
  );
};
