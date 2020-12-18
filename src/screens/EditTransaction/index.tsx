import { ActivityIndicator, Dimensions, View } from 'react-native';
import { FormHandles } from '@unform/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { AppContainer, Button, Input, Text } from '../../components';
import { getMyCategories, addNewTransaction } from '../../repositories';
import { RequestStatus, UpdateRequestStatus, useAppContext } from '../../store/app';
import { useAuth } from '../../hooks/Auth';
import { SelectContainer } from './styles';

const { height } = Dimensions.get('screen');

const EditTransaction: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { app: { status }, dispatch } = useAppContext();
  const { navigate, reset } = useNavigation();
  const { params } = useRoute();

  const receivedParams = params as { transaction: any } | undefined;

  const transaction = receivedParams?.transaction;

  const [selectedType, setSelectedType] = useState(transaction?.type || 'income');
  const [categories, setCategories] = useState([] as any[]);
  const [selectedCategory, setSelectedCategory] = useState(transaction?.category.uid);

  const handleSubmit = useCallback(({ value, identifier }) => {
    console.log('SUBMITTING',value)
    dispatch(
      UpdateRequestStatus({
        status: RequestStatus.PENDING,
        message: 'Adicionando transação...'
      })
    )
    
    addNewTransaction({
      value,
      identifier,
      category: selectedCategory,
      type: selectedType
    }).then(response => {
      dispatch(
        UpdateRequestStatus({
          status: RequestStatus.RESOLVE,
          message: 'Transação adicionada'
        })
      )

      navigate('Home')
    })
    .catch(() => {
      dispatch(
        UpdateRequestStatus({
          status: RequestStatus.REJECT,
          message: 'Ocorreu algum erro, sua transação não foi registrada'
        })
      )
    })
  }, [selectedType, selectedCategory, dispatch]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(`users/${user.uid}/categories`)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added') {
            getMyCategories().then(({ categories }) => {
              setCategories(categories);
              if(categories.length > 0)
                setSelectedCategory(categories[0].uid)
            })
          }
        })
      });
      
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if(!transaction) {
      navigate('Home')
    }
  }, [transaction]);

  if(!receivedParams || !receivedParams.transaction){
    return <BackModalIfNoParams />
  }

  return (
    <AppContainer>

      <Modalize
        alwaysOpen={height}
        handlePosition="inside"
        HeaderComponent={<View style={{ height: 46 }} />}
      >
        <Form ref={formRef} onSubmit={handleSubmit} initialData={{
          identifier: transaction?.identifier,
          value: transaction?.value,
        }}>
          <Input
            name="identifier"
            label="Descrição"
            icon="menu"
            iconStyle={{
              color: 'black',
              size: 20
            }}
            placeholder="Almoço"
            placeholderTextColor="#3337"
            keyboardType="web-search"
            style={{ flex: 1, color: 'black' }}
          />

          <Input
            name="value"
            label="Valor da transação"
            icon="dollar-sign"
            iconStyle={{
              color: 'black',
              size: 20
            }}
            placeholder="100,00"
            placeholderTextColor="#3337"
            keyboardType="numeric"
            style={{ flex: 1, color: 'black' }}
          />

          <SelectContainer>
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue) => {
                const changedType = itemValue as 'income' | 'outcome';
                setSelectedType(changedType)
              }}
              mode="dropdown"
            >
              <Picker.Item label="Receber" value="income" />
              <Picker.Item label="Pagar" value="outcome" />
            </Picker>
          </SelectContainer>

          <SelectContainer>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => {
                setSelectedCategory(itemValue as string)
              }}
            >
            {categories.length > 0 ? categories.map(category => (
              <Picker.Item key={category.uid} value={category.uid} label={category.categoryName} />
              )): (
              <Picker.Item value="" label="Carregando..." />
            )}
            </Picker>
          </SelectContainer>

          <Button
            variant="green"
            onPress={() => formRef.current?.submitForm()}
            disabled={status === RequestStatus.PENDING}
          >
            Adicionar
          </Button>
          <Button
            variant="outline_purple"
            size="sm"
            onPress={() => reset({ routes: [{ name: 'Home' }] })}
          >
            Cancelar
          </Button>
        </Form>
      </Modalize>
    </AppContainer>
  );
}

const BackModalIfNoParams = () => {
  const { navigate } = useNavigation();

  return (
    <AppContainer>
      <Modalize          
        childrenStyle={{ alignItems: 'center', justifyContent: 'center' }}
        alwaysOpen={height}
        HeaderComponent={<View style={{ height: 36 }}/>}
      >
        <Text
          size="md"
          bold
          montserrat
          color="black"
          style={{ textAlign: 'center', paddingHorizontal: 16, marginVertical: 16 }}
        >
          Volte e selecione uma transação para editar
        </Text>
        <Button
          variant="outline_purple"
          onPress={() => navigate('Home')}
        >
          Voltar
        </Button>
      </Modalize>
    </AppContainer>
  )
}

export default EditTransaction;