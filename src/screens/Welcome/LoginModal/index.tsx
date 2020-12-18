import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { forwardRef, ForwardRefRenderFunction, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { Input, Button, Text } from '../../../components';
import { useAuth } from '../../../hooks/Auth';
import { ModalHeader } from '../styles';

export interface LoginModalRef {
  onOpen: () => void;
  onClose: () => void;
}

interface LoginModalProps {
  onOpenCreateAccountForm: () => void;
  closeModalLoginForm: () => void;
}

const LoginModal: React.ForwardRefRenderFunction<LoginModalRef, LoginModalProps> = (
  { onOpenCreateAccountForm, closeModalLoginForm },
  ref
) => {
  const modalizeRef = useRef<Modalize>(null);
  const loginFormRef = useRef<FormHandles>(null);
  const [loging, setLoging] = useState(false);
  
  const { signIn } = useAuth();

  const handleSubmit = useCallback(({ email, password }) => {
    setLoging(true);
    signIn({ email, password });
  }, []);

  useImperativeHandle(ref, () => ({
    onOpen: () => {
      modalizeRef.current?.open()
    },
    onClose: () => {
      modalizeRef.current?.close()
    }
  }), [])  
  
  return (
    <Modalize
        ref={modalizeRef}
        handlePosition="inside"
        HeaderComponent={(
          <ModalHeader>
            <Text color="black" size="xxl" style={{ textAlign: 'center' }}>Acesse sua conta</Text>
          </ModalHeader>
        )}
      >
        <Form
          ref={loginFormRef}
          onSubmit={handleSubmit}
        >
          <Input
            name="email"
            label="E-mail:"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />

          <Input
            name="password"
            label="Senha:"
            autoCapitalize="none"
            autoCompleteType="email"
            secureTextEntry
          />

          <Button
            onPress={() => loginFormRef.current?.submitForm()}
            textStyle={{ textAlign: 'center' }}
            variant="outline_purple"
            icon="log-in"
            iconColor="#BC9CFF"
            disabled={loging}
          >
            Acessar
          </Button>

          <Button
            onPress={() => {
              closeModalLoginForm()
              onOpenCreateAccountForm()
            }}
            textStyle={{ textAlign: 'center' }}
            icon="edit-3"
            iconColor="black"
          >
            Criar conta
          </Button>

          <Button
            onPress={closeModalLoginForm}
            textStyle={{ textAlign: 'center' }}
            icon="arrow-left-circle"
            iconColor="black"
          >
            Voltar
          </Button>
        </Form>
      </Modalize>
  );
}

export default forwardRef(LoginModal);