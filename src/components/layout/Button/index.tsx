import React, { ReactNode, useCallback, useMemo } from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { ActivityIndicator, TextStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  ButtonStyleProps,
  BackgroundGradient,
  ButtonContainer,
  ButtonText,
  BorderView,
} from './styles';
import { Icons } from '../Tab';

interface ButtonProps extends RectButtonProperties, ButtonStyleProps {
  children?: ReactNode;
  textStyle?: TextStyle;
  icon?: Icons;
  iconSize?: number;
  iconColor?: '#1f2041'| '#BC9CFF'| '#6fcf97'| '#8BA4F9' | 'white' | 'black';
  disabled?: boolean;
}

const Button = ({
  children,
  textStyle,
  variant = 'transparent_dark',
  size,
  icon,
  iconSize = 20,
  iconColor = 'white',
  disabled = false,
  onPress,
  ...rest
}: ButtonProps) => {
  const colors = useMemo(() => {
    switch(variant){
      case 'purple': return ['#BC9CFF','#8BA4F9'];
      case 'green': return ['#6FCF97','#66D2EA'];

      default: return ['#BC9CFF','#8BA4F9'];
    }
  }, [variant]);

  const handlePress = useCallback(() => {
    if(onPress && !disabled) {
      onPress(true);
    }
  }, [onPress, disabled])

  const ActivityMemoIndicator = useMemo(() => (
    <ActivityIndicator
      size={iconSize}
      color={iconColor}
      style={{ marginRight: 6 }}
    />
  ), [iconSize]);

  const MemoButtonText = useMemo(() => (
    <ButtonText
      style={textStyle}
      {...{ variant, size }}
    >
      {children}
    </ButtonText>
  ), [textStyle, variant, size, children])

  const MemoFeatherIcon = useMemo(() => (
    <Feather
      name={icon || 'alert-octagon' as Icons}
      size={iconSize}
      color={iconColor}
      style={{ marginRight: 6 }}
    />
  ), [icon, iconSize, iconColor])

  return (
    <>
      {!variant || variant === 'purple' || variant === 'green' ? (
        <BackgroundGradient
          colors={colors}
          style={[rest.style, { opacity: disabled ? 0.6 : 1}]}
        >
          {delete rest.style}
          <ButtonContainer {...{ variant, size, onPress: handlePress }} {...rest}>
            {icon && !disabled && MemoFeatherIcon}
            {disabled
              ? ActivityMemoIndicator
              : MemoButtonText}
            
          </ButtonContainer>
        </BackgroundGradient>
      ) : (        
        <BorderView {...{ variant, size, style: rest.style }}>
          {delete rest.style}
          <ButtonContainer {...{ variant, size, disabled, onPress: handlePress }} {...rest}>
            {icon && !disabled && MemoFeatherIcon}
            {disabled
              ? (
              <>
                {ActivityMemoIndicator}
                <ButtonText
                  style={textStyle}
                  {...{ variant, size }}
                >
                  Carregando...
                </ButtonText>
              </>
            ) : MemoButtonText}
          </ButtonContainer>
        </BorderView>
      )}      
    </>
  );
}

export default Button;