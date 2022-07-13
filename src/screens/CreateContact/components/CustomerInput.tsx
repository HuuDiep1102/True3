// import * as React from 'react';
// //import {TextInput, TextInputProps} from 'react-native';
// import styled from 'styled-components/native';
// import {useCallback} from 'react';
// import {TextInputProps, TextInput} from 'react-native';
//
// interface CustomInputProps extends TextInputProps {
//   keyName: string;
//   onValueChange: (keyName: string, value: string) => void;
//   autoFocus: boolean;
// }
//
// export const CustomerInput = React.memo((props: CustomInputProps) => {
//   //keyName de phan biet cac truong
//   const {keyName, onValueChange, autoFocus, ...remainingProps} = props;
//
//   const onChangeText = (value: string) => {
//     onValueChange(keyName, value);
//   };
//
//   return (
//     <TextInput
//       onChangeText={onChangeText}
//       autoFocus={autoFocus}
//       {...remainingProps}
//     />
//   );
// });
//
// const TextInput = styled.TextInput`
//   color: black;
//   padding-left: 0;
// `;

import * as React from 'react';
import {TextInput, TextInputProps} from 'react-native';

interface CustomInputProps extends TextInputProps {
  keyName: string;
  onValueChange: (keyName: string, value: string) => void;
}

export const CustomerInput = React.memo((props: CustomInputProps) => {
  const {keyName, onValueChange, ...remainingProps} = props;

  const onChangeText = (value: string) => {
    onValueChange(keyName, value);
  };

  return (
    <TextInput
      style={{
        width: '100%',
        height: 44,
        color: '#111',
      }}
      onChangeText={onChangeText}
      {...remainingProps}
    />
  );
});
