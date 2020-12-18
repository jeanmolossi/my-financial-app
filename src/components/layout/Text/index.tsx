import React, { ReactNode } from 'react';
import { TextProps } from 'react-native';

import { Text as TextComponent, TextProps as TextStyleProps } from './styles';

interface TextComponentProps extends TextProps, TextStyleProps {
  children?: ReactNode;
}

const Text = ({ children, ...rest }: TextComponentProps) => {
  return (
    <TextComponent {...rest}>
      {children}
    </TextComponent>
  );
}

export default Text;