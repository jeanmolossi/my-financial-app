import { Feather } from '@expo/vector-icons';
import { useField } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { Icons } from '../../layout/Tab';
import Text from '../../layout/Text';
import { LabelContainer, InputContainer, TextInput } from './styles';

interface Props {
  name: string;
  icon?: Icons;
  iconStyle?: {
    color?: string;
    size?: number;
  };
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: ViewStyle;
};

type InputProps = TextInputProps & Props;

const Input = ({
  name,
  label,
  icon,
  labelStyle,
  iconStyle = { color: 'white', size: 20 },
  containerStyle,
  ...rest
}: InputProps) => {
  const inputRef = useRef<any>(null);
  const [ focused, setFocused ] = useState(false);

  const { defaultValue, fieldName, registerField } = useField(name);

  useEffect(() => {
    if(inputRef.current){
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value'
      })
    }
  }, [registerField, fieldName])
  
  return (
    <>
      {label && (
        <LabelContainer>
          <Text bold color="black" size="lg" style={labelStyle}>{label}</Text>
        </LabelContainer>
      )}
      <InputContainer isFocused={focused} style={containerStyle}>
        {icon && <Feather name={icon} style={{ marginRight: 8 }} {...iconStyle} />}
        <TextInput
          ref={inputRef}
          defaultValue={defaultValue}
          onChangeText={value => {
            if(inputRef.current){
              inputRef.current.value = value;
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
      </InputContainer>
    </>
  );
}

export default Input;