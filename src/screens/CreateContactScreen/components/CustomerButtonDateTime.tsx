///CustomerButtonDateTime

import {PLUS_ICON, REMOVE_ICON} from '@/assets';
import React, {useState, useCallback, memo} from 'react';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface CustomerButtonDateTimeProps {
  label: string;
  setParams: (prev: any) => void;
  data: string[];
}

export const CustomerButtonDateTime = memo(
  (props: CustomerButtonDateTimeProps) => {
    const {label, setParams, data} = props;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const onAddNewValue = useCallback(() => {
      setParams(prev => {
        let _data = [...data];
        _data.push('');
        return {...prev, birthday: _data};
      });
      setDatePickerVisibility(true);
    }, []);

    const onUpdateValue = useCallback(() => {
      setDatePickerVisibility(true);
    }, []);

    const hideDatePicker = useCallback(() => {
      setParams(prev => {
        return {
          ...prev,
          birthday: prev.birthday[0] === '' ? [] : prev.birthday,
        };
      });
      setDatePickerVisibility(false);
    }, []);

    const handleConfirm = useCallback((date, index) => {
      setParams(prev => {
        let _data = [...data];

        _data[index] = moment(date).format('DD/MM/YYYY');
        return {...prev, birthday: _data};
      });
      hideDatePicker();
    }, []);

    const onRemove = useCallback(
      (index: number) => {
        setParams(prev => {
          const oldArray = [...data];
          const newArray = oldArray.filter((_contact, _index) => _index !== index);
          return {...prev, birthday: newArray};
        });
      },
      [data],
    );

    const onRemoveItem = useCallback(() => {
      onRemove(0);
    }, []);

    return (
      <Container>
        {data?.map((contact, index) => {
          return (
            <InputContainerView key={index}>
              <InputContainer onPress={onRemoveItem}>
                <PlusIcon source={REMOVE_ICON} />
              </InputContainer>
              <DateTimeView>
                <DateTimeButton onPress={onUpdateValue}>
                  <DateTimeText>{contact}</DateTimeText>
                </DateTimeButton>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={date => {
                    handleConfirm(date, index);
                  }}
                  onCancel={hideDatePicker}
                />
              </DateTimeView>
            </InputContainerView>
          );
        })}
        <ButtonContactContainer onPress={onAddNewValue}>
          <PlusIcon source={PLUS_ICON} />
          <ButtonContactText>{label}</ButtonContactText>
        </ButtonContactContainer>
      </Container>
    );
  },
);

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
