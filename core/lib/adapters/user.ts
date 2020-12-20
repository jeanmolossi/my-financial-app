import { Credentials, User } from '../entities';
import { SignInService, CreateAccountService, GetAuthService, OnAuthStateChangedService } from '../services';
import { SignOutService } from '../services/auth/SignOutService';
import { GetUserService } from '../services/user/GetUserService';
import { CreateAccountInteractor, GetAuthInteractor, GetUserInteractor, OnAuthStateChangedInteractor, SignInInteractor, SignOutInteractor } from '../useCases';

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

