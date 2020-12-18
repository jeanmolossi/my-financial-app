import styled from 'styled-components/native';

export interface ContainerProps {
  isFocused?: boolean;
}

export const LabelContainer = styled.View`  
  margin: 8px 16px 0;
`;

export const InputContainer = styled.View<ContainerProps>`
  padding: 16px;
  margin: 8px 16px;
  border: 1px solid #1f204125;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;

  ${({ isFocused }) => isFocused && 'border-color: #1f204150'}
`;

export const TextInput = styled.TextInput`
  font-family: 'Montserrat_400Regular';
  font-size: 18px;
  flex: 1
`;