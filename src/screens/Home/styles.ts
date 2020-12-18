import styled from 'styled-components/native';
import { Button } from '../../components';

export const BalanceContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  max-height: 100px;
  align-self: flex-start;
`;

export const HomeContainer = styled.View`
  flex: 1;
  background: #fff;
  width: 100%;
  padding-top: 36px;
  border-top-left-radius: 36px;
  border-top-right-radius: 36px;
`;

export const CardSlider = styled(Button)`
  width: 140px;
  height: 140px;
  border-radius: 24px;
  margin: 0 8px;
  align-items: center;
  justify-content: center;
`;

export const HistoricContainer = styled.View`
  flex: 1;
  padding: 8px 8px 0;
`;

export interface HistoricItemProps {
  transactionType: 'income' | 'outcome';
}

export const HistoricItem = styled.View<HistoricItemProps>`
  margin: 8px 0;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  height: 90px;

  background-color: ${({ transactionType }) => transactionType === 'income' ? '#8BA4F960' : '#BC9CFF60'};
`;