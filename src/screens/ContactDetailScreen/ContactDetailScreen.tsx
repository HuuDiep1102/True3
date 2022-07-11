/////ContactDetail
import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {
  PHONE_ICON,
  MESSAGE_ICON,
  FACETIME_ICON,
  MAIL_ICON,
  ARROW_ICON,
  AVATAR_DEFAULT_ICON,
  CAMERA_INPUT_ICON,
} from '../../assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert, FlatList, Linking, View, Image} from 'react-native';
import {ContactItem} from './components/ContactItem';

import {removeContactAction} from '../../redux/contact/contactStore';
import {AvatarPicker} from '../CreateContact/components/AvatarPicker';
import Modal from 'react-native-modal';

export const ContactDetailScreen = () => {
  const navigation = useNavigation<any>();
  const [isActivePhoneNumber, setActivePhoneNumber] = useState(false);
  const [isActiveEmail, setActiveEmail] = useState(false);

  const route = useRoute();

  const imageDefault = Image.resolveAssetSource(AVATAR_DEFAULT_ICON).uri;

  const [modalVisible, setModalVisible] = useState(false);

  const item = route?.params.item;

  useEffect(() => {
    if (item.phoneNumber.length > 0) setActivePhoneNumber(true);
    else setActivePhoneNumber(false);
  }, [item]);

  useEffect(() => {
    if (item.email.length > 0) setActiveEmail(true);
    else setActiveEmail(false);
  }, [item]);

  //console.log('item', item);

  const showConfirmDialog = () => {
    return Alert.alert('Nhắc nhở', 'Bạn có chắc chắn muốn xoá liên hệ?', [
      {
        text: 'Yes',
        onPress: () => {
          removeContactAction(item);
          navigation.navigate('TabNavigation');
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  return (
    <Container>
      <HeaderView />
      <HeaderContainerUpdate>
        <DrawButton onPress={() => navigation.navigate('TabNavigation')}>
          <HeaderImage source={ARROW_ICON} />
        </DrawButton>
        <CreateContactButton
          onPress={() => navigation.navigate('CreateContactScreen', {item})}>
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
                <InputContactNote></InputContactNote>
              </InputContactContainer>
              <WrapButton>
                <Modal
                  style={{justifyContent: 'flex-end'}}
                  isVisible={modalVisible}
                  hasBackdrop={true}
                  statusBarTranslucent={true}
                  onBackdropPress={() => {
                    setModalVisible(false);
                  }}>
                  <CenteredView>
                    <ModalView>
                      <InputContactContainerMessage>
                        {item.phoneNumber.map(item => {
                          return (
                            <InputContactButton
                              onPress={() => {
                                Linking.openURL(`sms:` + item);
                              }}>
                              <ContactIconImageModal source={MESSAGE_ICON} />
                              <InputContact>{item}</InputContact>
                            </InputContactButton>
                          );
                        })}
                      </InputContactContainerMessage>
                    </ModalView>
                  </CenteredView>
                </Modal>
                <BtnMessage
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <BtnMessageText>Gửi tin nhắn</BtnMessageText>
                </BtnMessage>

                <BtnRemove onPress={() => showConfirmDialog()}>
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
                    uri: item.avatar ? item.avatar : imageDefault,
                  }}
                />
              </AvatarContainer>

              <InfoContainer>
                <InfoName>
                  {item.value} {item.firstName}
                </InfoName>
                <InfoJob>UI/UX Design</InfoJob>
              </InfoContainer>

              <ContactIconContainer>
                <ContactItem
                  label1={`tel:`}
                  label2={'Nhấn gọi điện'}
                  icon={PHONE_ICON}
                  active={isActivePhoneNumber}
                  keyName={item.phoneNumber}
                />
                <ContactItem
                  label1={`sms:`}
                  label2={'Nhắn tin'}
                  icon={MESSAGE_ICON}
                  active={isActivePhoneNumber}
                  keyName={item.phoneNumber}
                />
                <ContactItem
                  label1={'tel:'}
                  label2={'Facetime'}
                  icon={FACETIME_ICON}
                  active={isActivePhoneNumber}
                  keyName={item.phoneNumber}
                />
                <ContactItem
                  label1={'mailto:'}
                  label2={'Gửi mail'}
                  icon={MAIL_ICON}
                  active={isActiveEmail}
                  keyName={item.email}
                />
              </ContactIconContainer>
            </HeaderContainer>
          </>
        }
        // stickyHeaderIndices={[0]}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
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
  bottom: 400px;
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
  font-family: Roboto-Regular;
  padding-bottom: 8px;
  padding-left: 10px;
`;

const InputContactNote = styled.TextInput`
  color: #2f80ed;
  font-size: 17px;
  font-weight: 400;
  font-family: Roboto-Regular;
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
  margin-top: 30px;
`;
const AddButton = styled.View`
  height: 30px;
  width: 30px;
  background-color: #f2a54a;
  border-radius: 50px;
  position: absolute;
  right: 140px;
  top: 70px;
  justify-content: center;
  align-items: center;
`;
const AddButtonIcon = styled.Image`
  height: 13px;
  width: 15px;
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
