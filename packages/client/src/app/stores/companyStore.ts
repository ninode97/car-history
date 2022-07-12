import { RootStore } from "./rootStore";
import { action, makeAutoObservable, observable } from "mobx";
import api from "../api/agent";
import format from "date-fns/format";
import { User, UserRoleEnumeration } from "../models/user";
import agent from "../api/agent";
import { ToastMessage } from "../../App";
import { Company } from "../models/company";

export default class CompanyStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  companyState: Partial<Company> = {
    name: "",
  };

  @action onNameChanged(e: any) {
    this.companyState.name = e.target.value;
  }
  @action async create() {
    try {
      const data = await agent.Company.create(this.companyState);
      ToastMessage("success", "Company added");
      history.back();
    } catch (error: any) {
      const message = error.data.message;
      ToastMessage("error", Array.isArray(message) ? message[0] : message);
    }
  }

  @action async update() {
    try {
      const data = await agent.User.update();
    } catch (error) {}
  }

  @action async delete() {
    try {
      const data = await agent.User.delete();
    } catch (error) {}
  }
}
