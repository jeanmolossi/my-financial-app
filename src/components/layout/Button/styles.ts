import { RectButton } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export interface ButtonStyleProps {
  variant?: 'purple' | 'green' | 'outline_purple' | 'outline_green' | 'transparent_purple' | 'transparent_dark';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const buttonVariantStyle= {
  purple: css`
    background-color: transparent;
  `,
  green: css`
    background-color: transparent;
  `,
  outline_purple: css`
    background-color: transparent;
    border: 2px solid #A3A1FC;
  `,
  outline_green: css`
    background-color: transparent;
    border: 2px solid #6AD0BE;
  `,
  transparent_purple: css`
    background-color: transparent;
  `,
  transparent_dark: css`
    background-color: transparent;
  `,
}

const buttonSizeStyle = {
  sm: css`
    padding: 8px 16px;
    border-radius: 8px;
  `,
  md: css`
    padding: 14px 20px;
    border-radius: 14px;
  `,
  lg: css`
    padding: 20px 24px;
    border-radius: 20px;
  `,
}

export const BackgroundGradient = styled(LinearGradient)<ButtonStyleProps>`  
  ${({ size }) => buttonSizeStyle[size || 'md']}
  opacity: ${({ disabled }) => !disabled ? '1' : '0.5'};
  padding:0;
  margin: 8px;
`;

export const BorderView = styled.View<ButtonStyleProps>`
  ${({ size }) => buttonSizeStyle[size || 'md']}
  padding: 0;
  ${({ variant }) => buttonVariantStyle[variant || 'transparent_dark']}
  margin: 8px;
`;

export const ButtonContainer = styled(RectButton)<ButtonStyleProps>`
  flex-direction: row;
  align-items: center;

  ${({ size }) => buttonSizeStyle[size || 'md']}
  ${({ variant }) => buttonVariantStyle[variant || 'transparent_dark']}
  opacity: ${({ disabled }) => !disabled ? '1' : '0.5'};
`;

const textVariantStyle = {
  purple: css`
    color: #fff;
  `,
  green: css`
    color: #fff;
  `,
  outline_purple: css`
    color: #BC9CFF;
  `,
  outline_green: css`
    color: #6FCF97;
  `,
  transparent_purple: css`
    color: #BC9CFF;
  `,
  transparent_dark: css`
    color: #1f2041;
  `,
}

const textSizeStyle = {
  sm: css`
    font-size: 12px;
  `,
  md: css`
    font-size: 14px;
  `,
  lg: css`
    font-size: 18px;
  `,
  full: css``
}

export const ButtonText = styled.Text<ButtonStyleProps>`
  font-family: 'Montserrat_700Bold';
  text-transform: uppercase;

  ${({ variant }) => textVariantStyle[variant || 'purple']}
  ${({ size }) => textSizeStyle[size || 'md']}
`;