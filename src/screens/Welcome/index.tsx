import React, { useCallback, useRef } from 'react';

import { AppContainer, Button, Text } from '../../components';
import LoginModal, { LoginModalRef } from './LoginModal';
import CreateAccountModal, { CreateAccountRef } from './CreateAccountModal';
import { View } from 'react-native';

const Welcome: React.FC = () => {
  const loginModalRef = useRef<LoginModalRef>(null);

  const createAccountModalRef = useRef<CreateAccountRef>(null);

  const onOpenCreateAccountForm = useCallback(() => {
    createAccountModalRef.current?.onOpen();
  }, []);

  const closeModalCreateAccountForm = useCallback(() => {
    createAccountModalRef.current?.onClose();
  }, []);

  const onOpenLoginForm = useCallback(() => {
    loginModalRef.current?.onOpen()
  }, []);

  const closeModalLoginForm = useCallback(() => {
    loginModalRef.current?.onClose();
  }, []);
  
  return (
    <AppContainer>
      <View style={{
        paddingHorizontal: 32
      }}>
        <Text size="xxl">Bem vindo!</Text>
        <Text size="xl">Faça o login para continuar</Text>

        <View style={{ marginTop: 48 }} />

        <Button
          onPress={onOpenLoginForm}
          size="lg"
          variant="outline_green"
          icon="log-in"
          iconColor="#6fcf97"
        >
          Acessar
        </Button>

        <Button onPress={onOpenCreateAccountForm} variant="transparent_purple">
          Criar minha conta
        </Button>
      </View>

      <LoginModal
        ref={loginModalRef}
        onOpenCreateAccountForm={onOpenCreateAccountForm}
        closeModalLoginForm={closeModalLoginForm}
      />
      
      <CreateAccountModal
        ref={createAccountModalRef}
        onOpenLoginForm={onOpenLoginForm}
        closeModalCreateAccountForm={closeModalCreateAccountForm}
      />
      
    </AppContainer>
  );
}

export default Welcome;