import axios, { AxiosError, AxiosResponse } from "axios";
import { ToastMessage } from "../../App";
import {
  Car,
  CarBrandResponse,
  CarModelResponse,
  CarsResponse,
  CreateCarModelRequest,
  CreateCarModelResponse,
  PostCar,
} from "../models/car";
import {
  CreateCompanyRequest,
  CreateCompanyResponse,
  GetCompaniesResponse,
} from "../models/company";
import { LoginCredentials, LoginResponse } from "../models/general";
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  UpdateUserResponse,
  UsersRequest,
  UsersResponse,
} from "../models/user";

class Agent {
  private baseURL: string;
  private apiPrefix: string;
  constructor() {
    this.baseURL =
      (import.meta.env.API_HOST as string) || origin.replace("3000", "5000");
    console.log(this.baseURL);
    this.apiPrefix = "/api";
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = this.baseURL;
    this.registerRequestInterceptors();
    this.registerResponseInterceptors();
  }

  get endpoint() {
    return this.baseURL;
  }

  get localeURL() {
    return `${this.baseURL}/lang/{{lng}}`;
  }

  getURI(url: string) {
    // return `${this.apiPrefix}/${url}`;
    return `${this.baseURL}/${url}`;
  }

  get(url: string) {
    url = this.getURI(url);
    return axios.get(url, {}).then(this.responseBody);
  }
  getWithParams(url: string, params: any) {
    url = this.getURI(url);
    return axios.get(url, { params }).then(this.responseBody);
  }
  post(url: string, body: {}) {
    url = this.getURI(url);
    return axios.post(url, body, {}).then(this.responseBody);
  }
  put(url: string, body: {}) {
    url = this.getURI(url);
    return axios.put(url, body, {}).then(this.responseBody);
  }
  delete(url: string) {
    url = this.getURI(url);
    return axios.delete(url, {}).then(this.responseBody);
  }
  postForm(url: string, file: Blob) {
    url = this.getURI(url);
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(this.responseBody);
  }

  responseBody(response: AxiosResponse) {
    return response.data;
  }

  registerRequestInterceptors() {
    axios.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  registerResponseInterceptors() {
    axios.interceptors.response.use(undefined, (error) => {
      if (error.message === "Network Error" && !error.response) {
        ToastMessage("error", "Network Error");
        throw error;
      }

      if (error?.response?.status === 500) {
        ToastMessage("error", "Internal Error");
        // toast.error("Server error - check the terminal for more info!");
      }
      throw error.response;
    });
  }
}

const agent = new Agent();

const Car = {
  get: (skip = 0, take = 10): Promise<CarsResponse> =>
    agent.get(`car?skip=${skip}&take=${take}`),
  post: (car: PostCar) => agent.post("car", car),
};

const Brand = {
  get: (): Promise<CarBrandResponse> => agent.get(`brand`),
};

const Model = {
  get: (id: number): Promise<CarModelResponse> =>
    agent.get(`brand/${id}/model`),
  create: (dto: CreateCarModelRequest): Promise<CreateCarModelResponse> => {
    return agent.post(`brand/${dto.brandId}/model`, dto);
  },
};

const Company = {
  get: (): Promise<GetCompaniesResponse> => agent.get(`company`),
  create: (dto: CreateCompanyRequest): Promise<CreateCompanyResponse> => {
    return agent.post("company", dto);
  },
};

const General = {
  login: (credentials: LoginCredentials): Promise<LoginResponse> =>
    agent.post("auth/login", credentials),

  current: () => agent.get("auth/current"),
  logout: () => agent.post("auth/logout", {}),
};

export const Language = {
  loadPath: agent.localeURL,
};

const User = {
  get: (dto: UsersRequest): Promise<UsersResponse> => {
    const searchObj: any = {};
    Object.keys(dto).forEach((key) => {
      const t = dto as any;
      const val = t[key];
      val && (searchObj[key] = val);
    });
    return agent.getWithParams(
      "/user",
      new URLSearchParams(searchObj).toString()
    );
  },
  create: (dto: CreateUserRequest): Promise<CreateUserResponse> => {
    return agent.post("user", dto);
  },
  update: (): Promise<UpdateUserResponse> => {
    return agent.put("user", {});
  },
  delete: (): Promise<DeleteUserResponse> => {
    return agent.delete("user");
  },
};

interface ErrorData {
  message: string;
}

interface AxiosErrorData {
  [name: number]: ErrorData;
  other: {
    message: string;
  };
}

class AxiosErrorHandler {
  constructor() {}

  isAxiosError(error: any): error is AxiosResponse {
    return true;
  }

  handleError(error: any, statusCodeData: AxiosErrorData) {
    this.isAxiosError(error)
      ? this.handleAxiosError(error, statusCodeData)
      : this.handleUnkownError(error, statusCodeData);
  }
  handleAxiosError(error: AxiosResponse, statusCodeData: AxiosErrorData) {
    const statusCode = error.status;
    const errorData = statusCodeData[statusCode] || statusCodeData.other;
    ToastMessage("error", errorData.message);
  }
  handleUnkownError(error: any, statusCodeData: AxiosErrorData) {
    ToastMessage("error", statusCodeData.other.message);
  }
}

const axiosErrorHandler = new AxiosErrorHandler();

export default {
  Car,
  Brand,
  Model,
  Company,
  General,
  Language,
  User,
  axiosErrorHandler,
};
