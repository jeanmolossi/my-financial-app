import { TransactionsRepository } from "../../frameworks";
import { GetTransactionsCouponsServiceModel } from "../../useCases";

export class GetTransactionCouponsService implements GetTransactionsCouponsServiceModel {
  async getTransactionsCoupons(): Promise<string[]> {
    const transactionsRepository = new TransactionsRepository();

    return transactionsRepository.getTransactionsCoupons();
  }
}