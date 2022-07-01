/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

/*
Note: Do useContact ra 1 list de nem vao section list
 */
import React from 'react';
import styled, {css} from 'styled-components/native';

import {AlphabetList} from 'react-native-section-alphabet-list';
import {AVATAR1} from '../../assets';
import {SEARCH_ICON} from '../../assets';
import {useNavigation} from '@react-navigation/native';

import {HeaderCustomer} from '../../components/HeaderCustomer';
import {Platform} from 'react-native';
import {useContacts} from '../../redux/contact/contactStore';

const CustomItem = item => {
  const navigation = useNavigation<any>();
  return (
    <ListItemContainer
      onPress={() => navigation.navigate('ContactDetailScreen')}>
      <AvatarContainer>
        <Avatar source={AVATAR1} />
      </AvatarContainer>
      <ContactContainer>
        {/*Alphabet list luon yeu cau mot truong la value nen co the tu tuy chinh
        value la firstName*/}
        <ListItemNameLabel>{item.value}</ListItemNameLabel>
        <ListItemPhoneLabel>{item.firstName}</ListItemPhoneLabel>
      </ContactContainer>
    </ListItemContainer>
  );
};

const CustomSectionHeader = (section: any) => {
  return (
    <SectionHeaderContainer>
      <Background />
      <SectionHeaderLabel>{section.title}</SectionHeaderLabel>
    </SectionHeaderContainer>
  );
};

export const ContactScreen = () => {
  const listContact = useContacts();
  console.log('list', listContact);
  return (
    <Container>
      <HeaderCustomer label={'Liên hệ'} />
      <SearchbarContainer>
        <Search source={SEARCH_ICON} />
        <InputSearch placeholder="Tìm kiếm danh bạ" />
      </SearchbarContainer>
      <AlphabetList
        data={listContact}
        letterListContainerStyle={{
          justifyContent: 'space-evenly',
        }}
        indexLetterStyle={{
          color: '#F2A54A',
          fontSize: 13,
          fontWeight: '400',
        }}
        indexContainerStyle={{
          marginRight: 10,
          paddingTop: 10,
        }}
        index={customIndex}
        renderCustomItem={CustomItem}
        renderCustomSectionHeader={CustomSectionHeader}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 37px;
  padding-bottom: 100px;
`;

const ListItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 64px;
  align-items: center;
`;

const ContactContainer = styled.View`
  width: 75%;
  height: 64px;
  justify-content: space-evenly;
  align-items: flex-start;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const SectionHeaderContainer = styled.View`
  background-color: white;
`;
const Background = styled.View`
  background-color: rgba(224, 224, 224, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const ListItemNameLabel = styled.Text`
  ${Platform.select({
    ios: css`
      font-weight: 500;
    `,
    android: css`
      font-weight: 700;
    `,
  })};
  font-size: 16px;
  color: #333333;
  font-style: normal;
  font-family: Roboto-Regular;
`;

const ListItemPhoneLabel = styled.Text`
  font-weight: 400;
  color: #828282;
  font-style: normal;
  font-size: 14px;
`;

const SectionHeaderLabel = styled.Text`
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  font-size: 15px;
  height: 36px;
  color: black;
`;

const AvatarContainer = styled.View`
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  height: 40px;
  width: 40px;
`;

const SearchbarContainer = styled.View`
  background-color: #f2f2f2;
  height: 36px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 9px;
  flex-direction: row;
  border-radius: 6px;
  padding-left: 34px;
  align-items: center;
`;

const InputSearch = styled.TextInput``;

const Search = styled.Image`
  position: absolute;
  left: 8px;
  height: 16px;
  width: 16px;
`;

const data = [
  {
    value: 'Nguyễn Tiến Nam',
    phoneNumber: '0907812123',
    key: '1',
  },
  {
    value: 'Vũ Mạnh Linh',
    phoneNumber: '0907812123',
    key: '2',
  },
  {
    value: 'Trần Thái Hà',
    phoneNumber: '0907812123',
    key: '3',
  },
  {
    value: 'Bui Mạnh Đạt',
    phoneNumber: '090788623',
    key: '4',
  },
  {
    value: 'An Phan',
    phoneNumber: '0907812123',
    key: '5',
  },
  {
    value: 'Binh Vu',
    phoneNumber: '0907812123',
    key: '6',
  },
  {
    value: 'Uyen Nguyen',
    phoneNumber: '0907812123',
    key: '7',
  },
  {
    value: 'Minh Anh',
    phoneNumber: '090788623',
    key: '8',
  },
  {
    value: 'Ong Mạnh Linh',
    phoneNumber: '0907812123',
    key: '9',
  },
  {
    value: 'Pham Thái Hà',
    phoneNumber: '0907812123',
    key: '10',
  },
  {
    value: 'Sun Mạnh Đạt',
    phoneNumber: '090788623',
    key: '11',
  },
  {
    value: 'Luu Phan',
    phoneNumber: '0907812123',
    key: '12',
  },
  {
    value: 'Zurich Vu',
    phoneNumber: '0907812123',
    key: '13',
  },
  {
    value: 'Yen Nguyen',
    phoneNumber: '0907812123',
    key: '14',
  },
  {
    value: 'Ung Anh',
    phoneNumber: '090788623',
    key: '15',
  },
];
const customIndex = [
  'a',
  'ă',
  'â',
  'b',
  'c',
  'd',
  'đ',
  'e',
  'ê',
  'f',
  'j',
  'g',
  'h',
  'i',
  'k',
  'l',
  'm',
  'n',
  'o',
  'ô',
  'ơ',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'ư',
  'v',
  'x',
  'w',
  'y',
  'z',
];
