import {PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface CustomerButtonDateTimeProps {
  label: string;
  setParams: (prev: any) => void;
  data: string;
}

export const CustomerButtonDateTime = (props: CustomerButtonDateTimeProps) => {
  const {label, setParams, data} = props;
  const [array, setArray] = useState<string[]>([]);

  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // const addNewValue = useCallback(() => {
  //   setParams(prev => {
  //     let _arr = [...prev[keyName]];
  //     _arr.push('');
  //     return {...prev, [keyName]: _arr};
  //   });
  //
  //   setDatePickerVisibility(true);
  // }, [array]);

  const addNewValue = useCallback(() => {
    setArray([...array, '']);
    setDatePickerVisibility(true);
  }, [array]);

  const updateValue = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = useCallback(date => {
    setSelectedDate(date);
    hideDatePicker();
  }, []);

  useEffect(() => {
    // setParams(prev => {
    //   let _arr = [...prev[birthday]];
    //   _arr.push('');
    //   return {...prev, [birthday]: _arr};
    // });

    setParams(prev => ({
      ...prev,
      birthday: moment(selectedDate).format('DD/MM/YYYY'),
    }));
  }, [moment(selectedDate).format('DD/MM/YYYY'), setParams]);

  const onRemove = useCallback(
    (index: number) => {
      const oldArray = [...array];
      setArray(oldArray.filter((_item, _index) => _index !== index));
    },
    [array],
  );

  //console.log('birthday', data);

  return (
    <Container>
      {array.map((item, index) => {
        return (
          <InputContainerView>
            <InputContainer
              onPress={() => {
                onRemove(0);
              }}>
              <PlusIcon source={REMOVE_ICON} />
            </InputContainer>
            <DateTimeView>
              <DateTimeButton onPress={updateValue}>
                <DateTimeText>{data}</DateTimeText>
              </DateTimeButton>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </DateTimeView>
          </InputContainerView>
        );
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

const DateTimeView = styled.View`
  flex: 1;
  justify-content: center;
`;

const DateTimeButton = styled.TouchableOpacity`
  height: 30px;
  justify-content: center;
`;

const DateTimeText = styled.Text`
  padding-left: 17px;
  color: #2f80ed;
  font-size: 15px;
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
  flex-direction: row;
`;

const DateText = styled.Text`
  font-size: 18px;
  color: black;
`;

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
