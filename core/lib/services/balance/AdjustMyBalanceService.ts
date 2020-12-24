import { Balance } from "../../entities";
import { BalanceRepository } from "../../frameworks";
import { AdjustMyBalanceServiceModel } from "../../useCases";

export class AdjustMyBalanceService implements AdjustMyBalanceServiceModel {
  async adjustMyBalance(value: string): Promise<Balance> {
    const balanceRepository = new BalanceRepository();

    return balanceRepository.adjustMyBalance(value);
  }
}