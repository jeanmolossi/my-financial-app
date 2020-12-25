import { User } from "../../entities/User";
import { Credentials } from "../../entities/Credentials";

export interface SignInServiceModel {
  signInWithEmailAndPassword: ({ email, password }: Credentials) => Promise<User>;
}

export class SignInInteractor {
  private signInService: SignInServiceModel;

  constructor(signInService: SignInServiceModel) {
    this.signInService = signInService;
  }

  async signIn({ email, password }: Credentials): Promise<User> {
    return this.signInService.signInWithEmailAndPassword({ email, password });
  }
}