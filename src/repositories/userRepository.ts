import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { User } from '../hooks/Auth';

export async function createAccount(email: string, password: string){
  const uid = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => response.user?.uid)  

  await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('balance')
    .add({
      balance: 0,
      created_at: new Date()
    })
}

export async function signInUser(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export async function signOutUser(){
  return firebase.auth().signOut();
}

export function authUser() {
  const currentUser = firebase.auth().currentUser;

  if(!currentUser) {
    throw new Error('Você deve estar logado!');
  }

  return currentUser;
}


export async function getAuthUser() {
  const { uid } = authUser();

  const user = await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => ({
      ...doc.data(),
      uid: doc.id
    } as User))
  
  return user;
}
