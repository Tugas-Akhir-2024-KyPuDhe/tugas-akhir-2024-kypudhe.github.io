import React from "react";

interface MenuItem {
  label: string;
  key: string;
}

interface NavMenuProps {
  menuItems: MenuItem[];
  activeMenu: string;
  onMenuClick: (key: string) => void;
}

export const NavSubMenu: React.FC<NavMenuProps> = ({
  menuItems,
  activeMenu,
  onMenuClick,
}) => {
  return (
    <div className="px-3 m-1 m-lg-4 m-md-4 my-4 rounded bg-white">
      <ul className="nav nav-underline">
        {menuItems.map((item) => (
          <li className="nav-item" style={{ cursor: "pointer" }} key={item.key}>
            <a
              className={`nav-link my-2 ${
                activeMenu === item.key
                  ? "active text-blue fw-bold"
                  : "text-dark"
              }`}
              onClick={() => onMenuClick(item.key)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
