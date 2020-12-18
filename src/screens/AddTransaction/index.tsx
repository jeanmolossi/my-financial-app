import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';
import firebase from 'firebase';
import { Dimensions, Modal, View } from 'react-native';
import { FormHandles } from '@unform/core';
import { RequestStatus, UpdateRequestStatus, useAppContext } from '../../store/app';
import { AppContainer, Button, Input, Camera } from '../../components';
import { getMyCategories, addNewTransaction } from '../../repositories';
import { useAuth } from '../../hooks/Auth';
import { SelectContainer } from './styles';

const { height } = Dimensions.get('screen');

const AddTransaction: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { app: { status }, dispatch } = useAppContext();
  const { navigate, reset } = useNavigation();
  const { params } = useRoute();

  const { type } = params as { type: 'income' | 'outcome' } || { type: 'income' };

  const [selectedType, setSelectedType] = useState(type || 'income');
  const [categories, setCategories] = useState([] as any[]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [picture, setPicture] = useState('');
  
  const [cameraVisible, setCameraVisible] = useState(false);

  const handleSubmit = useCallback(({ value, identifier }) => {
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
      type: selectedType,
      images: picture ? [picture] : []
    }).then(response => {
      dispatch(
        UpdateRequestStatus({
          status: RequestStatus.RESOLVE,
          message: 'Transação adicionada'
        })
      )

      reset({ routes: [{ name: 'Home' }] })
    })
    .catch(() => {
      dispatch(
        UpdateRequestStatus({
          status: RequestStatus.REJECT,
          message: 'Ocorreu algum erro, sua transação não foi registrada'
        })
      )
    })
  }, [selectedType, selectedCategory, picture, dispatch]);

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


  return (
    <AppContainer>

      <Modalize
        alwaysOpen={height}
        handlePosition="inside"
        HeaderComponent={<View style={{ height: 46 }} />}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
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
            icon="camera"
            variant="outline_green"
            iconColor="#6fcf97"
            onPress={() => setCameraVisible(true)}
          >
            Adicionar nota/foto
          </Button>

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
            onPress={() => navigate('Home')}
          >
            Cancelar
          </Button>
        </Form>
      </Modalize>

      <Modal
        visible={cameraVisible}
        onRequestClose={() => setCameraVisible(false)}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <Camera
          onSave={(pic) => {
            setPicture(pic.uri);
            setCameraVisible(false)
          }}
        />
      </Modal>
    </AppContainer>
  );
}

export default AddTransaction;