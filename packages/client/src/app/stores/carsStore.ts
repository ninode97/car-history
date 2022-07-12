import { RootStore } from "./rootStore";
import { action, makeAutoObservable, observable } from "mobx";
import api from "../api/agent";
import format from "date-fns/format";

export enum InspectPageViewsEnum {
  TABLE = "table",
  TIMELINE = "timeline",
}

type NewCar = {
  plateCode: string;
  vinCode: string;
  companyId: number | string;
  modelId: number | string;
  year: number | null;
  acquiredDate: Date;
  insuranceValidFrom: Date;
  insuranceExpiresOn: Date;
  technicalInspectionValidFrom: Date;
  technicalInspectionExpiresOn: Date;
};

export default class CarsStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @observable carPageState = {
    inspectPageDefaultView: InspectPageViewsEnum.TABLE,
  };

  @observable brand: number = -1;
  @observable
  newCar: NewCar = {
    plateCode: "",
    vinCode: "",
    companyId: "------",
    modelId: "------",
    year: 2000,
    acquiredDate: new Date(),
    insuranceValidFrom: new Date(),
    insuranceExpiresOn: new Date(),
    technicalInspectionValidFrom: new Date(),
    technicalInspectionExpiresOn: new Date(),
  };

  @action onModelIdChange(e: any) {
    this.newCar.modelId = e.target.value;
  }

  @action onBrandChange(e: any) {
    this.brand = e.target.value;
  }

  @action onPlateCodeChange(e: any) {
    this.newCar.plateCode = e.target.value;
  }

  @action onVinCodeChange(e: any) {
    this.newCar.vinCode = e.target.value;
  }

  @action onCompanyIdChange(e: any) {
    this.newCar.companyId = e.target.value;
  }

  @action onYearChange(e: any) {
    const year = e.target.value;
    this.newCar.year = year ? parseInt(e.target.value) : null;
  }

  @action onAcquiredDateChange(dateString: string) {
    this.newCar.acquiredDate = new Date(dateString);
  }

  @action onInsuranceValidFromChange(dateString: string) {
    this.newCar.insuranceValidFrom = new Date(dateString);
  }
  @action onInsuranceExpiresOnChange(dateString: string) {
    this.newCar.insuranceExpiresOn = new Date(dateString);
  }
  @action onTechnicalInspectionValidFromChange(dateString: string) {
    this.newCar.technicalInspectionValidFrom = new Date(dateString);
  }
  @action onTechnicalInspectionExpiresOnChange(dateString: string) {
    this.newCar.technicalInspectionExpiresOn = new Date(dateString);
  }

  getNumberId(num: string | number) {
    return typeof num === "string" ? parseInt(num) : num;
  }

  getNumberYear(year: number | null) {
    return year || 0;
  }

  @action async addCar() {
    try {
      console.log({
        plateCode: this.newCar.plateCode,
        vinCode: this.newCar.vinCode,
        companyId: this.getNumberId(this.newCar.companyId),
        modelId: this.getNumberId(this.newCar.modelId),
        year: this.getNumberYear(this.newCar.year),
        acquiredDate: this.newCar.acquiredDate.toISOString(),
        insuranceValidFrom: this.newCar.insuranceValidFrom.toISOString(),
        insuranceExpiresOn: this.newCar.insuranceExpiresOn.toISOString(),
        technicalInspectionValidFrom:
          this.newCar.technicalInspectionValidFrom.toISOString(),
        technicalInspectionExpiresOn:
          this.newCar.technicalInspectionExpiresOn.toISOString(),
      });
      const data = await api.Car.post({
        plateCode: this.newCar.plateCode,
        vinCode: this.newCar.vinCode,
        companyId: this.getNumberId(this.newCar.companyId),
        modelId: this.getNumberId(this.newCar.modelId),
        year: this.getNumberYear(this.newCar.year),
        acquiredDate: this.newCar.acquiredDate.toISOString(),
        insuranceValidFrom: this.newCar.insuranceValidFrom.toISOString(),
        insuranceExpiresOn: this.newCar.insuranceExpiresOn.toISOString(),
        technicalInspectionValidFrom:
          this.newCar.technicalInspectionValidFrom.toISOString(),
        technicalInspectionExpiresOn:
          this.newCar.technicalInspectionExpiresOn.toISOString(),
      });
    } catch (error) {}
  }

  @action validateAddCarForm() {}

  @action changeInspectCarView = (view: InspectPageViewsEnum) => {
    console.log("clicked");
    this.carPageState.inspectPageDefaultView = view;
  };
}
