/////ContactDetail
import React, {memo, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  ARROW_ICON,
  AVATAR_DEFAULT_ICON,
  FACETIME_ICON,
  MAIL_ICON,
  MESSAGE_ICON,
  PHONE_ICON,
} from '@/assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import {ContactItem} from '@/screens/ContactDetailScreen/components/ContactItem';

import {
  removeContactAction,
  useContactById,
} from '@/store/contact/contactStore';
import Modal from 'react-native-modal';
import {css} from 'styled-components';
import {RawContact} from '@/store/contact/types';

const imageDefault = Image.resolveAssetSource(AVATAR_DEFAULT_ICON).uri;

export const ContactDetailScreen = memo(() => {
  const navigation = useNavigation<any>();

  const [isActivePhoneNumber, setActivePhoneNumber] = useState(false);

  const [isActiveEmail, setActiveEmail] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [contactId, setContactId] = useState('0');

  const route = useRoute<any>();

  const params: RawContact = route?.params?.params;

  useEffect(() => {
    if (params?.id) {
      setContactId(params?.id);
    } else {
      setContactId('0');
    }
  }, [params?.id]);

  const contact: RawContact = useContactById(contactId);

  useEffect(() => {
    if (contact.phoneNumber.length > 0) setActivePhoneNumber(true);
    else setActivePhoneNumber(false);
  }, [contact]);

  useEffect(() => {
    if (contact.email.length > 0) setActiveEmail(true);
    else setActiveEmail(false);
  }, [contact]);

  const onRemoveContact = () => {
    return Alert.alert('Nhắc nhở', 'Bạn có chắc chắn muốn xoá liên hệ?', [
      {
        text: 'Yes',
        onPress: () => {
          removeContactAction(contactId);
          navigation.navigate('TabNavigation');
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const onBack = useCallback(() => {
    navigation.navigate('TabNavigation');
  }, []);

  const onCreateContact = useCallback(() => {
    navigation.navigate('CreateContactScreen', {contact, id: contactId});
  }, [contact, contactId]);

  const onSendMessage = useCallback(() => {
    if (contact.phoneNumber && contact.phoneNumber.length > 0) {
      setModalVisible(true);
      return;
    }
    setModalVisible(false);
  }, [contact]);

  const onLinkingTel = useCallback(contact => {
    Linking.openURL(`tel:${contact}`);
  }, []);

  const onLinkingMess = useCallback(contact => {
    Linking.openURL(`sms:${contact}`);
  }, []);

  const onLinkingMail = useCallback(contact => {
    Linking.openURL(`mailto:${contact}`);
  }, []);

  return (
    <Container>
      <HeaderView />
      <HeaderContainerUpdate>
        <DrawButton onPress={onBack}>
          <HeaderImage source={ARROW_ICON} />
        </DrawButton>
        <CreateContactButton onPress={onCreateContact}>
          <HeaderText>Sửa</HeaderText>
        </CreateContactButton>
      </HeaderContainerUpdate>
      <FlatList
        data={[{}]}
        renderItem={() => (
          <>
            <WrapInput>
              <InputTitleContainer>
                <InputTitleText>Điện thoại</InputTitleText>
              </InputTitleContainer>
              <InputContactContainer>
                {contact.phoneNumber && contact.phoneNumber.length > 0 ? (
                  contact.phoneNumber.map((contact, index) => {
                    return (
                      <InputContactButton key={index} onPress={onLinkingTel}>
                        <InputContact>{contact}</InputContact>
                      </InputContactButton>
                    );
                  })
                ) : (
                  <InputContact>Chưa có số điện thoại</InputContact>
                )}
              </InputContactContainer>
              <InputTitleContainer>
                <InputTitleText>Email</InputTitleText>
              </InputTitleContainer>
              <InputContactContainer>
                {contact.email && contact.email.length > 0 ? (
                  contact.email.map((contact, index) => {
                    return (
                      <InputContactButton key={index} onPress={onLinkingMail}>
                        <InputContact>{contact}</InputContact>
                      </InputContactButton>
                    );
                  })
                ) : (
                  <InputContact>Chưa có email</InputContact>
                )}
              </InputContactContainer>
              <InputTitleContainer>
                <InputTitleText>Ghi chú</InputTitleText>
              </InputTitleContainer>
              <InputContactContainer>
                <InputContactNote></InputContactNote>
              </InputContactContainer>
              <WrapButton>
                <Modal
                  style={styles.modal}
                  isVisible={modalVisible}
                  hasBackdrop={true}
                  statusBarTranslucent={true}
                  onBackdropPress={() => {
                    setModalVisible(false);
                  }}>
                  <CenteredView>
                    <ModalView>
                      <InputContactContainerMessage>
                        {contact.phoneNumber.map((contact, index) => {
                          return (
                            <InputContactButton
                              key={index}
                              onPress={onLinkingMess}>
                              <ContactIconImageModal source={MESSAGE_ICON} />
                              <InputContact>{contact}</InputContact>
                            </InputContactButton>
                          );
                        })}
                      </InputContactContainerMessage>
                    </ModalView>
                  </CenteredView>
                </Modal>
                <BtnMessage onPress={onSendMessage}>
                  <BtnMessageText>Gửi tin nhắn</BtnMessageText>
                </BtnMessage>

                <BtnRemove onPress={onRemoveContact}>
                  <BtnRemoveText>Xoá người gọi</BtnRemoveText>
                </BtnRemove>
              </WrapButton>
            </WrapInput>
          </>
        )}
        ListHeaderComponent={
          <>
            <HeaderContainer>
              <AvatarContainer>
                <LogIcon
                  source={{
                    uri: contact.avatar ? contact.avatar : imageDefault,
                  }}
                />
              </AvatarContainer>

              <InfoContainer>
                <InfoName>
                  {contact.value} {contact.firstName}
                </InfoName>
                <InfoJob>UI/UX Design</InfoJob>
              </InfoContainer>

              <ContactIconContainer>
                <ContactItem
                  label1={`tel:`}
                  label2={'Nhấn gọi điện'}
                  icon={PHONE_ICON}
                  active={isActivePhoneNumber}
                  keyName={contact.phoneNumber}
                />
                <ContactItem
                  label1={`sms:`}
                  label2={'Nhắn tin'}
                  icon={MESSAGE_ICON}
                  active={isActivePhoneNumber}
                  keyName={contact.phoneNumber}
                />
                <ContactItem
                  label1={'tel:'}
                  label2={'Facetime'}
                  icon={FACETIME_ICON}
                  active={isActivePhoneNumber}
                  keyName={contact.phoneNumber}
                />
                <ContactItem
                  label1={'mailto:'}
                  label2={'Gửi mail'}
                  icon={MAIL_ICON}
                  active={isActiveEmail}
                  keyName={contact.email}
                />
              </ContactIconContainer>
            </HeaderContainer>
          </>
        }
      />
    </Container>
  );
});

const Container = styled.View`
  background-color: white;
  margin-bottom: 20px;
`;

const HeaderContainer = styled.View`
  z-index: 1;
`;
const HeaderView = styled.View`
  background-color: #f2a54a;
  opacity: 0.05;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 360px;
`;

const AvatarContainer = styled.View`
  padding-top: 14px;
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
  margin-top: 10px;
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

const InputContactContainer = styled.View`
  width: 90%;
  background-color: white;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const InputContactContainerMessage = styled.View`
  width: 90%;
  background-color: white;
`;
const InputContact = styled.Text`
  color: #2f80ed;
  font-size: 17px;
  font-weight: 400;
  padding-bottom: 8px;
`;

const InputContactNote = styled.TextInput`
  color: #2f80ed;
  font-size: 17px;
  font-weight: 400;
  padding-bottom: 8px;
`;

const InputContactButton = styled.TouchableOpacity`
  flex-direction: row;
`;

const WrapInput = styled.View`
  margin-bottom: 200px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const WrapButton = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const InputTitleContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const InputTitleText = styled.Text`
  font-weight: 400;
  justify-content: center;
  align-self: flex-start;
  padding-left: 18px;
  padding-top: 9px;
  color: black;
  padding-bottom: 8px;
`;

const BtnMessage = styled.TouchableOpacity`
  height: 45px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
  justify-content: center;
`;
const BtnRemove = styled.TouchableOpacity`
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
`;

const BtnRemoveText = styled(BtnMessageText)`
  font-weight: 400;
  color: #ff4a4a;
  font-size: 15px;
`;

const HeaderContainerUpdate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  ${Platform.select({
    ios: css`
      padding-top: 50px;
    `,
    android: css`
      padding-top: 40px;
    `,
  })};
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
const ContactIconImageModal = styled.Image`
  height: 24px;
  width: 24px;
  tint-color: #f2a54a;
  margin-bottom: 6px;
  margin-left: 5px;
`;
const CenteredView = styled.View`
  align-items: center;
`;

const ModalView = styled.View`
  width: 120%;
  background-color: white;
  border-radius: 30px;
  padding-top: 10px;
  padding-left: 20px;
`;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
});
