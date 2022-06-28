import {PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';

interface CustomerButtonListProps {
  label: string;
}

const Cell = ({onRemove, index}: {onRemove: Function; index: number}) => {
  const [inputText, setInputText] = useState('');

  const onChangeValue = useCallback(
    (value: string) => {
      setInputText(value);
    },
    [inputText],
  );

  return (
    <InputContainerView>
      <InputContainer
        onPress={() => {
          onRemove(index);
        }}>
        <PlusIcon source={REMOVE_ICON} />
      </InputContainer>
      <InputContact
        value={inputText}
        placeholder={'Mời nhập'}
        onChangeText={onChangeValue}
        autoFocus={true}
      />
    </InputContainerView>
  );
};

export const CustomerButtonList = (props: CustomerButtonListProps) => {
  const {label} = props;
  const [array, setArray] = useState<string[]>([]);

  const addNewValue = useCallback(() => {
    setArray([...array, '']);
  }, [array]);

  const onRemove = useCallback(
    (index: number) => {
      const oldArray = [...array];
      setArray(oldArray.filter((_item, _index) => _index !== index));
    },
    [array],
  );

  return (
    <Container>
      {array.map((item, index) => {
        return <Cell key={index} onRemove={onRemove} index={index} />;
      })}
      <ButtonContactContainer onPress={addNewValue}>
        <PlusIcon source={PLUS_ICON} />
        <ButtonContactText>{label}</ButtonContactText>
      </ButtonContactContainer>
    </Container>
  );
};

const Container = styled.View`
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
  padding-left: 17px;
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
`;

const InputContact = styled.TextInput`
  width: 93%;
  padding-left: 17px;
  color: #2f80ed;
  font-weight: 400;
  font-size: 15px;
  font-family: Roboto-Regular;
`;
