import React, {memo, useCallback, useEffect, useState} from 'react';

import styled from 'styled-components/native';
import {CustomerButtonList} from '@/screens/CreateContactScreen/components/CustomerButtonList';
import {CustomerButtonDateTime} from '@/screens/CreateContactScreen/components/CustomerButtonDateTime';
import {CustomerInput} from '@/screens/CreateContactScreen/components/CustomerInput';
import {AvatarPicker} from '@/screens/CreateContactScreen/components/AvatarPicker';
import {
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {updateContactAction} from '@/store/contact/contactStore';
import {slugify} from '@/ultis/string';
import {css} from 'styled-components';
import {RawContact} from '@/store/contact/types';

export const CreateContactScreen = memo(() => {
  const [isActive, setActive] = useState(false);
  const navigation = useNavigation<any>();

  //contact route lay data tu ben Detail

  const route = useRoute<any>();

  const contact: any = route?.params?.contact;

  const id = route?.params?.id;

  const [params, setParams] = useState<RawContact>({
    id: `${new Date().getTime().toString()}`,
    avatar: '',
    firstName: '',
    value: '',
    company: '',
    phoneNumber: [],
    email: [],
    address: [],
    birthday: [],
  });

  useEffect(() => {
    if (contact) {
      setParams(contact);
      return;
    }
    Keyboard.dismiss;
  }, [contact]);

  useEffect(() => {
    if (params.firstName || params.value || params.company) setActive(true);
    else setActive(false);
  }, [params.firstName, params.value, params.company]);

  // Xay dung ham onChangeText chung
  // Muon su dung ham chung phai tu build component input rieng

  const onUpdate = useCallback(() => {
    const newParams = {
      ...params,
      phoneNumber: params.phoneNumber.filter(phone => phone !== ''),
      address: params.address.filter(address => address !== ''),
      email: params.email.filter(email => email !== ''),
      normalizerForSearch: `${params.firstName} ${params.value} ${slugify(
        params.firstName,
      )} ${slugify(params.value)}`,
    };
    updateContactAction(newParams, id ?? newParams.id);
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Draw',
            },
          ],
        });
        navigation.navigate('ContactDetailScreen', {
          id: id ?? newParams.id,
        });
      }, 300);
    });

    // InteractionManager.runAfterInteractions(() => {
    //   setTimeout(() => {
    //     reset();
    //     navigateToContactDetailScreen({id: id ?? newItem.id});
    //   }, 500);
    // });
  }, [params, updateContactAction]);

  const onValueChange = useCallback((keyName: string, value: string) => {
    setParams(state => ({
      ...state,
      [keyName]: value,
    }));
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}>
      <Container>
        {/*Su dung HeaderComponent kho tuong tac du lieu*/}
        <HeaderContainer>
          {/*Su kho tuong tac du lieu*/}
          <DrawButton onPress={navigation.goBack}>
            <HeaderText1 isActive={isActive}>Hu???</HeaderText1>
          </DrawButton>
          <CreateContactButton onPress={onUpdate} disabled={!isActive}>
            <HeaderText2 isActive={isActive}>Xong</HeaderText2>
          </CreateContactButton>
        </HeaderContainer>

        <FormContainer>
          <AvatarPicker setParams={setParams} imageUri={contact?.avatar} />
          <InputContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="H???"
                keyName={'value'}
                value={params.value}
                onValueChange={onValueChange}
                placeholderTextColor={'#BDBDBD'}
                autoFocus={true}
              />
            </InputInfoContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="T??n"
                keyName={'firstName'}
                value={params.firstName}
                onValueChange={onValueChange}
                placeholderTextColor={'#BDBDBD'}
                autoFocus={false}
              />
            </InputInfoContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="C??ng ty"
                keyName={'company'}
                value={params.company}
                onValueChange={onValueChange}
                placeholderTextColor={'#BDBDBD'}
                autoFocus={false}
              />
            </InputInfoContainer>
          </InputContainer>
          <CustomerButtonList
            label={'th??m s??? ??i???n tho???i'}
            setParams={setParams}
            data={params.phoneNumber}
            keyName={'phoneNumber'}
            keyboardType="numeric"
          />
          <CustomerButtonList
            label={'th??m email'}
            setParams={setParams}
            data={params.email}
            keyName={'email'}
            keyboardType="default"
          />
          <CustomerButtonList
            label={'th??m ?????a ch???'}
            setParams={setParams}
            data={params.address}
            keyName={'address'}
            keyboardType="default"
          />
          <CustomerButtonDateTime
            label={'th??m ng??y sinh'}
            setParams={setParams}
            data={params.birthday}
          />
        </FormContainer>
      </Container>
    </KeyboardAvoidingView>
  );
});

const Container = styled.View`
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
  ${Platform.select({
    ios: css`
      padding-top: 15px;
    `,
    android: css`
      padding-top: 0;
    `,
  })};
`;

const HeaderText1 = styled.Text<{isActive: boolean}>`
  font-size: 18px;
  font-weight: 400;
  color: ${p => (p.isActive ? '#828282' : '#f2a54a')};
`;

const HeaderText2 = styled.Text<{isActive: boolean}>`
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
const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
});
