import { User } from "../../entities";

export interface GetUserServiceModel {
  getUser: () => Promise<User>;
}

export class GetUserInteractor {
  private getUserService: GetUserServiceModel;

  constructor(getUserService: GetUserServiceModel) {
    this.getUserService = getUserService
  }

  async getUser(): Promise<User> {
    return this.getUserService.getUser();
  }
}