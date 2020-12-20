import { Credentials, User } from '../../entities';
import { UserRepository } from '../../frameworks';
import { CreateAccountServiceModel } from '../../useCases';

export class CreateAccountService implements CreateAccountServiceModel {
  async createAccount(credentials: Credentials): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.createAccount(credentials);
    
    return user;
  }
}