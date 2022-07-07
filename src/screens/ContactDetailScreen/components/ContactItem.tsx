import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  Alert,
  Linking,
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {PHONE_ICON} from '../../../assets';

interface ContactItemProps {
  label1: string;
  label2: string;
  icon: any;
  active: boolean;
}

export const ContactItem = (props: ContactItemProps) => {
  const {label1, label2, icon, active} = props;
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();

  const item = route?.params.item;

  return (
    <ContactItemContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <CenteredView>
          <ModalView>
            <InputContactContainer>
              {item.phoneNumber.map(item => {
                return (
                  <InputContactButton
                    onPress={() => {
                      Linking.openURL(`tel:${item}`);
                    }}>
                    <ContactIconImage isActive={active} source={PHONE_ICON} />
                    <InputContact>{item}</InputContact>
                  </InputContactButton>
                );
              })}
            </InputContactContainer>
            <ButtonClose onPress={() => setModalVisible(!modalVisible)}>
              <TextStyle>Hide Modal</TextStyle>
            </ButtonClose>
          </ModalView>
        </CenteredView>
      </Modal>

      <ContactIcon
        onPress={() => {
          //Linking.openURL(label1);
          setModalVisible(true);
        }}
        isActive={active}
        disabled={!active}>
        <ContactIconImage isActive={active} source={icon} />
      </ContactIcon>
      <ContactText isActive={active}>{label2}</ContactText>
    </ContactItemContainer>
  );
};

const InputContactContainer = styled.View`
  width: 90%;
  background-color: white;
  //background-color: #00008b;
`;
const InputContact = styled.Text`
  color: #2f80ed;
  font-size: 17px;
  font-weight: 400;
  font-family: Roboto-Regular;
  padding-bottom: 8px;
`;

const InputContactButton = styled.TouchableOpacity``;

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: gray;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

const ButtonClose = styled.TouchableOpacity`
  background-color: #2196f3;
`;

const TextStyle = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

const ContactItemContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
const ContactIcon = styled.TouchableOpacity<{
  isActive: boolean;
}>`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 0.5px;
  border-color: #bdbdbd;
  justify-content: center;
  align-items: center;
  background-color: ${p => (p.isActive ? '#f2a54a' : '#ffffff')};
`;

const ContactIconImage = styled.Image<{
  isActive: boolean;
}>`
  height: 24px;
  width: 24px;
  tint-color: ${p => (p.isActive ? '#ffffff' : '#BDBDBD')};
`;

const ContactText = styled.Text<{
  isActive: boolean;
}>`
  font-weight: 400;
  font-size: 11px;
  align-self: center;
  padding: 10px;
  color: #f2a54a;
  color: ${p => (p.isActive ? '#f2a54a' : '#bdbdbd')};
`;
