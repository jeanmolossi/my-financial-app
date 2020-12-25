import { BalanceRepository } from "../../frameworks/firebase/balance_repository";
import { SubscribeMyBalanceServiceModel } from "../../useCases/balance/SubscribeMyBalanceService";

export class SubscribeMyBalanceService implements SubscribeMyBalanceServiceModel {
  async subscribeMyBalance(callback: (balance: string) => void): Promise<() => void> {
    const balanceRepository = new BalanceRepository();

    return balanceRepository.subscribeMyBalance(callback);
  }
}