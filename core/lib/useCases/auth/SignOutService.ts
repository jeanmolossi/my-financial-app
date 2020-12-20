export interface SignOutServiceModel {
  signOut: () => void;
}

export class SignOutInteractor {
  private signOutService: SignOutServiceModel;
  
  constructor(signOutService: SignOutServiceModel){
    this.signOutService = signOutService;
  }

  async signOut() {
    this.signOutService.signOut();
  }

}