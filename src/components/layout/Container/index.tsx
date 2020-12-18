import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container as ContainerBox, ContainerProps as ContainerBoxProps } from './styles';

interface ContainerProps extends ViewProps, ContainerBoxProps {
  children?: ReactNode;
}

const Container = ({ children, ...rest}: ContainerProps) => {
  return (    
    <ContainerBox { ...rest}>{children}</ContainerBox>    
  );
}



export default Container;