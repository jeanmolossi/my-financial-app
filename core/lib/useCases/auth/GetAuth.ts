import { User } from "../../entities/User";

export interface GetAuthServiceModel {
  getAuthUser: () => Promise<User>;
}

export class GetAuthInteractor {
  private getAuthService: GetAuthServiceModel;

  constructor(getAuthService: GetAuthServiceModel) {
    this.getAuthService = getAuthService;
  }

  async getAuthUser(): Promise<User> {
    return this.getAuthService.getAuthUser();
  }
}