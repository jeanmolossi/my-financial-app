import { Transaction } from "../entities/Transaction";
import { GetAuthService } from "../services/auth/GetAuthService";
import { AddNewTransactionService } from "../services/transaction/AddNewTransactionService";
import { GetMyTransactionsService } from "../services/transaction/GetMyTransactionsService";
import { SubscribeTransactionsService } from "../services/transaction/SubscribeTransactionsService";
import { GetMyTransactionsInteractor } from "../useCases/transaction/GetMyTransactionsService";
import { SubscribeTransactionsInteractor } from "../useCases/transaction/SubscribeTransactionsService";
import { AddNewTransactionInteractor, TransactionPayload } from "../useCases/transaction/AddNewTransactionService";
import { GetTransactionCouponsService } from "../services";
import { GetTransactionsCouponsInteractor } from "../useCases";


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

  async getTransactionsCoupons(): Promise<string[]> {
    const service = new GetTransactionCouponsService();
    const interactor = new GetTransactionsCouponsInteractor(service);

    return interactor.getTransactionsCoupons();
  }
}