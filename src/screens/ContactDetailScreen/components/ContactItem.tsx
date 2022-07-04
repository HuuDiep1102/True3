import {PHONE_ICON, PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native';

interface ContactItemProps {
  label1: string;
  label2: string;
  keyName: string;
  active: boolean;
}

export const ContactItem = (props: ContactItemProps) => {
  const {label1, label2, keyName, active} = props;

  return (
    <ContactItem>
      <ContactIcon
        onPress={() => {
          Linking.openURL(`tel:${label1}`);
        }}
        isActive={active}>
        <ContactIconImage source={PHONE_ICON} />
      </ContactIcon>
      <ContactText>{label2}</ContactText>
    </ContactItem>
  );
};

const ContactItem = styled.View`
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

// const ContactIconActive = styled.TouchableOpacity`
//   height: 40px;
//   width: 40px;
//   border-radius: 20px;
//   border-width: 0.5px;
//   border-color: #bdbdbd;
//   justify-content: center;
//   align-items: center;
//   background-color: #f2a54a;
// `;

// const ContactIconInactive = styled.TouchableOpacity`
//   height: 40px;
//   width: 40px;
//   border-radius: 20px;
//   border-width: 0.5px;
//   border-color: #bdbdbd;
//   background-color: #ffffff;
//   justify-content: center;
//   align-items: center;
// `;

const ContactIconImage = styled.Image<{
  isActive: boolean;
}>`
  height: 24px;
  width: 24px;
  //tint-color: gray;
  tint-color: ${p => (p.isActive ? '#f2a54a' : '#ffffff')};
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

// const ContactInactiveText = styled.Text`
//   font-weight: 400;
//   font-size: 11px;
//   align-self: center;
//   padding: 10px;
//   color: #bdbdbd;
// `;
