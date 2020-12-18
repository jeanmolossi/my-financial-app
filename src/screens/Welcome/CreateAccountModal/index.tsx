import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { Input, Button, Text } from '../../../components';
import { createAccount } from '../../../repositories';
import { ModalHeader } from '../styles';

export interface CreateAccountRef {
  onOpen: () => void;
  onClose: () => void;
}

interface CreateAccountModalProps {
  closeModalCreateAccountForm: () => void;
  onOpenLoginForm: () => void;
}

const CreateAccountModal: React.ForwardRefRenderFunction<CreateAccountRef, CreateAccountModalProps> = (
  { closeModalCreateAccountForm, onOpenLoginForm },
  ref
) => {
  const modalizeRef = useRef<Modalize>(null);
  const createAccountFormRef = useRef<FormHandles>(null);
  const [creatingAccount, setCreatingAccount] = useState(false);
  
  const signUp = useCallback(async ({ email, password }) => {
    setCreatingAccount(true);
    await createAccount(email, password);
    setCreatingAccount(false);
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
          <Text color="black" size="xxl" style={{ textAlign: 'center' }}>Crie sua conta</Text>
        </ModalHeader>
      )}
    >
      <Form
        ref={createAccountFormRef}
        onSubmit={signUp}
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
          onPress={() => createAccountFormRef.current?.submitForm()}
          textStyle={{ textAlign: 'center' }}
          variant="outline_purple"
          icon="edit-2"
          iconColor="#BC9CFF"
          disabled={creatingAccount}
        >
          Criar conta
        </Button>

        <Button
          onPress={() => {
            closeModalCreateAccountForm()
            onOpenLoginForm()
          }}
          textStyle={{ textAlign: 'center' }}
          icon="log-in"
          iconColor="black"
        >
          Acessar minha conta
        </Button>

        <Button
          onPress={closeModalCreateAccountForm}
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

export default forwardRef(CreateAccountModal);