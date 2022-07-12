import React from "react";
import { NavLink } from "react-router-dom";

type GridTableActionProps = {
  to: string;
  children?: JSX.Element[] | JSX.Element;
};

const GridTableAction: React.FC<GridTableActionProps> = ({ children, to }) => {
  return (
    <div className="flex flex-col">
      <NavLink
        className="w-full btn bg-indigo-500 hover:bg-indigo-600 text-white"
        to={to}
      >
        <svg
          className="w-4 h-4 fill-current opacity-50 shrink-0"
          viewBox="0 0 16 16"
        >
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2"> Add</span>
      </NavLink>
    </div>
  );
};

export default GridTableAction;
