import React from 'react';

import styled from 'styled-components/native';
import {CustomerButtonList} from './components/CustomerButtonList';
import {CustomerButtonDateTime} from './components/CustomerButtonDateTime';
import {HeaderCustomerContact} from './components/HeaderCustomeContact';
import {AvatarPicker} from './components/AvatarPicker';

export const CreateContactScreen = () => {
  // const [param, setParam] = useState<{
  //   phoneNumber: string[];
  //   mail: string[];
  //   address: string[];
  //   birthday: string[];
  // }>({
  //   phoneNumber: [],
  //   mail: [],
  //   address: [],
  //   birthday: [],
  // });

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
        <CustomerButtonList label={'thêm số điện thoại'} />
        <CustomerButtonList label={'thêm email'} />
        <CustomerButtonList label={'thêm địa chỉ'} />
        <CustomerButtonDateTime label={'thêm ngày sinh'} />
      </FormContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  background-color: white;
  height: 100%;
  justify-content: center;
  padding-top: 40px;
`;
const InputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.ScrollView``;

const InputInfoContainer = styled.View`
  height: 44px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
  justify-content: center;
`;

const InputInfo = styled.TextInput``;
