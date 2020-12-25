import { Transaction } from "../../entities/Transaction";

export interface SubscribeTransactionsServiceModel {
  subscribeTransactions: (callback: (transactions: Transaction[]) => void) => Promise<() => void>
}

export class SubscribeTransactionsInteractor {
  private subscribeTransactionsService: SubscribeTransactionsServiceModel;

  constructor(subscribeTransactionsService: SubscribeTransactionsServiceModel) {
    this.subscribeTransactionsService = subscribeTransactionsService;
  }

  async subscribeTransactions(callback: (transactions: Transaction[]) => void): Promise<() => void> {
    return this.subscribeTransactionsService.subscribeTransactions(callback);
  }
}