import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Transaction } from 'financial-core';

import { AppContainer, Button, Text } from '../../components';
import { getMyLastBalance, subscribeTransactions, subscribeMyBalance } from '../../repositories';
import CreateCategoryModal, { CreateCategoryModalRef } from './CreateCategoryModal';

import {
  BalanceContainer,
  HistoricContainer,
  HistoricItem,
} from './styles';

const { height } = Dimensions.get('screen')


const Home: React.FC = () => {
  const { navigate } = useNavigation();
  
  const createCategoryModal = useRef<CreateCategoryModalRef>(null);

  const [transactions, setTransactions] = useState([] as Transaction[]);
  const [balance, setBalance] = useState('0,00');
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  const handleOpenModal = useCallback(() => {
    createCategoryModal.current?.onOpen();
  }, []);

  const handleLoadBalance = useCallback(() => {
    setLoadingBalance(true);
    getMyLastBalance()
      .then(response => {
        if(!response) {
          throw new Error('Sem balanço')
        };
  
        setBalance(response.balance)
        setLoadingBalance(false);
      })
  }, []);

  useEffect(() => {
    const unsubscribeTransactions = subscribeTransactions(setTransactions)
        .then(unsubcribeCallback => unsubcribeCallback);

    const unsubscribeBalance = subscribeMyBalance(setBalance)
      .then(unsubscribeCallback => unsubscribeCallback);

    handleLoadBalance()

    return () => {
      unsubscribeTransactions.then(unsub => unsub());
      unsubscribeBalance.then(unsub => unsub());
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false)
    }, 5000);

    return () => clearTimeout(timeout);
  }, [])
  
  return (
    <AppContainer>
      <BalanceContainer style={{ flexDirection: 'row' }}>
        <BalanceContainer>
          <Text medium size="lg">Balanço</Text>
          <Text bold size="xxl" color="white">
            R$ {balance}
          </Text>
        </BalanceContainer>
        <View style={{ height: '100%' }}>
          <Button variant="purple" disabled={loadingBalance} onPress={handleLoadBalance}>
            <Feather name="rotate-cw" size={24} />
          </Button>
        </View>
      </BalanceContainer>

      <View style={{
        flex: 1,
        width: '100%'
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            variant="green"
            icon="dollar-sign"
            size="md"
            style={{ flex: 1 }}
            onPress={() => {
              navigate('AddTransaction', { type: 'income' })
            }}
          >
            Receber
          </Button>

          <Button
            variant="purple"
            icon="dollar-sign"
            size="md"
            style={{ flex: 1 }}
            onPress={() => {
              navigate('AddTransaction', { type: 'outcome' })
            }}
          >
            Pagar
          </Button>

        </View>

        <Button
          variant="purple"
          icon="plus-circle"
          size="md"
          onPress={handleOpenModal}
        >
          Categoria
        </Button>
      </View>

      <Modalize
        alwaysOpen={height/1.9}
        HeaderComponent={<View style={{ height: 46 }} />}
        handlePosition="inside"
        flatListProps={{
          data: transactions,
          showsVerticalScrollIndicator: false,
          contentContainerStyle: {
            paddingHorizontal: 16
          },
          keyExtractor: (item) => item.uid,
          ListHeaderComponent: () => (
            <HistoricContainer>
              <Text size="xl" color="black">Seu Histórico</Text>
            </HistoricContainer>
          ),
          ListEmptyComponent: () => (
            <View style={{ marginVertical: 16, marginHorizontal: 8 }}>
              {showLoading && <ActivityIndicator size="large" color="dark" style={{ marginBottom: 8 }} />}
              <Text color="black" size="md" montserrat>Você não possui transações registradas ainda.</Text>
              <Text color="black" size="md" montserrat>Adicione uma categoria acima e em seguida uma transação</Text>
              <View style={{ height: 2, backgroundColor: '#3333', marginVertical: 16 }} />
              <Button variant="outline_green" onPress={handleOpenModal}>
                Adicionar categoria
              </Button>

              <Button
                variant="transparent_dark"
                onPress={() => {
                  navigate('AddTransaction', { type: 'income' })
                }}
              >
                Adicionar transação
              </Button>
            </View>
          ),
          renderItem: ({ item }: { item: Transaction }) => {
            const {
              uid,
              category: {
                name,
              },
              type,
              identifier,
              value,
              images
            } = item;

            return (
              <HistoricItem key={uid} transactionType={type}>
                <View style={{ flex: 1 }}>
                  <Text color="black" size="sm">{identifier}</Text>
                  <Text color="black" size="md">R$ {value}</Text>
                  <Text color="#333">{name}</Text>
                </View>
                {images.length > 0 ? (
                  <Button
                    variant="purple"
                    key={uid}
                    onPress={() => {
                      navigate('Coupons', { images, transaction: item })
                    }}
                  >
                    <Feather name="image" size={20} />
                  </Button>
                ) : <View />}
              </HistoricItem>
            );
          },
        }}
      />

      <CreateCategoryModal ref={createCategoryModal} />
    </AppContainer>
  );
}

export default Home;