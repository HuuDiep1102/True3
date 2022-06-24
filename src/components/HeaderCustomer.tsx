import React from 'react';
import styled from 'styled-components/native';
import {CAMERA_ICON, MENU_ICON} from '../assets';
import {Colors} from '../theme/Color';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';

interface HeaderCustomerProps {
  label: string;
}
export const HeaderCustomer = (props: HeaderCustomerProps) => {
  const navigation = useNavigation();
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
  height: 44px;
  margin-top: 11px;
`;
const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: ${Colors.gray1};
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
