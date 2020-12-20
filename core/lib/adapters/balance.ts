import { Balance } from "../entities";
import { GetMyLastBalanceService } from "../services";
import { GetMyLastBalanceInteractor } from "../useCases";

export class BalanceAdapter {
  async getMyLastBalance(): Promise<Balance> {
    const service = new GetMyLastBalanceService();
    const interactor = new GetMyLastBalanceInteractor(service);

    return interactor.getMyLastBalance();
  }
}