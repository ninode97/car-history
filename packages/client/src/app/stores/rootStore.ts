import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import CarsStore from "./carsStore";
import UserStore from "./userStore";
import CompanyStore from "./companyStore";

configure({ enforceActions: "always" });

export class RootStore {
  commonStore: CommonStore;
  carsStore: CarsStore;
  userStore: UserStore;
  companyStore: CompanyStore;
  // brandManagement: CarBrandManagementStore;

  constructor() {
    this.commonStore = new CommonStore(this);
    this.carsStore = new CarsStore(this);
    this.userStore = new UserStore(this);
    this.companyStore = new CompanyStore(this);
    // this.brandManagement = new CarBrandManagementStore(this);
    
  }
}

export const RootStoreContext = createContext(new RootStore());
