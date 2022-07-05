import React from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native';

interface ContactItemProps {
  label1: string;
  label2: string;
  icon: any;
  active: boolean;
}

export const ContactItem = (props: ContactItemProps) => {
  const {label1, label2, icon, active} = props;

  return (
    <ContactItemContainer>
      <ContactIcon
        onPress={() => {
          Linking.openURL(label1);
        }}
        isActive={active}
        disabled={!active}>
        <ContactIconImage isActive={active} source={icon} />
      </ContactIcon>
      <ContactText isActive={active}>{label2}</ContactText>
    </ContactItemContainer>
  );
};

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
