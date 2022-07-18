import {PLUS_ICON, REMOVE_ICON} from '@/assets';
import React, {useState, useCallback, memo} from 'react';
import styled from 'styled-components/native';
import {CustomerInput} from './CustomerInput';
import {StyleSheet} from 'react-native';

interface CustomerButtonListProps {
  label: string;
  setParams: (prev: any) => void;
  data: string[];
  keyName: string;
  keyboardType;
}

interface CustomerCellProps {
  onRemove: (index: number) => void;
  index: number;
  data: string[];
  setParams: (prev: any) => void;
  keyboardType;
  keyName: string;
  autoFocus: boolean;
  label: string;
}

const Cell = memo((props: CustomerCellProps) => {
  const {
    onRemove,
    index,
    data,
    setParams,
    keyboardType,
    keyName,
    autoFocus,
    label,
  } = props;

  const onValueChange = useCallback((keyName: string, value: string) => {
    setParams(prev => {
      let _arr = [...prev[keyName]];
      _arr[index] = value;
      return {
        ...prev,
        [keyName]: _arr,
      };
    });
  }, []);

  const onRemoveItem = useCallback(() => {
    onRemove(index);
  }, [onRemove]);

  return (
    <InputContainerView>
      <InputContainer onPress={onRemoveItem}>
        <PlusIcon source={REMOVE_ICON} />
      </InputContainer>
      <CustomerInput
        style={styles.customInput}
        placeholder={label}
        value={data[index]}
        onValueChange={onValueChange}
        placeholderTextColor={'#BDBDBD'}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        keyName={keyName}
      />
    </InputContainerView>
  );
});

export const CustomerButtonList = memo((props: CustomerButtonListProps) => {
  const {label, setParams, data, keyName, keyboardType} = props;
  const [array, setArray] = useState<string[]>([]);

  const addNewValue = useCallback(() => {
    setParams(prev => {
      let _arr = [...prev[keyName]];
      _arr.push('');
      return {...prev, [keyName]: _arr};
    });
  }, [array]);

  const onRemove = useCallback(
    (index: number) => {
      setParams(prev => {
        const oldArray = [...data];
        const newArray = oldArray.filter(
          (_contact, _index) => _index !== index,
        );
        return {...prev, [keyName]: newArray};
      });
    },
    [data],
  );

  return (
    <Container>
      {/*Bao loi Object underfined thi them dau hoi cham*/}
      {data?.map((contact, index) => {
        return (
          <Cell
            key={index}
            autoFocus={contact === ''}
            onRemove={onRemove}
            index={index}
            data={data}
            setParams={setParams}
            keyName={keyName}
            keyboardType={keyboardType}
            label={label}
          />
        );
      })}
      <ButtonContactContainer onPress={addNewValue}>
        <PlusIcon source={PLUS_ICON} />
        <ButtonContactText>{label}</ButtonContactText>
      </ButtonContactContainer>
    </Container>
  );
});

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

const InputContainer = styled.TouchableOpacity`
  width: 50px;
  height: 40px;
  margin-left: -10px;
  padding-left: 10px;
  justify-content: center;
`;

const InputContainerView = styled.View`
  height: 44px;
  width: 90%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const styles = StyleSheet.create({
  customInput: {
    width: '93%',
    color: '#2f80ed',
    fontWeight: '400',
    fontSize: 15,
  },
});
