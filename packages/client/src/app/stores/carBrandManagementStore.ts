import { RootStore } from "./rootStore";
import { action, makeAutoObservable, runInAction } from "mobx";
import { CarBrand, CarBrandResponse, CarModel } from "../models/car";
import { useQuery, UseQueryResult } from "react-query";
import agent from "../api/agent";

type CachedBrandModels = {
  [key: string]: CarModel[];
};

// export default class CarBrandManagementStore {
//   rootStore: RootStore;
//   constructor(rootStore: RootStore) {
//     this.rootStore = rootStore;
//     makeAutoObservable(this);
//   }

//   currentBrand: string | number = "";

//   brands: CarBrand[] = [];
//   models: CachedBrandModels = {};

//   brandResponse: UseQueryResult<CarBrandResponse, any> | null = null;

//   @action onCurrentBrand(e: any) {
//     this.currentBrand = e.target.value;
//   }

//   @action loadBrands = async () => {
//     const response = useQuery<any, any, CarBrandResponse, any>(["brands"], () =>
//       agent.Brand.get()
//     );
//     runInAction(() => {
//       this.brandResponse = response;
//     });
//   };

//   @action updateBrands = (brands: CarBrand[]) => {
//     runInAction(() => {
//       this.brands = brands;
//     });
//   };

//   @action updateModels = (key: string, models: CarModel[]) => {
//     runInAction(() => {
//       this.models[key] = models;
//     });
//   };
// }

export const CarBrandManagementStore = () => {
  const brandResponse: UseQueryResult<CarBrandResponse, any> | null = null;
};
