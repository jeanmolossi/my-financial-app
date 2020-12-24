import { Balance } from "../../entities";

export interface AdjustMyBalanceServiceModel {
  adjustMyBalance: (value: string) => Promise<Balance>
}

export class AdjustMyBalanceInteractor {
  private adjustMyBalanceService: AdjustMyBalanceServiceModel;

  constructor(adjustMyBalanceService: AdjustMyBalanceServiceModel) {
    this.adjustMyBalanceService = adjustMyBalanceService;
  }

  async adjustMyBalance(value: string): Promise<Balance> {
    return this.adjustMyBalanceService.adjustMyBalance(value);
  }
}