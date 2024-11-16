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
    <ul
      className="nav nav-underline"
      style={{ borderBottom: "0.5px solid grey" }}
    >
      {menuItems.map((item) => (
        <li className="nav-item" style={{ cursor: "pointer" }} key={item.key}>
          <a
            className={`nav-link text-blue ${
              activeMenu === item.key ? "active" : ""
            }`}
            onClick={() => onMenuClick(item.key)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};
