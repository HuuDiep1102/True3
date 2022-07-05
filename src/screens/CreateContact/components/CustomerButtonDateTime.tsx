import {PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface CustomerButtonDateTimeProps {
  label: string;
  setParams;
}

export const CustomerButtonDateTime = (props: CustomerButtonDateTimeProps) => {
  const {label, setParams} = props;
  const [array, setArray] = useState<string[]>([]);

  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const addNewValue = useCallback(() => {
    setArray([...array, '']);
    setDatePickerVisibility(true);
  }, [array]);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = useCallback(date => {
    setSelectedDate(date);
    hideDatePicker();
  }, []);

  useEffect(() => {
    setParams(state => ({
      ...state,
      avatar: moment(selectedDate).format('DD/MM/YYYY'),
    }));
  }, [moment(selectedDate).format('DD/MM/YYYY'), setParams]);

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
        return (
          <InputContainerView>
            <InputContainer
              onPress={() => {
                onRemove(0);
              }}>
              <PlusIcon source={REMOVE_ICON} />
            </InputContainer>
            <DateTimeView>
              <DateTimeText>{`${
                selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : ''
              }`}</DateTimeText>
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
