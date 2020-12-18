import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { parseCurrencyInputToNumber } from '../utils';
import { updateMyBalance } from './balanceRepository';
import { authUser, getAuthUser } from './userRepository';

interface TransacionPayload {
  value: string;
  type: 'income' | 'outcome';
  category: string;
  identifier: string;
  images?: string[];
}

export async function addNewTransaction({
  identifier,
  category,
  type,
  value,
  images = []
}: TransacionPayload) {
  const user = authUser();

  const centValue = parseCurrencyInputToNumber(value);

  const firebaseStorage = await UploadImages(images);

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
      transaction: { ...doc.data(), uid: doc.id },
      status: 'RESOLVE'
    }))
    .catch(() => ({
      transaction: null,
      status: 'REJECT'
    }))

  let status = response.status;

  if(status === 'RESOLVE') {
    status = await updateMyBalance(type, Number(centValue))
      .then(response => response.status)
      .catch(() => 'REJECT')
  }

  return {
    transaction: response.transaction,
    status
  };
}

interface Transaction {
  value: string;
  type: 'income' | 'outcome';
  identifier: string;
  images?: string[];
  category: {
    categoryName: string;
    uid: string;
  };
}

export async function getMyTransactions() {
  const user = authUser();

  const userCollection = await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)

  const categories = await userCollection
    .collection('categories')
    .get()
    .then(response => 
      response.docs.map(
        doc => ({
          ...doc.data(),
          uid: doc.id
        } as { uid: string; categoryName: string; })
      ) || []
    )
  
  const transactions = await userCollection
    .collection('transactions')
    .orderBy('created_at', 'desc')
    .get()
    .then(response =>
      response.docs.map(
        doc => {
          const docInfo = doc.data() as Transaction;

          return {
            ...docInfo,
            uid: doc.id,
            category: categories.find(category => category.uid === doc.data().category) || { uid: '', categoryName: 'Nenhuma categoria' }
          } as Transaction
        }
      )
    )

  if(!transactions){
    return;
  }

  return transactions;
}


async function UploadImages(images: string[]) {
  const currentUser = authUser();

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