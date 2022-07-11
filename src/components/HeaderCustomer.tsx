import React from 'react';
import styled from 'styled-components/native';
import {CAMERA_ICON, MENU_ICON} from '../assets';
import {Colors} from '../theme/Color';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface HeaderCustomerProps {
  label: string;
}
export const HeaderCustomer = (props: HeaderCustomerProps) => {
  const navigation = useNavigation<any>();
  const {label} = props;

  return (
    <HeaderContainer>
      <DrawButton onPress={() => navigation.openDrawer()}>
        <HeaderImage source={MENU_ICON} />
      </DrawButton>
      <HeaderText>{label}</HeaderText>
      <CreateContactButton
        onPress={() => navigation.navigate('CreateContactScreen')}>
        <HeaderImage source={CAMERA_ICON} />
      </CreateContactButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: ${44 + getStatusBarHeight()}px;
  padding-top: ${getStatusBarHeight()}px;
  width: 100%;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: ${Colors.gray1};
  margin-top: -6px;
`;

const DrawButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const CreateContactButton = styled.TouchableOpacity`
  padding-right: 13px;
`;

const HeaderImage = styled.ImageBackground`
  width: 24px;
  height: 24px;
`;
