import { UserRepository } from "../../frameworks/firebase/user_repository";
import { SignOutServiceModel } from "../../useCases/auth/SignOutService";

export class SignOutService implements SignOutServiceModel {
  async signOut(): Promise<void> {
    const userRepository = new UserRepository();
    return userRepository.signOut();
  }
}