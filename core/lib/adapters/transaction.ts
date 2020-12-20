import { Transaction } from "../entities";
import { TransactionsRepository } from "../frameworks";
import { GetAuthService, GetMyTransactionsService } from "../services";
import { SubscribeTransactionsService } from "../services/transaction/SubscribeTransactionsService";
import { GetMyTransactionsInteractor, SubscribeTransactionsInteractor } from "../useCases";


export class TransactionAdapter {
  async getMyTransactions(): Promise<Transaction[]> {
    const transactionsService = new GetMyTransactionsService();
    const authUserService = new GetAuthService();
    const interactor = new GetMyTransactionsInteractor(
      transactionsService,
      authUserService
    );

    return interactor.getMyTransactions();
  }

  async subscribeTransactions(callback: (transactions: Transaction[]) => void) {
    const service = new SubscribeTransactionsService();
    const interactor = new SubscribeTransactionsInteractor(service);

    return interactor.subscribeTransactions(callback);
  }
}