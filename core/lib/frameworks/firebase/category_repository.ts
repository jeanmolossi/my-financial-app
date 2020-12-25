import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { UserAdapter } from "../../adapters/user";
import { Category } from '../../entities/Category';

export class CategoryRepository {
  async createCategory(name: string) {
    const userAdapter = new UserAdapter();
    
    const user = await userAdapter.getAuthUser();
    
    const { category, status } = await firebase
      .firestore()
      .collection(`users`)
      .doc(user.uid)
      .collection('categories')
      .add({ name })
      .then(response => response.get())
      .then(doc => ({
        category: {
          ...doc.data(),
          uid: doc.id
        } as Category,
        status: 'RESOLVE'
      }))
      .catch(() => ({
        category: null,
        status: 'REJECT'
      }))

    if(status === 'REJECT' || !category)
      throw new Error('No category added');

    return new Category(category);
  }
  
  async getMyCategories(){
    const userAdapter = new UserAdapter();
    
    const user = await userAdapter.getAuthUser();
  
    const { categories, status } = await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('categories')
      .get()
      .then(response => ({
        categories: response.docs.map(doc => ({ ...doc.data(), uid: doc.id } as Category)),
        status: 'RESOLVE'    
      }))
      .catch(() => ({
        categories: [],
        status: 'REJECT'
      }))

    if(status === 'REJECT' || !categories)
      throw new Error('No categories resolved');

    return categories;
  }

  async subscribeMyCategories(
    callback: (categories: Category[]) => void
  ): Promise<() => void> {
    const userAdapter = new UserAdapter();

    return userAdapter.getAuthUser()
      .then((user) => {
        const unsubscribe = firebase
          .firestore()
          .collection(`users/${user.uid}/categories`)
          .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              if(change.type === 'added') {
                this.getMyCategories().then((categories) => {
                  callback(categories);
                })
              }
            })
          });

        return unsubscribe;
      });
  }
}