import { BalanceRepository } from "../../frameworks";
import { SubscribeMyBalanceServiceModel } from "../../useCases";

export class SubscribeMyBalanceService implements SubscribeMyBalanceServiceModel {
  async subscribeMyBalance(callback: (balance: string) => void): Promise<() => void> {
    const balanceRepository = new BalanceRepository();

    return balanceRepository.subscribeMyBalance(callback);
  }
}