import { Transaction } from "../../entities";
import { GetAuthServiceModel } from "../auth";
import { GetUserServiceModel } from "../user";

export interface GetMyTransactionsServiceModel {
  getMyTransactions: (userId: string) => Promise<Transaction[]>
}

export class GetMyTransactionsInteractor {
  private getMyTransactionsService: GetMyTransactionsServiceModel;
  private getAuthUser: GetAuthServiceModel;

  constructor(
    getMyTransactionsService: GetMyTransactionsServiceModel,
    getAuthUser: GetAuthServiceModel
  ) {
    this.getMyTransactionsService = getMyTransactionsService;
    this.getAuthUser = getAuthUser;
  }

  async getMyTransactions() {
    const user = await this.getAuthUser.getAuthUser();
    return this.getMyTransactionsService.getMyTransactions(user.uid);
  }
}