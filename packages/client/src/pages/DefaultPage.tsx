import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatDateString } from "../app/helpers";
import { RootStoreContext } from "../app/stores/rootStore";
import Datepicker from "../partials/actions/Datepicker";
import FilterButton from "../partials/actions/FilterButton";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import Header from "../partials/Header";
import Sidebar from "../partials/sidebar/Sidebar";

type DefaultPageProps = {
  children: JSX.Element | JSX.Element[] | null;
};

const DefaultPage: React.FC<DefaultPageProps> = ({ children }) => {
  const rootStore = useContext(RootStoreContext);
  const { commonStore } = rootStore;
  const { sidebarOpen, setSidebarOpen } = commonStore;

  return (
    <React.Fragment>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              <WelcomeBanner />

              {/* Dashboard actions */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Avatars */}
                <DashboardAvatars />

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  {/* Filter button */}
                  <FilterButton />
                  {/* Datepicker built with flatpickr */}
                  <Datepicker />
                  {/* Add view button */}
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add view</span>
                  </button>
                </div>
              </div>

              {children}
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(DefaultPage);
