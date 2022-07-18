import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {Linking, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

interface ContactItemProps {
  label1: any;
  label2: string;
  icon: any;
  active: boolean;
  keyName: any;
}

export const ContactItem = memo((props: ContactItemProps) => {
  const {label1, label2, icon, active, keyName} = props;
  const [modalVisible, setModalVisible] = useState(false);

  const onLinking = useCallback(() => {
    if (keyName.length === 1) {
      Linking.openURL(label1 + keyName[0]);
    } else setModalVisible(true);
  }, []);

  const onLinkingItem = useCallback(contact => {
    Linking.openURL(label1 + contact);
  }, []);

  const onBackdrop = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <ContactItemContainer>
      <Modal
        style={styles.modal}
        isVisible={modalVisible}
        hasBackdrop={true}
        statusBarTranslucent={true}
        onBackdropPress={onBackdrop}>
        <CenteredView>
          <ModalView>
            <InputContactContainer>
              {keyName.map((contact, index) => {
                return (
                  <InputContactButton key={index} onPress={onLinkingItem}>
                    <ContactIconImageModal source={icon} />
                    <InputContact>{contact}</InputContact>
                  </InputContactButton>
                );
              })}
            </InputContactContainer>
          </ModalView>
        </CenteredView>
      </Modal>

      <ContactIcon onPress={onLinking} isActive={active} disabled={!active}>
        <ContactIconImage isActive={active} source={icon} />
      </ContactIcon>
      <ContactText isActive={active}>{label2}</ContactText>
    </ContactItemContainer>
  );
});

const InputContactContainer = styled.View`
  background-color: white;
  border-radius: 15px;
  padding: 5px;
`;
const InputContact = styled.Text`
  font-size: 17px;
  font-weight: 400;
  padding-bottom: 8px;
  color: black;
  border-radius: 10px;
  padding-left: 10px;
`;

const InputContactButton = styled.TouchableOpacity`
  flex-direction: row;
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
  border-width: ${p => (p.isActive ? 0 : 0.5)}px;
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

const ContactIconImageModal = styled.Image`
  height: 24px;
  width: 24px;
  tint-color: #f2a54a;
  margin-bottom: 6px;
`;

const ContactText = styled.Text<{
  isActive: boolean;
}>`
  font-weight: 400;
  font-size: 11px;
  align-self: center;
  padding: 10px;
  color: ${p => (p.isActive ? '#f2a54a' : '#bdbdbd')};
`;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
});
