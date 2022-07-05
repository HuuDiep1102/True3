import * as React from 'react';
//import {TextInput, TextInputProps} from 'react-native';
import styled from 'styled-components/native';

interface CustomInputProps extends TextInputProps {
  keyName: string;
  onValueChange: (keyName: string, value: string[]) => void;
}

export const CustomerInput = React.memo((props: CustomInputProps) => {
  //keyName de phan biet cac truong
  const {keyName, onValueChange, ...remainingProps} = props;

  const onChangeText = (value: string[]) => {
    onValueChange(keyName, value);
  };

  return <TextInput onChangeText={onChangeText} {...remainingProps} />;
});

const TextInput = styled.TextInput`
  color: black;
`;
