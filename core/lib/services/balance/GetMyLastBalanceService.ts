import { Balance } from "../../entities";
import { BalanceRepository } from "../../frameworks/firebase/balance_repository";
import { GetMyLastBalanceServiceModel } from "../../useCases/balance/GetMyLastBalanceService";

export class GetMyLastBalanceService implements GetMyLastBalanceServiceModel {
  async geyMyLastBalance (): Promise<Balance> {
    const balanceRepository = new BalanceRepository();

    return balanceRepository.getMyLastBalance();
  }
}