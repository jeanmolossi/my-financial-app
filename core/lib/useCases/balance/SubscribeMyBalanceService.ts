export interface SubscribeMyBalanceServiceModel {
  subscribeMyBalance: (callback: (balance: string) => void) => Promise<() => void>;
}

export class SubscribeMyBalanceInteractor {
  private subscribeMyBalanceService: SubscribeMyBalanceServiceModel;

  constructor(subscribeMyBalanceService: SubscribeMyBalanceServiceModel) {
    this.subscribeMyBalanceService = subscribeMyBalanceService;
  }

  async subscribeMyBalance(callback: (balance: string) => void): Promise<() => void> {
    return this.subscribeMyBalanceService.subscribeMyBalance(callback);
  }
}