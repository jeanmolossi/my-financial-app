import { Balance } from "../entities";
import { GetMyLastBalanceService,
  UpdateMyBalanceService,
  AdjustMyBalanceService,
  SubscribeMyBalanceService
} from "../services";
import {
  AdjustMyBalanceInteractor,
  GetMyLastBalanceInteractor,
  SubscribeMyBalanceInteractor,
  UpdateMyBalanceInteractor
} from "../useCases";

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