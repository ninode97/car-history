import { RootStore } from "./rootStore";
import {
  observable,
  action,
  reaction,
  computed,
  makeAutoObservable,
  runInAction,
} from "mobx";
import agent from "../api/agent";
import { ToastMessage } from "../../App";
import { UserRoleEnumeration } from "../models/user";

export default class CommonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.current();
  }

  // @observable token: string | null = window.localStorage.getItem("accessToken");
  @observable isLoading = true;
  @observable sidebarOpen = true;
  @observable user: any = null;

  @computed get currentRole() {
    const userRoleId = this.user?.userRoleId;
    console.log(userRoleId);
    return userRoleId || UserRoleEnumeration.LOGGED_OFF;
  }

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action setSidebarOpen = (state: boolean) => {
    this.sidebarOpen = state;
  };

  @action login = async (e: any, email: string, password: string) => {
    e && e.preventDefault();
    try {
      const user = await agent.General.login({ email, password });
      this.user = user;
    } catch (error: any) {
      agent.axiosErrorHandler.handleError(error, {
        401: {
          message: "Incorrect credentials",
        },
        403: {
          message: "Incorrect credentials",
        },
        other: {
          message: "Failed to sign in",
        },
      });
    }
  };

  @action logout = async () => {
    try {
      await agent.General.logout();
      runInAction(() => {
        this.user = null;
        ToastMessage("info", "Successfully logged out");
      });
    } catch (error) {
      agent.axiosErrorHandler.handleError(error, {
        other: {
          message: "Failed to logout",
        },
      });
    }
  };

  @action current = async () => {
    try {
      const profile = await agent.General.current();
      runInAction(() => {
        this.user = profile;
      });
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  };
}
