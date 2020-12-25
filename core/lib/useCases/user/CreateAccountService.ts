import { User } from "../../entities/User";
import { Credentials } from "../../entities/Credentials";

export interface CreateAccountServiceModel {
  createAccount: (credentials: Credentials) => Promise<User>;
}

export class CreateAccountInteractor {
  private createAccountService: CreateAccountServiceModel;

  constructor(createAccountService: CreateAccountServiceModel){
    this.createAccountService = createAccountService;
  }

  async createAccount(credentials: Credentials): Promise<User> {
    return this.createAccountService.createAccount(credentials);
  }
}