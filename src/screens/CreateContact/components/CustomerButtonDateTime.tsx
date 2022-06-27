import {PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';
import {Text, Button, View, Platform, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface CustomerButtonDateTimeProps {
  label: string;
}

export const CustomerButtonDateTime = (props: CustomerButtonDateTimeProps) => {
  const {label} = props;
  const [array, setArray] = useState<string[]>([]);

  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const onRemove = useCallback(
    (index: number) => {
      const oldArray = [...array];
      setArray(oldArray.filter((_item, _index) => _index !== index));
    },
    [array],
  );

  return (
    <Container>
      <InputContainerView>
        <InputContainer
          onPress={() => {
            onRemove(0);
          }}>
          <PlusIcon source={REMOVE_ICON} />
        </InputContainer>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{`Date:  ${
            selectedDate
              ? moment(selectedDate).format('MM/DD/YYYY')
              : 'Please select date'
          }`}</Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </InputContainerView>

      <ButtonContactContainer onPress={showDatePicker}>
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
  margin-top: 40px;
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 200,
    height: 200,
  },
});
