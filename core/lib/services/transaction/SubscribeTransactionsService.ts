import { Transaction } from "../../entities";
import { TransactionsRepository } from "../../frameworks";
import { SubscribeTransactionsServiceModel } from "../../useCases";


export class SubscribeTransactionsService implements SubscribeTransactionsServiceModel {
  async subscribeTransactions( callback: (transactions: Transaction[]) => void ): Promise<() => void> {
    const transactionsRepository = new TransactionsRepository();

    return transactionsRepository.subscribeTransactions(callback);
  }
}