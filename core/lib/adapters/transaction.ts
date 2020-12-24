import { Transaction } from "../entities";
import { AddNewTransactionService, GetAuthService, GetMyTransactionsService } from "../services";
import { SubscribeTransactionsService } from "../services/transaction/SubscribeTransactionsService";
import { GetMyTransactionsInteractor, SubscribeTransactionsInteractor } from "../useCases";
import { AddNewTransactionInteractor, TransactionPayload } from "../useCases/transaction/AddNewTransactionService";


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

  async addNewTransaction(payload: TransactionPayload): Promise<Transaction> {
    const service = new AddNewTransactionService();
    const interactor = new AddNewTransactionInteractor(service);

    return interactor.addNewTransaction(payload)
  }
}