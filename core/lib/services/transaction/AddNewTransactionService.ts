import { Transaction } from "../../entities";
import { TransactionsRepository } from "../../frameworks";
import { AddNewTransactionServiceModel, TransactionPayload } from "../../useCases/transaction/AddNewTransactionService";

export class AddNewTransactionService implements AddNewTransactionServiceModel {

  async addNewTransaction(payload: TransactionPayload): Promise<Transaction> {
    const transactionRepository = new TransactionsRepository();

    return transactionRepository.addNewTransaction(payload);
  }
}