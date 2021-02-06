import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Animated, Text, Platform } from 'react-native';
import { Transaction, TransactionAdapter } from 'financial-core';
import { Image } from '../../components';
import { ThemeColors } from '../../assets/theme-colors';

type RouteParams = {
  images: string[];
  transaction: Transaction;
} | undefined;

const { width } = Dimensions.get('window');
const PERSPECTIVE = width + 20;
const RATIO = Platform.OS === 'ios' ? 2 : 1.2;
const ANGLE = Math.atan(PERSPECTIVE / (width / 2));

const Coupons: React.FC = () => {
  const { setParams } = useNavigation();
  const route = useRoute();
  
  const [transactions, setTransactions] = useState([] as Transaction[])

  const params = (route.params as RouteParams);
  
  const images = params.images || [];


  const x = new Animated.Value(0);

  const onScroll = Animated.event(
    [
      { nativeEvent: {
        contentOffset: { x }
      } }
    ],
    { useNativeDriver: true }
  );

    
  const animatedStyle = (index: number) => {
    const offset = width * index;
    const inputRange = [offset - width, offset + width];
    
    console.log(
      index,
      '::',
      inputRange,
      ' -->> ',
      [width/2, -width/2],
      '\nOffset = ', offset
    )
    
    const translateX = x.interpolate({
      inputRange,
      outputRange: [width/RATIO, -width/RATIO],
      extrapolate: 'clamp'
    });

    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${ANGLE}rad`, `-${ANGLE}rad`],
      extrapolate: 'clamp'
    });

    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width/2, -width/2],
      extrapolate: 'clamp'
    });

    const extra = width / RATIO / Math.cos(ANGLE / 1.85) - width / RATIO;

    const translateX2 = x.interpolate({
      inputRange,
      outputRange: [-extra, extra],
      extrapolate: 'clamp'
    })

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective: PERSPECTIVE },
        { translateX },
        { rotateY },
        { translateX: translateX1 },
        { translateX: translateX2 },
      ],
    }
  };

  useEffect(() => {
    console.log('RELOADING IMAGES...')
    const transactionAdapter = new TransactionAdapter();
    
    transactionAdapter
    .getMyTransactions()
    .then(response => {
      setTransactions(response)
    })
    .catch(() => console.log('nada'))
    
    if(!images.length) {
      transactionAdapter
      .getTransactionsCoupons()
      .then(images => {
        setParams({ images })
      })
    }

    return () => {
      console.log('Clear params...')
      setParams({
        images: [],
        transactions: []
      });
    }
  }, [])

  return (
    <View style={{
      flex: 1,
      backgroundColor: ThemeColors.darkShade[100],
    }}>
      {transactions.map((item, index) => (
        <Animated.View
          style={animatedStyle(index)}
          key={item.uid}
        >
          <View style={{
            flex: 1,
            backgroundColor: '#FFF8'
          }}>
            {item.images.length > 0 ? (
              <Image
                width={width}
                height={width}
                source={item.images[0]}
                imageStyle={{
                  ...StyleSheet.absoluteFillObject,
                  width: null,
                  height: null
                }}
              />
            ) : (
              <View style={{
                ...StyleSheet.absoluteFillObject,
                width: null,
                height: null
              }} />
            )}
            <Text>{item.identifier}</Text>
          </View>
        </Animated.View>
      ))}

      <Animated.ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{
          width: width * transactions.length,
        }}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    </View>
  );
}

export default Coupons;