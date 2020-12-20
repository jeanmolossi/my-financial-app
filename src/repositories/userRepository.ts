import { UserAdapter } from 'financial-core';

export async function createAccount(email: string, password: string) {
  const userAdapter = new UserAdapter();

  return userAdapter.createAccount({ email, password });
}

export async function signInUser(email: string, password: string) {
  const userAdapter = new UserAdapter();

  return userAdapter.signInWithEmailAndPassword({ email, password });
}

export async function signOutUser() {
  const userAdapter = new UserAdapter();

  return userAdapter.signOut();
}

export function authUser() {
  const userAdapter = new UserAdapter();

  return userAdapter.getAuthUser();
}

export async function getAuthUser() {
  const userAdapter = new UserAdapter();

  return userAdapter.getUser();
}