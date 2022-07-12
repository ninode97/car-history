import { observer } from "mobx-react-lite";
import React from "react";
import { useQuery } from "react-query";
import DefaultPage from "../DefaultPage";
import api from "../../app/api/agent";
import { roleTranslationMapper, UsersResponse } from "../../app/models/user";
import GridTable from "../../components/Table/GridTable";
import GridTableHeader, {
  GridTableHeaderEntry,
} from "../../components/Table/GridTableHeader";
import GridTableBody from "../../components/Table/GridTableBody";
import { useTranslation } from "react-i18next";

const headers: GridTableHeaderEntry[] = [
  { key: "email", label: "user.grid.email" },
  { key: "name", label: "user.grid.name" },
  { key: "lastname", label: "user.grid.lastname" },
  { key: "role", label: "user.grid.role" },
  { key: "action", label: "user.grid.actions", isAction: true },
];

const UserGrid = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery<any, any, UsersResponse, any>(
    ["users"],
    () => api.User.get({}),
    {
      retry: false,
    }
  );

  return (
    <DefaultPage>
      {error && <div>{error.data.message}</div>}
      {isLoading === true && <div>Loading...</div>}
      {data !== undefined && (
        <GridTable
          onAddRoute={"/users/add"}
          headers={headers}
          entries={data?.users?.map((user) => ({
            navigateTo: `/users/${user.id}`,
            tds: [
              {
                isAction: false,
                key: "email",
                value: user.email,
              },
              {
                isAction: false,
                key: "name",
                value: user.name,
              },
              {
                isAction: false,
                key: "surname",
                value: user.surname,
              },
              {
                isAction: false,
                key: "userRoleId",
                value: t(roleTranslationMapper(user.userRoleId)),
              },
              {
                isAction: true,
                key: "view",
                value: t("grid.general.view"),
              },
            ],
          }))}
        />
      )}
    </DefaultPage>
  );
};

export default observer(UserGrid);
