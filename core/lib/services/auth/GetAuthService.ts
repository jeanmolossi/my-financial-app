import { User } from "../../entities/User";
import { UserRepository } from "../../frameworks/firebase/user_repository";
import { GetAuthServiceModel } from "../../useCases/auth/GetAuth";


export class GetAuthService implements GetAuthServiceModel {
  async getAuthUser(): Promise<User> {
    const userRepository = new UserRepository();
    return userRepository.getAuthUser();
  }
}