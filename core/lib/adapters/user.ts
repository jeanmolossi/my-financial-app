import { User } from '../entities/User';
import { Credentials } from '../entities/Credentials';
import { SignInService } from '../services/auth/SignInService';
import { CreateAccountService } from '../services/user/CreateAccountService';
import { OnAuthStateChangedService } from '../services/auth/OnAuthStateChangedService';
import { GetUserService } from '../services/user/GetUserService';
import { CreateAccountInteractor } from '../useCases/user/CreateAccountService';
import { GetUserInteractor } from '../useCases/user/GetUserService';

import { GetAuthService } from '../services/auth/GetAuthService';
import { SignOutService } from '../services/auth/SignOutService';
import { GetAuthInteractor } from '../useCases/auth/GetAuth';
import { OnAuthStateChangedInteractor } from '../useCases/auth/OnAuthStateChanged';
import { SignInInteractor } from '../useCases/auth/SignInService';
import { SignOutInteractor } from '../useCases/auth/SignOutService';

export class UserAdapter {

  async signInWithEmailAndPassword({ email, password }: Credentials): Promise<User> {
    const service = new SignInService();
    const interactor = new SignInInteractor(service);
  
    const user = await interactor.signIn({ email, password });
  
    return user;
  }
  
  async createAccount({ email, password }: Credentials): Promise<User> {
    const service = new CreateAccountService();
    const interactor = new CreateAccountInteractor(service);
  
    const user = await interactor.createAccount({ email, password });
    
    return user;
  }
  
  async signOut(){
    const service = new SignOutService();
    const interactor = new SignOutInteractor(service);
  
    return interactor.signOut();
  }
  
  getAuthUser() {
    const service = new GetAuthService();
    const interactor = new GetAuthInteractor(service);
  
    return interactor.getAuthUser();
  }
  
  getUser() {
    const service = new GetUserService();
    const interactor = new GetUserInteractor(service);
  
    return interactor.getUser();
  }

  async onAuthStateChanged(callback: (user: User) => void): Promise<void> {
    const service = new OnAuthStateChangedService();
    const interactor = new OnAuthStateChangedInteractor(service);

    return interactor.onAuthStateChanged(callback);
  }
}

