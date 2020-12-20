import { Transaction } from "../../entities";
import { TransactionsRepository } from "../../frameworks";
import { GetMyTransactionsServiceModel } from "../../useCases";

export class GetMyTransactionsService implements GetMyTransactionsServiceModel {
  async getMyTransactions(userId: string): Promise<Transaction[]> {
    const transactionsRepository = new TransactionsRepository();
    return transactionsRepository.getMyTransactions(userId);
  }
}