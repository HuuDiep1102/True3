import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

interface HeaderCustomerContactProps {
  label1: string;
  label2: string;
  isActive: boolean;
}
export const HeaderCustomerContact = (props: HeaderCustomerContactProps) => {
  const {label1, label2, isActive} = props;
  const navigation = useNavigation<any>();

  return (
    <HeaderContainer>
      <DrawButton onPress={navigation.goBack}>
        <HeaderText1 isActive={isActive}>{label1}</HeaderText1>
      </DrawButton>
      <CreateContactButton onPress={() => navigation.goBack}>
        <HeaderText2 isActive={isActive}>{label2}</HeaderText2>
      </CreateContactButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HeaderText1 = styled.Text<{isActive: boolean}>`
  font-size: 18px;
  font-weight: 400;
  color: ${p => (p.isActive ? '#828282' : '#f2a54a')};
`;

const HeaderText2 = styled.Text<{isActive: boolean}>`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  font-weight: 400;
  color: ${p => (p.isActive ? '#f2a54a' : '#828282')};
`;

const DrawButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const CreateContactButton = styled.TouchableOpacity`
  padding-right: 16px;
`;
