import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

type SidebarLinkProps = {
  linkPath: string;
  label: string;
  Icon: any;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ linkPath, Icon, label }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { pathname } = location;

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        pathname === linkPath && "bg-gray-900"
      }`}
    >
      <NavLink
        to={linkPath}
        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
          pathname === linkPath && "hover:text-gray-200"
        }`}
      >
        <div className="flex items-center">
          {pathname === linkPath ? (
            <Icon className={`shrink-0 h-6 w-6 text-indigo-600`} />
          ) : (
            <Icon className={`shrink-0 h-6 w-6 text-gray-600 `} />
          )}
          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
            {t(label)}
          </span>
        </div>
      </NavLink>
    </li>
  );
};

type SidebarGroupLinkProps = {
  to: string;
  label: string;
};
export const SidebarGroupLink: React.FC<SidebarGroupLinkProps> = ({
  to,
  label,
}) => {
  return (
    <li className="mb-1 last:mb-0">
      <NavLink
        to={to}
        className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
      >
        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
          {label}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarLink;
