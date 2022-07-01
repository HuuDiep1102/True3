import React, {useCallback, useEffect, useState} from 'react';

import styled from 'styled-components/native';
import {CustomerButtonList} from './components/CustomerButtonList';
import {CustomerButtonDateTime} from './components/CustomerButtonDateTime';
import {AvatarPicker} from './components/AvatarPicker';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {updateContactAction} from '../../redux/contact/contactStore';

export const CreateContactScreen = () => {
  const [isActive, setActive] = useState(false);
  const navigation = useNavigation<any>();

  const [params, setParams] = useState<{
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    company: string;
    phoneNumber: string;
    email: string;
    address: string;
    birthday: string;
    value: string;
  }>({
    id: `${new Date().getTime().toString()}`,
    avatar: '',
    firstName: '',
    lastName: '',
    company: '',
    phoneNumber: '',
    email: '',
    address: '',
    birthday: '',
    value: '',
  });

  const [firstName, setFirstName] = useState('');
  console.log('params', params);

  useEffect(() => {
    if (params.firstName) setActive(true);
    else setActive(false);
  }, [params.firstName]);

  //Choc se tim cach de gop cac ham onChange nay lai

  const onChangeFirstName = useCallback(
    (value: string) => {
      setParams({
        ...params,
        firstName: value,
      });
    },
    [params],
  );

  const onChangeLastName = useCallback(
    (value: string) => {
      setParams({
        ...params,
        lastName: value,
      });
    },
    [params],
  );
  const onChangeCompany = useCallback(
    (value: string) => {
      setParams({
        ...params,
        // Voi so dien thoai, hay dia chi thi la mot mang nen phai thay doi su dung phuong thuc cua mang value.push
        value: value,
      });
    },
    [params],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Container>
        {/*Su dung HeaderComponent kho tuong tac du lieu*/}
        <HeaderContainer>
          {/*Sua lai isActive kho tuong tac du lieu*/}
          <DrawButton onPress={navigation.goBack}>
            <HeaderText1 isActive={isActive}>Huy</HeaderText1>
          </DrawButton>
          <CreateContactButton
            onPress={() => {
              //Kich Xong thi se chuyen cac params thanh state
              updateContactAction(params);
              navigation.goBack();
            }}>
            <HeaderText2 isActive={isActive}>Xong</HeaderText2>
          </CreateContactButton>
        </HeaderContainer>

        <FormContainer>
          <AvatarPicker />
          <InputContainer>
            <InputInfoContainer>
              <InputInfo
                placeholder="Họ"
                value={params.lastName}
                onChangeText={onChangeLastName}
                autoFocus={true}
              />
            </InputInfoContainer>
            <InputInfoContainer>
              <InputInfo
                placeholder="Tên"
                value={params.firstName}
                onChangeText={onChangeFirstName}
                autoFocus={true}
              />
            </InputInfoContainer>
            <InputInfoContainer>
              <InputInfo
                placeholder="Công ty"
                value={params.value}
                onChangeText={onChangeCompany}
                autoFocus={true}
              />
            </InputInfoContainer>
          </InputContainer>
          <CustomerButtonList label={'thêm số điện thoại'} />
          <CustomerButtonList label={'thêm email'} />
          <CustomerButtonList label={'thêm địa chỉ'} />
          <CustomerButtonDateTime label={'thêm ngày sinh'} />
        </FormContainer>
      </Container>
    </KeyboardAvoidingView>
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
