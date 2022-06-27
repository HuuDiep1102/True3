import React from 'react';
import styled from 'styled-components/native';
import {
  AVATAR2,
  PHONE_ICON,
  MESSAGE_ICON,
  FACETIME_ICON,
  MAIL_ICON,
} from '../../assets';

import {HeaderCustomerInfo} from './components/HeaderCustomerInfo';

export const ContactDetailScreen = () => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderView />
        <HeaderCustomerInfo label={'Sửa'} />
        <AvatarContainer>
          <LogIcon source={AVATAR2} />
        </AvatarContainer>

        <InfoContainer isIos>
          <InfoName>Nguyễn Tiến Nam</InfoName>
          <InfoJob>UI/UX Design</InfoJob>
        </InfoContainer>

        <ContactIconContainer>
          <ContactItem>
            <ContactIconActive>
              <ContactIcon source={PHONE_ICON} />
            </ContactIconActive>
            <ContactActiveText>Nhấn gọi điện</ContactActiveText>
          </ContactItem>
          <ContactItem>
            <ContactIconActive>
              <ContactIcon source={MESSAGE_ICON} />
            </ContactIconActive>
            <ContactActiveText>Nhắn tin</ContactActiveText>
          </ContactItem>
          <ContactItem>
            <ContactIconActive>
              <ContactIcon source={FACETIME_ICON} />
            </ContactIconActive>
            <ContactActiveText>Facetime</ContactActiveText>
          </ContactItem>
          <ContactItem>
            <ContactIconInactive disabled={true}>
              <ContactIcon source={MAIL_ICON} />
            </ContactIconInactive>
            <ContactInactiveText>Gửi mail</ContactInactiveText>
          </ContactItem>
        </ContactIconContainer>
      </HeaderContainer>

      <ContactContainer>
        <WrapInput>
          <InputTitleContainer>
            <InputTitleText>Điện thoại</InputTitleText>
          </InputTitleContainer>
          <InputContactContainer>
            <InputContact>0977272160</InputContact>
          </InputContactContainer>
          <InputTitleContainer>
            <InputTitleText>Ghi chú</InputTitleText>
          </InputTitleContainer>
          <InputContactContainer>
            <InputContact></InputContact>
          </InputContactContainer>
        </WrapInput>

        <WrapButton isIos>
          <Btn>
            <BtnMessageText>Gửi tin nhắn</BtnMessageText>
          </Btn>
          <Btn>
            <BtnRemoveText>Xoá người gọi</BtnRemoveText>
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
`;

const ContactIconContainer = styled.View`
  height: 64px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const ContactItem = styled.View`
  justify-content: center;
  align-items: center;
`;

const ContactIconActive = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #f2a54a;
  justify-content: center;
  align-items: center;
`;

const ContactIconInactive = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 0.5px;
  border-color: #bdbdbd;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const ContactIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const ContactActiveText = styled.Text`
  font-weight: 400;
  font-size: 11px;
  align-self: center;
  padding: 10px;
  color: #f2a54a;
`;

const ContactInactiveText = styled.Text`
  font-weight: 400;
  font-size: 11px;
  align-self: center;
  padding: 10px;
  color: #bdbdbd;
`;

const InfoContainer = styled.View`
  margin-top: 20px;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
`;

const InfoName = styled.TextInput`
  font-weight: 500;
  font-size: 18px;
  align-self: center;
`;

const InfoJob = styled.TextInput`
  font-weight: 400;
  font-size: 13px;
  opacity: 0.5;
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

const WrapInput = styled.View`
  height: 64px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const WrapButton = styled.View<{isIos: boolean}>`
  margin-top: ${p => (p.isIos ? 60 : 80)};
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
