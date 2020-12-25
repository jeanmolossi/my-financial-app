import { User } from '../../entities/User';
import { Credentials } from '../../entities/Credentials';
import { UserRepository } from '../../frameworks/firebase/user_repository';
import { CreateAccountServiceModel } from '../../useCases/user/CreateAccountService';

export class CreateAccountService implements CreateAccountServiceModel {
  async createAccount(credentials: Credentials): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.createAccount(credentials);
    
    return user;
  }
}