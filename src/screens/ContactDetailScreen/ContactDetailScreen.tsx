import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {
  PHONE_ICON,
  MESSAGE_ICON,
  FACETIME_ICON,
  MAIL_ICON,
  ARROW_ICON,
} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Linking} from 'react-native';
import {ContactItem} from './components/ContactItem';

import {removeContactAction} from '../../redux/contact/contactStore';

export const ContactDetailScreen = () => {
  const navigation = useNavigation<any>();
  const [isActivePhoneNumber, setActivePhoneNumber] = useState(false);
  const [isActiveEmail, setActiveEmail] = useState(false);

  const route = useRoute();

  const item = route?.params.item;

  useEffect(() => {
    if (item.phoneNumber.length > 0) setActivePhoneNumber(true);
    else setActivePhoneNumber(false);
  }, [route?.params.item]);

  useEffect(() => {
    if (item.email.length > 0) setActiveEmail(true);
    else setActiveEmail(false);
  }, [route?.params.item]);

  return (
    <Container>
      <HeaderContainer>
        <HeaderView />
        <HeaderContainerUpdate>
          <DrawButton onPress={navigation.goBack}>
            <HeaderImage source={ARROW_ICON} />
          </DrawButton>
          <CreateContactButton
            onPress={() => navigation.navigate('CreateContactScreen', {item})}>
            <HeaderText>Sửa</HeaderText>
          </CreateContactButton>
        </HeaderContainerUpdate>
        <AvatarContainer>
          <LogIcon
            source={{
              uri: item.avatar,
            }}
          />
        </AvatarContainer>

        <InfoContainer isIos>
          <InfoName>
            {item.value} {item.firstName}
          </InfoName>
          <InfoJob>UI/UX Design</InfoJob>
        </InfoContainer>

        <ContactIconContainer>
          <ContactItem
            label1={`tel:${item.phoneNumber}`}
            label2={'Nhấn gọi điện'}
            icon={PHONE_ICON}
            active={isActivePhoneNumber}
          />
          <ContactItem
            label1={`sms:${item.phoneNumber}`}
            label2={'Nhắn tin'}
            icon={MESSAGE_ICON}
            active={isActivePhoneNumber}
          />
          <ContactItem
            label1={`tel:${item.phoneNumber}`}
            label2={'Facetime'}
            icon={FACETIME_ICON}
            active={isActivePhoneNumber}
          />
          <ContactItem
            label1={`mailto:${item.email}`}
            label2={'Gửi mail'}
            icon={MAIL_ICON}
            active={isActiveEmail}
          />
        </ContactIconContainer>
      </HeaderContainer>

      <ContactContainer>
        <WrapInput>
          <InputTitleContainer>
            <InputTitleText>Điện thoại</InputTitleText>
          </InputTitleContainer>
          <InputContactContainer>
            {item.phoneNumber.map(item => {
              return (
                <InputContactButton
                  onPress={() => {
                    Linking.openURL(`tel:${item}`);
                  }}>
                  <InputContact>{item}</InputContact>
                </InputContactButton>
              );
            })}
          </InputContactContainer>
          <InputTitleContainer>
            <InputTitleText>Email</InputTitleText>
          </InputTitleContainer>
          <InputContactContainer>
            {item.email.map(item => {
              return (
                <InputContactButton
                  onPress={() => {
                    Linking.openURL(`mailto:${item}`);
                  }}>
                  <InputContact>{item}</InputContact>
                </InputContactButton>
              );
            })}
          </InputContactContainer>
          <InputTitleContainer>
            <InputTitleText>Ghi chú</InputTitleText>
          </InputTitleContainer>
          <InputContactContainer>
            <InputContact></InputContact>
          </InputContactContainer>
        </WrapInput>

        <WrapButton>
          <Btn
            onPress={() => {
              Linking.openURL(`sms:${item.phoneNumber}`);
            }}>
            <BtnMessageText>Gửi tin nhắn</BtnMessageText>
          </Btn>
          <Btn>
            <BtnRemoveText
              onPress={() => {
                removeContactAction(item);
                navigation.navigate('ContactScreen');
              }}>
              Xoá người gọi
            </BtnRemoveText>
          </Btn>
        </WrapButton>
      </ContactContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  padding-top: 40px;
`;

const HeaderContainer = styled.View``;

const HeaderView = styled.View`
  background-color: #f2a54a;
  opacity: 0.05;
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const AvatarContainer = styled.View`
  margin-top: 14px;
  justify-content: center;
  align-items: center;
`;

const LogIcon = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 55px;
`;

const ContactIconContainer = styled.View`
  height: 64px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const InfoContainer = styled.View`
  margin-top: 20px;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
`;

const InfoName = styled.Text`
  font-weight: 500;
  font-size: 18px;
  align-self: center;
  color: black;
`;

const InfoJob = styled.Text`
  font-weight: 400;
  font-size: 13px;
  opacity: 0.5;
  color: black;
`;

const ContactContainer = styled.View``;

const InputContactContainer = styled.View`
  width: 90%;
  background-color: white;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
  justify-content: center;
  align-items: flex-start;
`;
const InputContact = styled.Text`
  color: #2f80ed;
  font-size: 17px;
  font-weight: 400;
  font-family: Roboto-Regular;
  padding-bottom: 8px;
`;

const InputContactButton = styled.TouchableOpacity``;

const WrapInput = styled.View`
  height: 64px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const WrapButton = styled.View`
  margin-top: 250px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const InputTitleContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
`;

const InputTitleText = styled.Text`
  font-weight: 400;
  justify-content: center;
  align-self: flex-start;
  padding-left: 20px;
  padding-top: 10px;
  color: black;
`;

const Btn = styled.TouchableOpacity`
  height: 45px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
  justify-content: center;
`;
const BtnMessageText = styled.Text`
  font-weight: 400;
  color: #333333;
  font-size: 15px;
  font-family: Roboto-Regular;
`;

const BtnRemoveText = styled(BtnMessageText)`
  font-weight: 400;
  color: #ff4a4a;
  font-size: 15px;
  font-family: Roboto-Regular;
`;

const HeaderContainerUpdate = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: #f2a54a;
`;

const DrawButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const CreateContactButton = styled.TouchableOpacity`
  padding-right: 16px;
`;
const HeaderImage = styled.ImageBackground`
  width: 24px;
  height: 24px;
`;
