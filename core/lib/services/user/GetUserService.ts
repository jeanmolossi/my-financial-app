import { User } from "../../entities";
import { UserRepository } from "../../frameworks";
import { GetUserServiceModel } from "../../useCases";

export class GetUserService implements GetUserServiceModel {

  async getUser(): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.getUser();

    return new User(user);
  }

}