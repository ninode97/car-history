import React, { useContext } from "react";
import IntegerInput from "../../app/common/FormInputs/IntegerInput";
import TextInput from "../../app/common/FormInputs/TextInput";
import TimeInput from "../../app/common/FormInputs/TimeInput";
import DefaultPage from "../DefaultPage";
import DateTime from "react-datetime";
import DateTimePicker from "../../app/common/FormInputs/DateTimePicker";
import BrandSelector from "../../app/common/FormInputs/BrandSelector";
import { useQuery } from "react-query";
import { CarBrandResponse } from "../../app/models/car";
import api from "../../app/api/agent";
import CompanySelector from "../../app/common/FormInputs/CompanySelector";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const AddCar = () => {
  const rootStore = useContext(RootStoreContext);
  const { carsStore } = rootStore;

  const brands = useQuery<any, any, CarBrandResponse, any>(["brands"], () =>
    api.Brand.get()
  );

  return (
    <DefaultPage>
      <div className="md:grid md:grid-cols-1 md:gap-6 mb-8">
        {brands.isLoading ? (
          "Loading brands"
        ) : (
          <div className="mt-5 md:mt-0 md:col-span-2 mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                carsStore.addCar();
              }}
            >
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <BrandSelector
                      brands={brands.data?.data || []}
                      brandModelValue={carsStore.newCar.modelId}
                      onBrandModelChange={(value) =>
                        carsStore.onModelIdChange(value)
                      }
                    />
                    <DateTimePicker
                      label="Acquired On"
                      name="acquiredDate"
                      value={carsStore.newCar.acquiredDate}
                      onChange={(e: any) => carsStore.onAcquiredDateChange(e)}
                    />
                    <DateTimePicker
                      label="Insurance From"
                      name="insuranceValidFrom"
                      value={carsStore.newCar.insuranceValidFrom}
                      onChange={(e: any) =>
                        carsStore.onInsuranceValidFromChange(e)
                      }
                    />
                    <DateTimePicker
                      label="Insurance Expires"
                      name="insuranceExpiresOn"
                      value={carsStore.newCar.insuranceExpiresOn}
                      onChange={(e: any) =>
                        carsStore.onInsuranceExpiresOnChange(e)
                      }
                    />
                    <DateTimePicker
                      label="Tech From"
                      name="technicalInspectionValidFrom"
                      value={carsStore.newCar.technicalInspectionValidFrom}
                      onChange={(e: any) =>
                        carsStore.onTechnicalInspectionValidFromChange(e)
                      }
                    />
                    <DateTimePicker
                      label="Tech Expires"
                      name="technicalInspectionExpiresOn"
                      value={carsStore.newCar.technicalInspectionExpiresOn}
                      onChange={(e: any) =>
                        carsStore.onTechnicalInspectionExpiresOnChange(e)
                      }
                    />
                    <TextInput
                      value={carsStore.newCar.plateCode}
                      onChange={(e) => carsStore.onPlateCodeChange(e)}
                      label="Plate Code"
                      placeHolder="AAA:000"
                      name="plateCode"
                    />
                    <TextInput
                      value={carsStore.newCar.vinCode}
                      onChange={(e) => carsStore.onVinCodeChange(e)}
                      label="VIN"
                      placeHolder="4Y1SL65848Z411439"
                      name="vinCode"
                    />
                    <IntegerInput
                      value={carsStore.newCar.year?.toString() || ""}
                      onChange={(e) => carsStore.onYearChange(e)}
                      label="Year"
                      placeHolder="2020"
                      name="year"
                    />
                    <CompanySelector
                      value={carsStore.newCar.companyId.toString()}
                      onChange={(value) => carsStore.onCompanyIdChange(value)}
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-8">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </DefaultPage>
  );
};

export default observer(AddCar);
