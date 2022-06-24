import React from 'react';
import styled from 'styled-components/native';

interface HeaderCustomerInfoProps {
  label: string;
}

import {ARROW_ICON} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
export const HeaderCustomerInfo = (props: HeaderCustomerInfoProps) => {
  const {label} = props;

  const navigation = useNavigation();

  return (
    <HeaderContainer>
      <DrawButton onPress={navigation.goBack}>
        <HeaderImage source={ARROW_ICON} />
      </DrawButton>
      <CreateContactButton
        onPress={() => navigation.navigate('CreateContactScreen')}>
        <HeaderText>{label}</HeaderText>
      </CreateContactButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: #f2a54a;
`;

const DrawButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const CreateContactButton = styled.TouchableOpacity`
  padding-right: 16px;
`;
const HeaderImage = styled.ImageBackground`
  width: 24px;
  height: 24px;
`;
