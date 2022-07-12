import React from "react";
import { useQuery } from "react-query";
import api from "../../api/agent";
import { GetCompaniesResponse } from "../../models/company";

type CompanySelectorProps = {
  value: string;
  onChange: (e: any) => void;
};

const CompanySelector: React.FC<CompanySelectorProps> = ({
  value,
  onChange,
}) => {
  const companies = useQuery<any, any, GetCompaniesResponse, any>(
    ["companies"],
    () => api.Company.get()
  );

  return (
    <React.Fragment>
      <div className="col-span-3 sm:col-span-2">
        <label
          htmlFor={"companyId"}
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <select
            onChange={onChange}
            value={value}
            name="companyId"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          >
            <option>------</option>
            {companies.data &&
              companies.data.data.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CompanySelector;
