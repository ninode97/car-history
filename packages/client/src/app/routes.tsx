import { Navigate, Outlet } from "react-router-dom";
import AddCar from "../pages/cars/AddCar";
import CarGrid from "../pages/cars/CarGrid";
import InspectCar from "../pages/cars/InspectCar";
import AddCompany from "../pages/companies/AddCompany";
import CompaniesGrid from "../pages/companies/CompaniesGrid";
import ViewCompany from "../pages/companies/ViewCompany";
import Dashboard from "../pages/Dashboard";
import HistoryFeed from "../pages/feed/HistoryFeed";
import Login from "../pages/Login";
import CarBrandManagement from "../pages/settings/CarBrandManagement";
import SettingsPage from "../pages/settings/SettingsPage";
import UserAdd from "../pages/users/UserAdd";
import UserGrid from "../pages/users/UserGrid";
import ViewUser from "../pages/users/ViewUser";

const getRouteElement = (element: JSX.Element, isLoggedIn: boolean) => {
  return isLoggedIn ? element : <Login />;
};
const routes = (isLoggedIn: boolean) => [
  {
    path: "/",
    element: getRouteElement(<Dashboard />, isLoggedIn),
  },
  {
    path: "/cars",
    element: getRouteElement(<CarGrid />, isLoggedIn),
  },
  {
    path: "/cars/add",
    element: getRouteElement(<AddCar />, isLoggedIn),
  },
  {
    path: "/cars/:carId",
    element: getRouteElement(<InspectCar />, isLoggedIn),
  },
  {
    path: "/feed",
    element: getRouteElement(<HistoryFeed />, isLoggedIn),
  },
  {
    path: "/users",
    element: getRouteElement(<UserGrid />, isLoggedIn),
  },
  {
    path: "/users/add",
    element: getRouteElement(<UserAdd />, isLoggedIn),
  },
  {
    path: "/users/:id",
    element: getRouteElement(<ViewUser />, isLoggedIn),
  },
  {
    path: "/companies",
    element: getRouteElement(<CompaniesGrid />, isLoggedIn),
  },
  {
    path: "/companies/:id",
    element: getRouteElement(<ViewCompany />, isLoggedIn),
  },
  {
    path: "/companies/add",
    element: getRouteElement(<AddCompany />, isLoggedIn),
  },
  {
    path: "/settings",
    element: getRouteElement(<SettingsPage />, isLoggedIn),
  },
  {
    path: "/settings/brands",
    element: getRouteElement(<CarBrandManagement />, isLoggedIn),
  },
];

export default routes;
