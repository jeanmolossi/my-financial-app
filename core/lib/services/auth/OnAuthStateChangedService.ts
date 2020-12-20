import { UserAdapter } from "../../adapters";
import { User } from "../../entities";
import { UserRepository } from "../../frameworks";
import { OnAuthStateChangedServiceModel } from "../../useCases";

export class OnAuthStateChangedService implements OnAuthStateChangedServiceModel {
  async onAuthStateChanged(callback: (user: User) => void): Promise<void> {
    const userRepository = new UserRepository();

    return userRepository.onAuthStateChanged(callback);
  }
}