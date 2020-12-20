
interface UserModel {
  uid: string;
  email: string;
}

export class User {
  uid: string;
  email: string;

  constructor ({ uid, email }: UserModel) {
    this.uid = uid;
    this.email = email;
  }
}