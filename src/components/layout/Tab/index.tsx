import React, { ComponentType } from 'react';
import { Feather } from '@expo/vector-icons';
import { Container } from './styles';
import { Icons } from './icon.types';

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

export { Icons };
export default Tab;