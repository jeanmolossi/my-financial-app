import firebase from 'firebase/app';
import 'firebase/auth';
import { Credentials, User } from "../../entities";

export class UserRepository {
  private attemps = 3;

  async signInWithEmailAndPassword(credentials: Credentials): Promise<User> {
    const { email, password } = credentials;

    const userReceived = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => ({
        uid: response.user!.uid,
        email: response.user!.email!
      }))
      .catch(() => null);

    if(!userReceived){
      throw new Error('O usuário não possui cadastro')
    }

    return new User(userReceived)
  }

  async createAccount({ email, password }: Credentials): Promise<User> {
    const uid = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response =>  response.user ? response.user.uid : null)
      .catch(() => null);

    if(!uid){
      throw new Error('Usuário não cadastrado!')
    }

    await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('balance')
      .add({
        balance: 0,
        created_at: new Date()
      })
      
    return new User({ uid, email })
  }

  async signOut(){
    return firebase.auth().signOut();
  }

  async getAuthUser() {
    this.attemps -= 1;

    let timeout: number;

    const currentUser = await new Promise((
      resolve: (user: User) => void,
      reject: (error: string) => void
    ) => {
      timeout = setTimeout(async () => {
        const user = firebase.auth().currentUser;

        if(user && this.attemps >= 0) {
          console.log('RESOLVE', this.attemps)
          clearTimeout(timeout);
          resolve(user as User);
        } else if (!user && this.attemps >= 0) {          
          console.log('TRY AGAIN', this.attemps)
          await this.getAuthUser();
        } else {
          console.log('FAIL')
          reject('Usuário não logado')
        }
      }, 1000);
    })
    .then(response => {
      clearTimeout(timeout);
      return response
    });

    if(!currentUser){
      throw new Error('Você deve estar logado!')
    }

    const { uid, email } = currentUser;

    if(!email) {
      throw new Error('Usuário cadastrado sem e-mail!')
    }
    console.log('RETURNS USER')
    return new User({ uid, email })
  }

  async getUser() {
    const user = await this.getAuthUser();

    return firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => ({
        ...doc.data(),
        uid: doc.id
      }) as User)
  }

  async onAuthStateChanged(callback: (user: User) => void) {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const { uid, email } = user;

        if(!email) return;
        
        const sendUser = new User({ uid, email });
        callback(sendUser);
      }
    })
  }
}