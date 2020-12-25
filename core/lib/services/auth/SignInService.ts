import { User } from '../../entities/User';
import { Credentials } from '../../entities/Credentials';
import { UserRepository } from '../../frameworks/firebase/user_repository';
import { SignInServiceModel } from '../../useCases/auth/SignInService';

export class SignInService implements SignInServiceModel {  

  async signInWithEmailAndPassword(crendentials: Credentials): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.signInWithEmailAndPassword(crendentials);
    return user;
  }
}