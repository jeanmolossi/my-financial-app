import { User } from "../../entities/User";
import { UserRepository } from "../../frameworks/firebase/user_repository";
import { GetUserServiceModel } from "../../useCases/user/GetUserService";

export class GetUserService implements GetUserServiceModel {

  async getUser(): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.getUser();

    return new User(user);
  }

}