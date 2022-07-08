import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native';
import Modal from 'react-native-modal';
import {useRoute} from '@react-navigation/native';

interface ContactItemProps {
  label1: any;
  label2: string;
  icon: any;
  active: boolean;
  keyName: any;
}

export const ContactItem = (props: ContactItemProps) => {
  const {label1, label2, icon, active, keyName} = props;
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();

  const item = route?.params.item;

  return (
    <ContactItemContainer>
      <Modal
        isVisible={modalVisible}
        hasBackdrop={true}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <CenteredView>
          <ModalView>
            <InputContactContainer>
              {keyName.map(item => {
                return (
                  <InputContactButton
                    onPress={() => {
                      Linking.openURL(label1 + item);
                    }}>
                    <InputContact>{item}</InputContact>
                  </InputContactButton>
                );
              })}
            </InputContactContainer>
          </ModalView>
        </CenteredView>
      </Modal>

      <ContactIcon
        onPress={() => {
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
  background-color: antiquewhite;
  border-radius: 15px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  //background-color: #00008b;
`;
const InputContact = styled.Text`
  font-size: 17px;
  font-weight: 400;
  font-family: Roboto-Regular;
  padding-bottom: 8px;
  color: black;
  border-radius: 10px;
  width: 150px;
  padding-left: 10px;
`;

const InputContactButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CenteredView = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: antiquewhite;
  border-radius: 20px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const ButtonClose = styled.TouchableOpacity`
  background-color: #2196f3;
  width: 100px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
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
