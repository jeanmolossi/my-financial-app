import { User } from "../../entities/User";
import { UserRepository } from "../../frameworks/firebase/user_repository";
import { OnAuthStateChangedServiceModel } from "../../useCases/auth/OnAuthStateChanged";

export class OnAuthStateChangedService implements OnAuthStateChangedServiceModel {
  async onAuthStateChanged(callback: (user: User) => void): Promise<void> {
    const userRepository = new UserRepository();

    return userRepository.onAuthStateChanged(callback);
  }
}