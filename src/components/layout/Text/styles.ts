import styled, { css } from 'styled-components/native';

export interface TextProps {
  bold?: boolean;
  medium?: boolean;

  color?: string;

  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  h1?: boolean;

  montserrat?:boolean;
  quicksand?:boolean;
}

const mediumStyle = {
  quicksand: css`
    font-family: 'Quicksand_500Medium';
  `,
  montserrat: css`
    font-family: 'Montserrat_500Medium';
  `,
};

const boldStyle = {
  quicksand: css`
    font-family: 'Quicksand_700Bold';
    text-transform: uppercase;
  `,
  montserrat: css`
    font-family: 'Montserrat_700Bold';
    text-transform: uppercase;
  `,
};

const sizesStyles = {
  sm: css`
    font-size: 14px;
  `,
  md: css`
    font-size: 16px;
  `,
  lg: css`
    font-size: 18px;
  `,
  xl: css`
    font-size: 24px;
  `,
  xxl: css`
    font-size: 32px;
  `,
  xxl1: css`
    font-size: 44px;
  `,
}

export const Text = styled.Text<TextProps>`
    font-family: 'Quicksand_400Regular';

    color: ${({ color }) => color ? color : 'white'};

    ${({ montserrat }) => montserrat && "font-family: 'Montserrat_400Regular';"}

    ${({ bold, montserrat }) => bold && boldStyle[montserrat ? 'montserrat': 'quicksand']}
    ${({ medium, montserrat }) => medium && mediumStyle[montserrat ? 'montserrat' : 'quicksand']}

    ${({ size }) => size && sizesStyles[size || 'md']}
`;
