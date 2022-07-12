import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserRoleEnumeration, userRoleTranslations } from "../../models/user";
import { RootStoreContext } from "../../stores/rootStore";

type RoleSelectorProps = {
  onChange: (e: any) => void;
  value: string;
};
const RoleSelector: React.FC<RoleSelectorProps> = ({ onChange, value }) => {
  const { t } = useTranslation();
  return (
    <div className="col-span-3 sm:col-span-2">
      <label
        htmlFor={"userRoleId"}
        className="block text-sm font-medium text-gray-700"
      >
        {t("roles.role")}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <select
          onChange={onChange}
          value={value}
          name="userRoleId"
          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
        >
          <option value={UserRoleEnumeration.REGULAR}>
            {t(userRoleTranslations[UserRoleEnumeration.REGULAR])}
          </option>
          <option value={UserRoleEnumeration.MODERATOR}>
            {t(userRoleTranslations[UserRoleEnumeration.MODERATOR])}
          </option>
          <option value={UserRoleEnumeration.ADMINISTRATOR}>
            {t(userRoleTranslations[UserRoleEnumeration.ADMINISTRATOR])}
          </option>
        </select>
      </div>
    </div>
  );
};

export default observer(RoleSelector);
