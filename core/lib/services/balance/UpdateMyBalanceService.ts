import { Balance } from "../../entities";
import { BalanceRepository } from "../../frameworks";
import { UpdateMyBalanceServiceModel } from "../../useCases";

export class UpdateMyBalanceService implements UpdateMyBalanceServiceModel {
  async updateMyBalance(type: 'income' | 'outcome', value: number): Promise<Balance> {
    const balanceRepository = new BalanceRepository();

    return balanceRepository.updateMyBalance(type, value);
  }
}