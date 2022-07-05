import React, {useCallback, useEffect, useState} from 'react';

import styled from 'styled-components/native';
import {CustomerButtonList} from './components/CustomerButtonList';
import {CustomerButtonDateTime} from './components/CustomerButtonDateTime';
import {CustomerInput} from './components/CustomerInput';
import {AvatarPicker} from './components/AvatarPicker';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {updateContactAction} from '../../redux/contact/contactStore';

export const CreateContactScreen = () => {
  const [isActive, setActive] = useState(false);
  const navigation = useNavigation<any>();

  const route = useRoute();

  console.log('route', route);

  const item: any = route?.params?.item;

  const [params, setParams] = useState<{
    id: string;
    value: string[];
    avatar: string[];
    firstName: string[];
    //lastName: string[];
    company: string[];
    phoneNumber: string[];
    email: string[];
    address: string[];
    birthday: string[];
  }>({
    id: '',
    avatar: [],
    firstName: [],
    //lastName: [],
    company: [],
    phoneNumber: [],
    email: [],
    address: [],
    birthday: [],
    value: [],
  });

  useEffect(() => {
    if (item) {
      setParams(item);
    }
    return () => {
      setParams({
        id: '',
        avatar: [],
        firstName: [],
        //lastName: [],
        company: [],
        phoneNumber: [],
        email: [],
        address: [],
        birthday: [],
        value: [],
      });
    };
  }, [item]);

  useEffect(() => {
    if (params.firstName || params.value || params.company) setActive(true);
    else setActive(false);
  }, [params.firstName, params.value, params.company]);

  // Xay dung ham onChangeText chung
  // Muon su dung ham chung phai tu build component input rieng

  const onValueChange = useCallback((keyName: string, value: string[]) => {
    setParams(state => ({
      ...state,
      [keyName]: value,
    }));
  }, []);

  console.log('params', params);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Container>
        {/*Su dung HeaderComponent kho tuong tac du lieu*/}
        <HeaderContainer>
          {/*Su kho tuong tac du lieu*/}
          <DrawButton onPress={navigation.goBack}>
            <HeaderText1 isActive={isActive}>Huỷ</HeaderText1>
          </DrawButton>
          <CreateContactButton
            onPress={() => {
              //Kich Xong thi se chuyen cac params thanh state
              updateContactAction(params);
              navigation.navigate('ContactScreen');
            }}>
            <HeaderText2 isActive={isActive}>Xong</HeaderText2>
          </CreateContactButton>
        </HeaderContainer>

        <FormContainer>
          <AvatarPicker setParams={setParams} />
          <InputContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="Họ"
                keyName={'value'}
                value={params.value}
                onValueChange={onValueChange}
                autoFocus={true}
                placeholderTextColor={'#BDBDBD'}
              />
            </InputInfoContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="Tên"
                keyName={'firstName'}
                value={params.firstName}
                onValueChange={onValueChange}
                placeholderTextColor={'#BDBDBD'}
              />
            </InputInfoContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="Công ty"
                keyName={'company'}
                value={params.company}
                onValueChange={onValueChange}
                placeholderTextColor={'#BDBDBD'}
                //autoFocus={true}
              />
            </InputInfoContainer>
          </InputContainer>
          <CustomerButtonList
            label={'thêm số điện thoại'}
            setParams={setParams}
            data={params.phoneNumber}
            keyName={'phoneNumber'}
          />
          <CustomerButtonList
            label={'thêm email'}
            setParams={setParams}
            data={params.email}
            keyName={'email'}
          />
          <CustomerButtonList
            label={'thêm địa chỉ'}
            setParams={setParams}
            data={params.address}
            keyName={'address'}
          />
          <CustomerButtonDateTime
            label={'thêm ngày sinh'}
            setParams={setParams}
          />
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
