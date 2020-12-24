import firebase  from 'firebase/app';
import 'firebase/firestore';
import { BalanceAdapter, UserAdapter } from '../../adapters';
import { Transaction } from "../../entities";
import { TransactionPayload } from '../../useCases/transaction/AddNewTransactionService';
import { parseCurrencyInputToNumber, parseToCurrency } from '../../utils';

export interface DocTransaction {
  uid: string;
  value: string;
  type: 'income' | 'outcome';
  category: string;
  identifier: string;
  images: string[];
  created_at: Date;
}

export interface DocCategory {
  uid: string;
  name: string;
}

export class TransactionsRepository {
  async getMyTransactions(userId: string): Promise<Transaction[]> {
    const userCollection = firebase
      .firestore()
      .collection('users')
      .doc(userId)

    const categories = await userCollection
      .collection('categories')
      .get()
      .then(response => 
        response.docs.map(
          doc => ({
            ...doc.data(),
            uid: doc.id
          } as DocCategory)
        ) || []
      )
    
    const transactions = await userCollection
      .collection('transactions')
      .orderBy('created_at', 'desc')
      .get()
      .then(response =>
        response.docs.map(
          doc => {
            const docInfo = doc.data() as DocTransaction;
            const category = categories.find(category => category.uid === doc.data().category) || { uid: '', name: 'Nenhuma categoria' };

            const { uid, type, value, identifier, images, created_at } = docInfo;

            const transaction = new Transaction({
              uid,
              type,
              value,
              identifier,
              images,
              category,
              created_at
            });

            return transaction
          }
        )
      )

    if(!transactions){
      return [];
    }

    return transactions;
  }

  async subscribeTransactions(callback: (transactions: Transaction[]) => void) {

    const userAdapter = new UserAdapter()
    return userAdapter.getAuthUser()
      .then(({ uid }) => {
        const unsubscribeTransactions = firebase
          .firestore()
          .collection(`users/${uid}/transactions`)
          .orderBy('created_at', 'desc')
          .limit(25)
          .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              if(change.type === 'added') {
                this.getMyTransactions(uid).then(response => {
                  if(!response){
                    return;
                  }
            
                  const parsedResponse = response.map(transaction => {
                    const { value } = transaction;
                    const parsedValue = parseToCurrency(value);
            
                    return {
                      ...transaction,
                      value: parsedValue
                    }
                  });

                  callback(parsedResponse)
                })
              }
            })
          });

        return unsubscribeTransactions;
      });
  }

  async addNewTransaction({
    identifier,
    category,
    type,
    value,
    images = []
  }: TransactionPayload) {
    const userAdapter = new UserAdapter();

    const user = await userAdapter.getAuthUser();

    const centValue = parseCurrencyInputToNumber(value);

    const firebaseStorage = await this.UploadImages(images);

    const response = await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('transactions')
      .add({
        identifier,
        category,
        type,
        value: centValue,
        images: firebaseStorage,
        created_at: new Date()
      })
      .then(response => response.get().then(doc => doc))
      .then(doc => ({
        transaction: { ...doc.data(), uid: doc.id } as Transaction,
        status: 'RESOLVE'
      }))
      .catch(() => ({
        transaction: null,
        status: 'REJECT'
      }))

    let status = response.status;

    if(status === 'RESOLVE') {
      const balanceAdapter = new BalanceAdapter();

      await balanceAdapter.updateMyBalance(type, Number(centValue));
    }

    if(status === 'REJECT' || !response.transaction)
      throw new Error('Transação não adicionada');

    return new Transaction(response.transaction);
  }

  async UploadImages(images: string[]) {
    const userAdapter = new UserAdapter();

    const currentUser = await userAdapter.getAuthUser();

    const fetchImages = images.map(async uri => {
      const image = await fetch(uri);
      const blobImage = await image.blob();

      return blobImage;
    })

    const resolvedImages = await Promise.all(fetchImages);

    const storageRef = firebase
      .storage()
      .ref(`/transactions/${currentUser.uid}/`);

    const imagesURIs = resolvedImages.map(async singleImage => {
      return storageRef
        .child(Date.now().toString())
        .put(singleImage)
        .then(reference => reference.ref.getDownloadURL());
    })

    const URIs = await Promise.all(imagesURIs);

    return URIs;
  }
}