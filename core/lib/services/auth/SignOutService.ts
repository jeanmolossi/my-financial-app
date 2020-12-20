import { UserRepository } from "../../frameworks";
import { SignOutServiceModel } from "../../useCases";

export class SignOutService implements SignOutServiceModel {
  async signOut(): Promise<void> {
    const userRepository = new UserRepository();
    return userRepository.signOut();
  }
}