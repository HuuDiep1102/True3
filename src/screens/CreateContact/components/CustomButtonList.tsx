import {PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import InputField from './InputField';

interface CustomButtonListProps {
  label: string;
}
export const CustomButtonList = (props: CustomButtonListProps) => {
  const {label} = props;
  const [array, setArray] = useState<string[]>([]);
  const [text, onChangeText] = useState('');

  const addNewValue = () => {
    setArray([...array, '1']);
  };

  const onRemove = () => {
    //console.log('oke');`
    // muon xoa can phai biet vi tri can xoa
    setArray(array => array.filter(item => item !== '1'));
    // tao object array voi key la time theo second
  };

  console.log(array);

  return (
    <Container>
      {array.map(item => {
        return (
          // onRemove && onRemove(index)
          <InputContainerView>
            <InputContainer onPress={onRemove}>
              <PlusIcon source={REMOVE_ICON} />
            </InputContainer>
            <InputContact
              value={text}
              placeholder={'Mời nhập'}
              onChangeText={onChangeText}
            />
          </InputContainerView>
        );
      })}
      <ButtonContactContainer onPress={addNewValue}>
        <PlusIcon source={PLUS_ICON} />
        <ButtonContactText>{label}</ButtonContactText>
      </ButtonContactContainer>
    </Container>

    // <Container>
    //   {array.map(item => {
    //     return (
    //       // onRemove && onRemove(index)
    //       <InputField />
    //     );
    //   })}
    //   <ButtonContactContainer onPress={addNewValue}>
    //     <PlusIcon source={PLUS_ICON} />
    //     <ButtonContactText>{label}</ButtonContactText>
    //   </ButtonContactContainer>
    // </Container>
  );
};

const Container = styled.View`
  width: 100%;
  background-color: white;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
`;

const PlusIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const ButtonContactText = styled.Text`
  font-family: Roboto-Regular;
  font-size: 15px;
  font-weight: 400;
  color: #333333;
  padding-left: 42px;
`;

const ButtonContactContainer = styled.TouchableOpacity`
  height: 44px;
  width: 90%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const InputContainer = styled.TouchableOpacity``;

const InputContainerView = styled.View`
  height: 44px;
  width: 90%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
  justify-content: center;
`;

const InputContact = styled.TextInput`
  width: 93%;
  padding-left: 47px;
  color: #2f80ed;
  font-weight: 400;
  font-size: 15px;
  font-family: Roboto-Regular;
`;
