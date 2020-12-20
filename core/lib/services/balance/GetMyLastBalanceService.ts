import { Balance } from "../../entities";
import { BalanceRepository } from "../../frameworks";
import { GetMyLastBalanceServiceModel } from "../../useCases";

export class GetMyLastBalanceService implements GetMyLastBalanceServiceModel {
  async geyMyLastBalance (): Promise<Balance> {
    const balanceRepository = new BalanceRepository();

    return balanceRepository.getMyLastBalance();
  }
}