import React, {useState} from 'react';

import styled from 'styled-components/native';
import {AVATAR1} from '../../assets';
import {CustomButtonList} from './components/CustomButtonList';
import {HeaderCustomerContact} from './components/HeaderCustomeContact';
import {AvatarPicker} from './components/AvatarPicker';

export const CreateContactScreen = () => {

  const [param, setParam] = useState<{
    phoneNumber: string[],
    mail: string[],
    address: string[],
    birthday: string[],
  }>({
    phoneNumber: [],
    mail: [],
    address: [],
    birthday: [],
  });

  return (
    <Container>
      <HeaderCustomerContact label1={'Huỷ'} label2={'Xong'} />
      <FormContainer>
        <AvatarPicker />
        <InputContainer>
          <InputInfoContainer>
            <InputInfo placeholder="Họ" />
          </InputInfoContainer>
          <InputInfoContainer>
            <InputInfo placeholder="Tên" />
          </InputInfoContainer>
          <InputInfoContainer>
            <InputInfo placeholder="Công ty" />
          </InputInfoContainer>
        </InputContainer>
        <CustomButtonList label={'thêm số điện thoại'} />
        <CustomButtonList label={'thêm email'} />
        <CustomButtonList label={'thêm địa chỉ'} />
        <CustomButtonList label={'thêm ngày sinh'} />
      </FormContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: white;
  height: 100%;
  justify-content: center;
`;
const InputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.ScrollView``;
const LogIcon = styled.Image`
  height: 100px;
  width: 100px;
`;

const InputInfoContainer = styled.View`
  height: 44px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
  justify-content: center;
`;

const InputInfo = styled.TextInput``;
