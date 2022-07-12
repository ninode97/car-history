import { observer } from "mobx-react-lite";
import { useContext } from "react";
import TextInput from "../../app/common/FormInputs/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import DefaultPage from "../DefaultPage";

const AddCompany = () => {
  const { companyStore } = useContext(RootStoreContext);

  return (
    <DefaultPage>
      <div className="md:grid md:grid-cols-1 md:gap-6 mb-8">
        <div className="mt-5 md:mt-0 md:col-span-2 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              companyStore.create();
            }}
          >
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  <TextInput
                    value={companyStore.companyState.name || ""}
                    onChange={(e) => companyStore.onNameChanged(e)}
                    label="Name"
                    placeHolder="Fibaler UAB"
                    name="name"
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

export default observer(AddCompany);
