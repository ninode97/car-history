import { PaginationProps } from "./shared";

export interface CarsRequest extends PaginationProps {}
export interface CarsResponse extends PaginationProps {
  data: Car[];
}

export type PostCar = {
  plateCode: string;
  vinCode: string;
  companyId: number;
  modelId: number;
  year: number;
  acquiredDate: string;
  insuranceValidFrom: string;
  insuranceExpiresOn: string;
  technicalInspectionValidFrom: string;
  technicalInspectionExpiresOn: string;
};

export type Car = {
  id: number;
  plateCode: string;
  vinCode: string;
  userId: number;
  companyId: number;
  modelId: number;
  year: number;
  acquiredDate: string;
  insuranceValidFrom: string;
  insuranceExpiresOn: string;
  technicalInspectionValidFrom: string;
  technicalInspectionExpiresOn: string;
  model: CarModel;
};

export type CarModelResponse = {
  data: CarModel[];
};

export type CarModel = {
  id: number;
  name: string;
  brandId: number;
  Brand: CarBrand;
};

export type CarBrandResponse = {
  data: CarBrand[];
};

export type CarBrand = {
  id: number;
  name: string;
};

export type CreateCarModelRequest = Partial<CarModel>;
export type CreateCarModelResponse = {
  model: CarModel;
};
