import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import RoleSelector from "../../app/common/FormInputs/RoleSelector";
import TextInput from "../../app/common/FormInputs/TextInput";
import { UserRoleEnumeration } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import DefaultPage from "../DefaultPage";

const UserAdd = () => {
  const { userStore } = useContext(RootStoreContext);

  return (
    <DefaultPage>
      <div className="md:grid md:grid-cols-1 md:gap-6 mb-8">
        <div className="mt-5 md:mt-0 md:col-span-2 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              userStore.create();
            }}
          >
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  <TextInput
                    value={userStore.userState.email || ""}
                    onChange={(e) => userStore.onEmailChange(e)}
                    label="Email"
                    placeHolder="john@gmail.com"
                    name="email"
                  />
                  <TextInput
                    value={userStore.userState.name || ""}
                    onChange={(e) => userStore.onNameChange(e)}
                    label="Name"
                    placeHolder="John"
                    name="name"
                  />
                  <TextInput
                    value={userStore.userState.surname || ""}
                    onChange={(e) => userStore.onSurnameChange(e)}
                    label="Surname"
                    placeHolder="Dale"
                    name="surname"
                  />
                  <RoleSelector
                    onChange={(e) => userStore.onRoleIdChanged(e)}
                    value={`${
                      userStore.userState.userRoleId ||
                      UserRoleEnumeration.REGULAR
                    }`}
                  />
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-8">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultPage>
  );
};

export default observer(UserAdd);
