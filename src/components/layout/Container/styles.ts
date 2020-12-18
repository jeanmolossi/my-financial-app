import styled, { css } from 'styled-components/native';

export interface ContainerProps {
  themeType?: 'dark' | 'dark.75' | 'dark.50' | 'dark.25' | 'dark.5' | 'purple' | 'green';
}

const themeVariant = {
  dark: css`
    background-color: #1f2041;
  `,
  'dark.75': css`
    background-color: #1f204175;
  `,
  'dark.50': css`
    background-color: #1f204150;
  `,
  'dark.25': css`
    background-color: #1f204125;
  `,
  'dark.5': css`
    background-color: #1f204105;
  `,
  purple: css`
    background-color: #BC9CFF;
  `,
  green: css`
    background-color: #6fcf97;
  `,
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: stretch;

  ${({ themeType }) => themeVariant[themeType || 'dark']};
`;
