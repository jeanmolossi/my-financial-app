import { Balance } from "../entities/Balance";
import { AdjustMyBalanceService } from "../services/balance/AdjustMyBalanceService";
import { GetMyLastBalanceService } from "../services/balance/GetMyLastBalanceService";
import { SubscribeMyBalanceService } from "../services/balance/SubscribeMyBalanceService";
import { UpdateMyBalanceService } from "../services/balance/UpdateMyBalanceService";
import { AdjustMyBalanceInteractor } from "../useCases/balance/AdjustMyBalanceService";
import { GetMyLastBalanceInteractor } from "../useCases/balance/GetMyLastBalanceService";
import { SubscribeMyBalanceInteractor } from "../useCases/balance/SubscribeMyBalanceService";
import { UpdateMyBalanceInteractor } from "../useCases/balance/UpdateMyBalanceService";

export class BalanceAdapter {
  async getMyLastBalance(): Promise<Balance> {
    const service = new GetMyLastBalanceService();
    const interactor = new GetMyLastBalanceInteractor(service);

    return interactor.getMyLastBalance();
  }

  async updateMyBalance(type: 'income' | 'outcome', value: number): Promise<Balance> {
    const service = new UpdateMyBalanceService();
    const interactor = new UpdateMyBalanceInteractor(service);

    return interactor.updateMyBalance(type, value);
  }

  async adjustMyBalance(value: string): Promise<Balance> {
    const service = new AdjustMyBalanceService();
    const interactor = new AdjustMyBalanceInteractor(service);

    return interactor.adjustMyBalance(value);
  }

  async subscribeMyBalance(callback: (balance: string) => void): Promise<() => void> {
    const service = new SubscribeMyBalanceService();
    const interactor = new SubscribeMyBalanceInteractor(service);

    return interactor.subscribeMyBalance(callback);
  }
}