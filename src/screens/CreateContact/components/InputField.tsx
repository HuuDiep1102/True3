import {REMOVE_ICON} from '../../../assets';
import React, {useState} from 'react';
import styled from 'styled-components/native';

// interface InputFieldProps {
//   label1: string;
// }

const onRemove = () => {
  //console.log('oke');`
  // muon xoa can phai biet vi tri can xoa
  setArray(array => array.filter(item => item !== '1'));
  // tao object array voi key la time theo second
};

const InputField = () => {
  const [text, onChangeText] = useState('');

  const [array, setArray] = useState<string[]>([]);

  return (
    <Container>
      <InputContainer onPress={onRemove}>
        <PlusIcon source={REMOVE_ICON} />
      </InputContainer>
      <InputContact
        value={text}
        placeholder={'Mời nhập'}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

const Container = styled.View``;

const PlusIcon = styled.Image`
  position: absolute;
  height: 24px;
  width: 24px;
`;

const InputContainer = styled.TouchableOpacity`
  height: 44px;
  width: 90%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const InputContact = styled.TextInput`
  width: 100%;
  padding-left: 57px;
  color: #2f80ed;
  font-weight: 400;
  font-size: 15px;
  font-family: Roboto-Regular;
`;

export default InputField;
