import {AlphabetList} from 'react-native-section-alphabet-list';
import React, {memo, useCallback} from 'react';
import styled, {css} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Image, Platform, StyleSheet} from 'react-native';
import {AVATAR_DEFAULT_ICON} from '@/assets';
import {ContactIdListProps, RawContact} from '@/store/contact/types';
import {useContactById} from '@/store/contact/contactStore';

interface AlphabetListProps {
  // contacts: {
  //   key: string;
  //   id: string;
  // }[];

  ids: ContactIdListProps[];
}
const imageDefault = Image.resolveAssetSource(AVATAR_DEFAULT_ICON).uri;

const CustomItem = (id: ContactIdListProps) => {
  const navigation = useNavigation<any>();

  const contact: RawContact = useContactById(id.key);

  const onDetails = useCallback(() => {
    navigation.navigate('ContactDetailScreen', {id: id.key});
  }, []);

  return (
    <ListItemContainer onPress={onDetails}>
      <AvatarContainer>
        <Avatar
          source={{
            uri: contact.avatar ? contact.avatar : imageDefault,
          }}
        />
      </AvatarContainer>
      <ContactContainer>
        {/*Alphabet list luon yeu cau mot truong la value nen co the tu tuy chinh
        value la lastName*/}
        <ListItemNameLabel>
          {contact.value} {contact.firstName}
        </ListItemNameLabel>
        <ListItemPhoneContainer numberOfLines={1}>
          {contact.phoneNumber && contact.phoneNumber.length > 0 ? (
            contact.phoneNumber.map((contact, index) => {
              return (
                <ListItemPhoneLabel key={index}>{contact}, </ListItemPhoneLabel>
              );
            })
          ) : (
            <ListItemPhoneLabel>Chưa có số điện thoại</ListItemPhoneLabel>
          )}
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

export const CustomAlphabetList = memo((props: AlphabetListProps) => {
  const {ids} = props;
  return (
    <AlphabetList
      style={styles.alphabet}
      data={ids}
      indexLetterStyle={styles.letterStyle}
      indexLetterContainerStyle={{
        marginBottom: 0,
        width: 20,
        height: 25,
      }}
      letterListContainerStyle={{
        justifyContent: 'center',
        paddingTop: 8,
      }}
      indexContainerStyle={{
        width: 30,
      }}
      index={customIndex}
      renderCustomItem={CustomItem}
      renderCustomSectionHeader={CustomSectionHeader}
    />
  );
});

const ListItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 64px;
`;

const ContactContainer = styled.View`
  width: 75%;
  height: 64px;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 12px;
  align-items: flex-start;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const SectionHeaderContainer = styled.View`
  background-color: white;
  justify-content: center;
  height: 36px;
`;

const SectionHeaderLabel = styled.Text`
  font-weight: 500;
  padding-left: 16px;
  font-size: 15px;
  color: black;
  line-height: 16px;
  letter-spacing: 0.12px;
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
`;

const ListItemPhoneContainer = styled.Text``;

const ListItemPhoneLabel = styled.Text`
  font-weight: 400;
  color: #828282;
  font-style: normal;
  font-size: 14px;
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

const styles = StyleSheet.create({
  letterStyle: {
    color: '#F2A54A',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.12,
  },
  alphabet: {
    flex: 1,
  },
});
