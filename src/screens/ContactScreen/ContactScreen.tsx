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
import React, {useCallback, useEffect, useState} from 'react';
import styled, {css} from 'styled-components/native';

import {AlphabetList} from 'react-native-section-alphabet-list';
import {AVATAR_DEFAULT_ICON, SEARCH_ICON} from '../../assets';
import {useNavigation} from '@react-navigation/native';

import {HeaderCustomer} from '../../components/HeaderCustomer';
import {Image, Platform} from 'react-native';
import {useContacts} from '../../redux/contact/contactStore';

const CustomItem = item => {
  const navigation = useNavigation<any>();

  const imageDefault = Image.resolveAssetSource(AVATAR_DEFAULT_ICON).uri;

  return (
    <ListItemContainer
      onPress={() => navigation.navigate('ContactDetailScreen', {item})}>
      <AvatarContainer>
        <Avatar
          source={{
            uri: item.avatar ? item.avatar : imageDefault,
          }}
        />
      </AvatarContainer>
      <ContactContainer>
        {/*Alphabet list luon yeu cau mot truong la value nen co the tu tuy chinh
        value la lastName*/}
        <ListItemNameLabel>
          {item.value} {item.firstName}
        </ListItemNameLabel>
        <ListItemPhoneContainer numberOfLines={1}>
          {item.phoneNumber.map(item => {
            return <ListItemPhoneLabel>{item}, </ListItemPhoneLabel>;
          })}
        </ListItemPhoneContainer>
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

  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const onChangeText = useCallback(text => {
    console.log(text);
    setValue(text);
  }, []);

  useEffect(() => {
    let _data = listContact.filter(item => {
      return (
        item.firstName?.toLowerCase().includes(value?.toLowerCase()) ||
        item.value?.toLowerCase().includes(value?.toLowerCase()) ||
        item.phoneNumber
          ?.toString()
          ?.toLowerCase()
          .includes(value?.toLowerCase())
      );
    });
    setData(_data);
  }, [value, listContact]);

  console.log('list', listContact);

  return (
    <Container>
      <HeaderCustomer label={'Liên hệ'} />
      <SearchbarContainer>
        <Search source={SEARCH_ICON} />
        <InputSearch
          placeholder="Tìm kiếm danh bạ"
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={'#BDBDBD'}
        />
      </SearchbarContainer>
      {!listContact.length ? (
        <NotificationView>
          <NotificationText>The list is empty</NotificationText>
        </NotificationView>
      ) : null}
      <ListContainer>
        <AlphabetList
          data={data}
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
      </ListContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  //padding-bottom: 100px;
`;
const ListContainer = styled.View`
  //margin-bottom: 150px;
`;

const NotificationView = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 300px;
`;

const NotificationText = styled.Text`
  color: black;
  font-size: 18px;
`;
const ListItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 64px;
  align-items: center;
`;

const ContactContainer = styled.View`
  width: 75%;
  height: 64px;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
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

const ListItemPhoneContainer = styled.Text`
  //flex-direction: row;
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
  border-radius: 35px;
`;

const SearchbarContainer = styled.View`
  background-color: #f2f2f2;
  opacity: 0.5;
  height: 36px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 9px;
  flex-direction: row;
  border-radius: 6px;
  padding-left: 34px;
  align-items: center;
`;

const InputSearch = styled.TextInput`
  color: black;
  width: 100%;
  font-size: 13px;
  font-weight: 300;
`;

const Search = styled.Image`
  position: absolute;
  left: 8px;
  height: 16px;
  width: 16px;
`;

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
