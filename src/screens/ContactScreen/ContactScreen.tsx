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
import styled from 'styled-components/native';

import {SEARCH_ICON} from '@/assets';
import {HeaderCustomer} from '@/components/HeaderCustomer';
import {useContactIdList} from '@/store/contact/contactStore';
import {CustomAlphabetList} from '@/screens/ContactScreen/components/AlphabetList';
import {slugify} from '@/ultis/string';
import {ContactIdListProps, RawContact} from '@/store/contact/types';

export const ContactScreen = memo(() => {
  const contactIds = useContactIdList();

  const [searchText, setSearchText] = useState('');

  const contactList = useMemo(() => {
    if (searchText === '') return contactIds.map(contact => ({...contact}));

    let _contactList: any = [];

    for (let i = 0; i < contactIds.length; i++) {
      const contact: RawContact = contactIds[i];
      if (
        (contact?.normalizerForSearch || contact.value).includes(
          slugify(searchText),
        )
      ) {
        _contactList.push({...contact});
      }
    }

    return _contactList;
  }, [searchText, contactIds]);

  console.log('_contactList', contactList);

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
        {!contactIds.length ? (
          <NotificationView>
            <NotificationText>The list is empty</NotificationText>
          </NotificationView>
        ) : null}
        <CustomAlphabetList contactList={contactList} />
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
