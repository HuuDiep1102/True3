import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

import {CAMERA_ICON} from '../../../assets';
import styled from 'styled-components/native';

export function ImagePickerModal({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <Buttons>
        <Button onPress={onImageLibraryPress}>
          <ButtonIcon source={CAMERA_ICON} />

          <ButtonText>Library</ButtonText>
        </Button>
        {/*<Button onPress={onCameraPress}>*/}
        {/*  <ButtonIcon source={CAMERA_ICON} />*/}
        {/*  <ButtonText>Camera</ButtonText>*/}
        {/*</Button>*/}
      </Buttons>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

const ButtonIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin: 10px;
`;
const Buttons = styled.SafeAreaView`
  background-color: white;
  flex-direction: row;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;
const Button = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
`;
