import { RootStore } from "./rootStore";
import { action, makeAutoObservable, observable } from "mobx";
import api from "../api/agent";
import format from "date-fns/format";
import { User, UserRoleEnumeration } from "../models/user";
import agent from "../api/agent";
import { ToastMessage } from "../../App";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  userState: Partial<User> = {
    email: "",
    name: "",
    surname: "",
    userRoleId: UserRoleEnumeration.REGULAR,
  };

  @action onEmailChange(e: any) {
    this.userState.email = e.target.value;
  }
  @action onNameChange(e: any) {
    this.userState.name = e.target.value;
  }
  @action onSurnameChange(e: any) {
    this.userState.surname = e.target.value;
  }
  @action onRoleIdChanged(e: any) {
    this.userState.userRoleId = parseInt(e.target.value);
  }

  @action async create() {
    try {
      const data = await agent.User.create(this.userState);
      ToastMessage("success", "User created");
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
