import { Credentials, User } from '../../entities';
import { UserRepository } from '../../frameworks';
import { SignInServiceModel } from '../../useCases';

export class SignInService implements SignInServiceModel {  

  async signInWithEmailAndPassword(crendentials: Credentials): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.signInWithEmailAndPassword(crendentials);
    return user;
  }
}