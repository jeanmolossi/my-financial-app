import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { enableScreens } from 'react-native-screens';

import { Button } from '../components';
import { useAuth } from '../hooks/Auth';
import {
  Home,
  AddTransaction,
  Settings,
  Coupons,
} from '../screens';

const { Navigator, Screen } = createDrawerNavigator(); 
enableScreens();

const AuthTabs: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Navigator lazy detachInactiveScreens screenOptions={{
      headerShown: true,
      headerStyle: {
        elevation: 0,
        margin: 0,
        backgroundColor: '#1f2041',
      },
      headerTintColor: 'white',
      headerTitle: () => null,
      headerRight: () => <Button icon="log-out" onPress={signOut} />,
    }}
      edgeWidth={70}
      drawerType="slide"
      drawerContentOptions={{
        contentContainerStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        itemStyle: {
          width: '100%'
        },
        labelStyle: {
          color: 'white',
          fontSize: 16
        },
        style: {
          backgroundColor: '#1f2041',
          paddingHorizontal: 8
        }
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Início',
        }}
      />

      <Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{
          drawerLabel: 'Adicionar transação'
        }}
      />

      <Screen
        name="Coupons"
        getComponent={() => Coupons}
        initialParams={{ images: [] }}
        options={{
          drawerLabel: 'Ver notas',
          unmountOnBlur: true
        }}
      />

      <Screen
        name="Settings"
        component={Settings}
        initialParams={{ images: [] }}
        options={{
          drawerLabel: 'Configurações',
          unmountOnBlur: true
        }}
      />
    </Navigator>
  );
}

export default AuthTabs;