import {PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';
import {CustomerInput} from './CustomerInput';

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
  // setEmailValidError: Function;
  // setPhoneNumberValidError: Function;
  autoFocus: boolean;
  label: string;
}

const Cell = (props: CustomerCellProps) => {
  const {
    onRemove,
    index,
    data,
    setParams,
    keyboardType,
    keyName,
    setEmailValidError,
    setPhoneNumberValidError,
    autoFocus,
    label,
  } = props;

  const onValueChange = useCallback((value: string) => {
    // handleValidEmail(value);
    // handleValidPhoneNumber(value);
    setParams(prev => {
      let _arr = [...prev[keyName]];
      _arr[index] = value;
      return {
        ...prev,
        [keyName]: _arr,
      };
    });
  }, []);

  // const handleValidEmail = val => {
  //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //
  //   if (keyName !== 'email') return;
  //
  //   if (!reg.test(val)) {
  //     setEmailValidError('Email nhập không đúng định dạng');
  //   } else if (reg.test(val)) {
  //     setEmailValidError('');
  //   }
  // };
  //
  // const handleValidPhoneNumber = val => {
  //   let reg =
  //     /^((\+)33|0)[1-9](\d{2}){4}$|(^1800\d{4}$)|(^1\d{1|2|3|4|5|6}$)\b/;
  //   if (keyName !== 'phoneNumber') return;
  //
  //   if (!reg.test(val)) {
  //     setPhoneNumberValidError('Số điện thoại không đúng định dạng');
  //   } else if (reg.test(val)) {
  //     setPhoneNumberValidError('');
  //   }
  // };
  return (
    <InputContainerView>
      <InputContainer
        onPress={() => {
          onRemove(index);
        }}>
        <PlusIcon source={REMOVE_ICON} />
      </InputContainer>
      <CustomerInput
        style={{
          width: '93%',
          color: '#2f80ed',
          fontWeight: '400',
          fontSize: 15,
        }}
        placeholder={label}
        value={data[index]}
        onChangeText={onValueChange}
        placeholderTextColor={'#BDBDBD'}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        keyName={keyName}
      />
    </InputContainerView>
  );
};

export const CustomerButtonList = (props: CustomerButtonListProps) => {
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
        const newArray = oldArray.filter((_item, _index) => _index !== index);
        return {...prev, [keyName]: newArray};
      });
    },
    [data],
  );

  const [emailValidError, setEmailValidError] = useState('');
  const [phoneNumberValidError, setPhoneNumberValidError] = useState('');

  return (
    <Container>
      {/*Bao loi Object underfined thi them dau hoi cham*/}
      {data?.map((item, index) => {
        return (
          <Cell
            key={index}
            autoFocus={item === ''}
            onRemove={onRemove}
            index={index}
            data={data}
            setParams={setParams}
            keyName={keyName}
            keyboardType={keyboardType}
            label={label}
            // setEmailValidError={setEmailValidError}
            // setPhoneNumberValidError={setPhoneNumberValidError}
          />
        );
      })}
      <ButtonContactContainer onPress={addNewValue}>
        <PlusIcon source={PLUS_ICON} />
        <ButtonContactText>{label}</ButtonContactText>
      </ButtonContactContainer>
      {/*{phoneNumberValidError ? (*/}
      {/*  <ValidText>{phoneNumberValidError}</ValidText>*/}
      {/*) : null}*/}
      {/*{emailValidError ? <ValidText>{emailValidError}</ValidText> : null}*/}
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
`;

const ValidText = styled.Text`
  font-size: 15px;
  color: red;
  padding-top: 5px;
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
