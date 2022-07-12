import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { CarBrand } from "../../models/car";
import { RootStoreContext } from "../../stores/rootStore";
import BrandModelSelector from "./BrandModelSelector";

type BrandSelectorProps = {
  brandModelValue: number | string;
  onBrandModelChange: (e: any) => void;
  brands: CarBrand[];
};

const BrandSelector: React.FC<BrandSelectorProps> = ({
  brands,
  brandModelValue,
  onBrandModelChange,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { carsStore } = rootStore;
  return (
    <React.Fragment>
      <div className="col-span-3 sm:col-span-2">
        <label
          htmlFor={"carBrand"}
          className="block text-sm font-medium text-gray-700"
        >
          Brand
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <select
            name="brandId"
            value={carsStore.brand}
            onChange={(e) => {
              carsStore.onBrandChange(e);
            }}
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          >
            <option value={-1}>------</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <BrandModelSelector />
    </React.Fragment>
  );
};

export default observer(BrandSelector);
