import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getAuthUser } from './userRepository';

export async function createCategory(categoryName: string) {
  const user = await getAuthUser();

  if(!user){
    return {
      category: null,
      status: 'REJECT'
    }
  }

  return firebase
    .firestore()
    .collection(`users`)
    .doc(user.uid)
    .collection('categories')
    .add({ categoryName })
    .then(response => response.get())
    .then(doc => ({
      category: {
        ...doc.data(),
        uid: doc.id
      },
      status: 'RESOLVE'
    }))
    .catch(() => ({
      category: null,
      status: 'REJECT'
    }))
}

export async function getMyCategories(){
  const user = await getAuthUser();

  if(!user){
    return {
      categories: [],
      status: 'REJECT'
    };
  }

  return firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('categories')
    .get()
    .then(response => ({
      categories: response.docs.map(doc => ({ ...doc.data(), uid: doc.id })),
      status: 'RESOLVE'    
    }))
    .catch(() => ({
      categories: [],
      status: 'REJECT'
    }))
}