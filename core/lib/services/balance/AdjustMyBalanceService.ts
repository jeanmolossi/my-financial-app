import { Balance } from "../../entities/Balance";
import { BalanceRepository } from "../../frameworks/firebase/balance_repository";
import { AdjustMyBalanceServiceModel } from "../../useCases/balance/AdjustMyBalanceService";

export class AdjustMyBalanceService implements AdjustMyBalanceServiceModel {
  async adjustMyBalance(value: string): Promise<Balance> {
    const balanceRepository = new BalanceRepository();

    return balanceRepository.adjustMyBalance(value);
  }
}