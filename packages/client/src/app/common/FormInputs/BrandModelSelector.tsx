import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { CarBrand, CarModelResponse } from "../../models/car";
import api from "../../api/agent";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/rootStore";

const BrandModelSelector = ({}) => {
  const rootStore = useContext(RootStoreContext);
  const { carsStore } = rootStore;
  const { brand, newCar } = carsStore;


  const models = useQuery<any, any, CarModelResponse, any>(
    ["brandModels", brand],
    () => api.Model.get(brand === -1 ? 999999 : brand)
  );
    
  return (
    <React.Fragment>
      {models.isLoading && <div>Loading...</div>}
      {models.data?.data && (
        <div className="col-span-3 sm:col-span-2">
          <label
            htmlFor={"carModel"}
            className="block text-sm font-medium text-gray-700"
          >
            Model
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <select
              onChange={(e) => {
                carsStore.onModelIdChange(e)
              }}
              value={newCar.modelId}
              name="modelId"
              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            >
              <option>------</option>
              {models.data.data.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default observer(BrandModelSelector);
