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
import React, {memo, useMemo, useState} from 'react';
import styled, {css} from 'styled-components/native';

import {SEARCH_ICON} from '../../assets';
import {HeaderCustomer} from '../../components/HeaderCustomer';
import {useContacts} from '../../redux/contact/contactStore';
import {CustomAlphabetList} from './components/AlphabetList';
import {slugify} from '../../ultis/string';

export const ContactScreen = memo(() => {
  const listContact = useContacts();

  const [searchText, setSearchText] = useState('');

  const contacts = useMemo(() => {
    if (searchText === '')
      return listContact.map(item => ({...item, key: item.id}));

    let _data: any = [];
    for (let i = 0; i < listContact.length; i++) {
      const contact = listContact[i];
      if (
        (contact?.normalizerForSearch || contact.value).includes(
          slugify(searchText),
        )
      ) {
        _data.push({...contact, key: contact.id});
      }
    }

    return _data;
  }, [searchText, listContact]);

  console.log('data', contacts);

  return (
    <Container>
      <HeaderCustomer label={'Liên hệ'} />
      <SearchbarContainer>
        <Search source={SEARCH_ICON} />
        <InputSearch
          placeholder="Tìm kiếm danh bạ"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={'#BDBDBD'}
        />
      </SearchbarContainer>

      <ListContainer>
        {!listContact.length ? (
          <NotificationView>
            <NotificationText>The list is empty</NotificationText>
          </NotificationView>
        ) : null}
        <CustomAlphabetList contacts={contacts} />
      </ListContainer>
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const ListContainer = styled.View`
  flex: 1;
`;

const NotificationView = styled.View`
  justify-content: center;
  align-items: center;
`;

const NotificationText = styled.Text`
  color: black;
  font-size: 18px;
  padding-top: 75%;
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
