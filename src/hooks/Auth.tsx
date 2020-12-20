import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { signInUser, signOutUser } from '../repositories';

export interface User {
  uid: string;
  email: string;
}

interface AuthContextData {
  user: User;
  signIn: (signInCredentials: { email: string, password: string }) => void;
  signOut: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as User);

  const signIn = useCallback(async ({email, password}) => {
    await signInUser(email, password).then(response => {
      AsyncStorage.setItem('@financial-user', JSON.stringify({ uid: response.uid }))
    });
  }, []);

  const signOut = useCallback(async () => {
    AsyncStorage.removeItem('@financial-user')
    await signOutUser();
  }, []);

  const updateUser = useCallback((user: User) => {
    AsyncStorage.setItem('@financial-user', JSON.stringify(user))
    setUser(user);
  }, []);
  
  useEffect(() => {
    AsyncStorage.getItem('@financial-user').then(receivedUser => {
      if(receivedUser){
        const parsedReceivedUser = JSON.parse(receivedUser);
        setUser(parsedReceivedUser);
      }
    })
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };