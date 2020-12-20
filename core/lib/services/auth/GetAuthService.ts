import { User } from "../../entities";
import { UserRepository } from "../../frameworks";
import { GetAuthServiceModel } from "../../useCases";


export class GetAuthService implements GetAuthServiceModel {
  async getAuthUser(): Promise<User> {
    const userRepository = new UserRepository();
    return userRepository.getAuthUser();
  }
}