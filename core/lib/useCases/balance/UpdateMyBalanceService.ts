import { Balance } from "../../entities";

export interface UpdateMyBalanceServiceModel {
  updateMyBalance: (type: 'income' | 'outcome', value: number) => Promise<Balance>;
}

export class UpdateMyBalanceInteractor {
  private updateMyBalanceService: UpdateMyBalanceServiceModel;

  constructor (updateMyBalanceService: UpdateMyBalanceServiceModel) {
    this.updateMyBalanceService = updateMyBalanceService;
  }

  async updateMyBalance(type: 'income' | 'outcome', value: number): Promise<Balance> {
    return this.updateMyBalanceService.updateMyBalance(type, value);
  }
}