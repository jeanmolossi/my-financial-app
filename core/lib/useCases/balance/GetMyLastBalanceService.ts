import { Balance } from "../../entities/Balance";

export interface GetMyLastBalanceServiceModel {
  geyMyLastBalance: () => Promise<Balance>;
}

export class GetMyLastBalanceInteractor {
  private getMyLastBalanceService: GetMyLastBalanceServiceModel;

  constructor(getMyLastBalanceService: GetMyLastBalanceServiceModel) {
    this.getMyLastBalanceService = getMyLastBalanceService;
  }

  async getMyLastBalance(): Promise<Balance> {
    return this.getMyLastBalanceService.geyMyLastBalance();
  }
}