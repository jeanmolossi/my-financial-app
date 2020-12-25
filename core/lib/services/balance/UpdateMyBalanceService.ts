import { Balance } from "../../entities/Balance";
import { BalanceRepository } from "../../frameworks/firebase/balance_repository";
import { UpdateMyBalanceServiceModel } from "../../useCases/balance/UpdateMyBalanceService";

export class UpdateMyBalanceService implements UpdateMyBalanceServiceModel {
  async updateMyBalance(type: 'income' | 'outcome', value: number): Promise<Balance> {
    const balanceRepository = new BalanceRepository();

    return balanceRepository.updateMyBalance(type, value);
  }
}