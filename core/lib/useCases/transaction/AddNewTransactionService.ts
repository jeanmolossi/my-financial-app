import { Transaction } from "../../entities/Transaction";

export interface TransactionPayload {
  value: string;
  type: 'income' | 'outcome';
  category: string;
  identifier: string;
  images?: Blob[];
}

export interface AddNewTransactionServiceModel {
  addNewTransaction: (payload: TransactionPayload) => Promise<Transaction>
}

export class AddNewTransactionInteractor {
  private addNewTransactionService: AddNewTransactionServiceModel;

  constructor(addNewTransactionService: AddNewTransactionServiceModel){
    this.addNewTransactionService = addNewTransactionService
  }

  async addNewTransaction(payload: TransactionPayload): Promise<Transaction> {
    return this.addNewTransactionService.addNewTransaction(payload);
  }
}