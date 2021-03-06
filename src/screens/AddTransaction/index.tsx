import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';
import { Dimensions, Modal, View } from 'react-native';
import { FormHandles } from '@unform/core';
import { RequestStatus, UpdateRequestStatus, useAppContext } from '../../store/app';
import { AppContainer, Button, Input, Camera } from '../../components';
import { getMyCategories, addNewTransaction, subscribeMyCategories } from '../../repositories';
import { SelectContainer } from './styles';
import { Category } from 'financial-core';

const { height } = Dimensions.get('screen');

const AddTransaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { app: { status }, dispatch } = useAppContext();
  const { navigate, reset } = useNavigation();
  const { params } = useRoute();

  const { type } = params as { type: 'income' | 'outcome' } || { type: 'income' };

  const [selectedType, setSelectedType] = useState(type || 'income');
  const [categories, setCategories] = useState([] as Category[]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [picture, setPicture] = useState({} as Blob);
  
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
    if(categories.length>0){
      setSelectedCategory(categories[0].uid)
    }
  }, [categories]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = subscribeMyCategories(setCategories)
        .then(unsubscribeCallback => unsubscribeCallback);    
        
      return () => {
        unsubscribe.then(unsub => unsub());
      }
    }, [])
  );


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
            {categories.length > 0
              ? categories.map(category => (
                <Picker.Item
                  key={category.uid}
                  value={category.uid}
                  label={category.name}
                />
              ))
              : (
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
            setPicture(pic);
            setCameraVisible(false)
          }}
        />
      </Modal>
    </AppContainer>
  );
}

export default AddTransaction;