import { useState } from "react";

import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { NavLink, useNavigate } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useQuery } from "react-query";
import api from "../../app/api/agent";
import { CarsResponse } from "../../app/models/car";
import { formatDateString } from "../../app/helpers";
import DefaultPage from "../DefaultPage";

function CarGrid() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { commonStore } = rootStore;
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<any, any, CarsResponse, any>(
    ["cars"],
    () => api.Car.get(),
    {
      retry: false,
    }
  );

  return (
    <DefaultPage>
      <div>
        {error && <div>{error.data.message}</div>}
        {isLoading === true && <div>Loading...</div>}
        {data !== undefined && (
          <div className="grid">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-md sm:rounded-lg">
                    <table className="min-w-full">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Plate
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Brand
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Year
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Tech
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                          >
                            Insurance
                          </th>
                          <th scope="col" className="relative py-3 px-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.data.map((car) => (
                            <tr
                              onClick={() => navigate(`/cars/${car.id}`)}
                              className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600 hover:bg-indigo-100 cursor-pointer"
                            >
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {car.plateCode}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {car.model.Brand.name} {car.model.name}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {car.year}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {formatDateString(
                                  car.technicalInspectionExpiresOn
                                )}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {formatDateString(car.insuranceExpiresOn)}
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <div className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">
                                  Inspect
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <NavLink
                className="w-full btn bg-indigo-500 hover:bg-indigo-600 text-white"
                to="/cars/add"
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
          </div>
        )}
      </div>
    </DefaultPage>
  );
}

export default observer(CarGrid);
