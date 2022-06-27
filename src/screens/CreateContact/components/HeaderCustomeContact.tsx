import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

interface HeaderCustomerContactProps {
  label1: string;
  label2: string;
}
export const HeaderCustomerContact = (props: HeaderCustomerContactProps) => {
  const {label1, label2} = props;
  const navigation = useNavigation<any>();

  return (
    <HeaderContainer>
      <DrawButton onPress={navigation.goBack}>
        <HeaderText1>{label1}</HeaderText1>
      </DrawButton>
      <CreateContactButton onPress={() => navigation.openDrawer()}>
        <HeaderText2>{label2}</HeaderText2>
      </CreateContactButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const HeaderText1 = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: #f2a54a;
`;

const HeaderText2 = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  font-weight: 400;
  color: #828282;
`;

const DrawButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const CreateContactButton = styled.TouchableOpacity`
  padding-right: 16px;
`;
