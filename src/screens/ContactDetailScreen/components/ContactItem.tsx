import {PHONE_ICON, PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';
import {CustomerInput} from './CustomerInput';
import {Linking} from 'react-native';

interface ContactItemProps {
  label: string;
  keyName: string;
}

export const ContactItem = (props: ContactItemProps) => {
  const {label, keyName} = props;

  return (
    <ContactItem>
      <ContactIconPhone
        onPress={() => {
          Linking.openURL(`tel:${item.phoneNumber}`);
        }}
        isActive={isActive}>
        <ContactIcon source={PHONE_ICON} />
      </ContactIconPhone>
      <ContactActiveText>{label}</ContactActiveText>
    </ContactItem>
  );
};

const ContactItem = styled.View`
  justify-content: center;
  align-items: center;
`;
const ContactIconPhone = styled.TouchableOpacity<{
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

const ContactIconActive = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 0.5px;
  border-color: #bdbdbd;
  justify-content: center;
  align-items: center;
  background-color: #f2a54a;
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
  tint-color: gray;
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
