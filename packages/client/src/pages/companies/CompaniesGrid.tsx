import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import DefaultPage from "../DefaultPage";
import api from "../../app/api/agent";
import { Company, GetCompaniesResponse } from "../../app/models/company";
import GridTable from "../../components/Table/GridTable";
import { GridTableHeaderEntry } from "../../components/Table/GridTableHeader";

const headers: GridTableHeaderEntry[] = [
  { key: "name", label: "companies.grid.name" },
  { key: "action", label: "user.grid.actions", isAction: true },
];

const CompaniesGrid = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery<
    any,
    any,
    GetCompaniesResponse,
    any
  >(["companies"], () => api.Company.get(), {
    retry: false,
  });

  return (
    <DefaultPage>
      {error && <div>{error.data.message}</div>}
      {isLoading === true && <div>Loading...</div>}
      {data !== undefined && (
        <GridTable
          onAddRoute={"/companies/add"}
          headers={headers}
          entries={data?.data?.map((company) => ({
            navigateTo: `/companies/${company.id}`,
            tds: [
              {
                isAction: false,
                key: "name",
                value: company.name,
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

export default CompaniesGrid;
