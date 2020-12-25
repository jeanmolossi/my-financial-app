import { User } from "../../entities/User";

export interface OnAuthStateChangedServiceModel {
  onAuthStateChanged: (callback: (user: User) => void) => Promise<void>;
}

export class OnAuthStateChangedInteractor {
  private onAuthStateChangedService: OnAuthStateChangedServiceModel;

  constructor(onAuthStateChangedService: OnAuthStateChangedServiceModel) {
    this.onAuthStateChangedService = onAuthStateChangedService;
  }

  async onAuthStateChanged(callback: (user: User) => void): Promise<void> {
    return this.onAuthStateChangedService.onAuthStateChanged(callback);
  }
}