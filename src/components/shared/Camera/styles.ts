import styled from 'styled-components/native';
import { ThemeColors } from '../../../assets/theme-colors';

export const ActionButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CameraAction = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9
})`
  margin: 16px;
  padding: 16px;
  border-radius: 16px;
  min-width: 120px;

  align-items: center;
  justify-content: center;

  background-color: ${ThemeColors.green[100]};
`;

export const Text = styled.Text`
  font-family: 'Montserrat_500Medium';
  font-size: 16px;
  color: white;
`;