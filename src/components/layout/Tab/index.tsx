import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Container } from './styles';

export type Icons = 'home'
| 'camera'
| 'bar-chart-2'
| 'dollar-sign'
| 'plus-square'
| 'plus-circle'
| 'settings'
| 'heart'
| 'menu'
| 'power'
| 'log-in'
| 'log-out'
| 'layers'
| 'save'
| 'edit'
| 'edit-2'
| 'edit-3'
| 'arrow-down-circle'
| 'arrow-left-circle'
| 'arrow-right-circle'
| 'arrow-up-circle'
;

type TabProps = {
  icon: Icons;
  as?: ComponentType;
  onPress?: () => void;
};

const Tab = ({ icon, as, ...rest }: TabProps) => {
  return (
    <Container as={as} {...rest}>
      <Feather name={icon} size={24} />
    </Container>
  );
}

export default Tab;