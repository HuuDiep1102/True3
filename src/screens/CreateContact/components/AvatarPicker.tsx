import React, {useState, useCallback} from 'react';
import * as ImagePicker from 'react-native-image-picker';

import {ImagePickerModal} from './ImagePickerModal';
import {ImagePickerAvatar} from './ImageAvatarPicker';
import styled from 'styled-components/native';

export const AvatarPicker = () => {
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <Screen>
      <ImagePickerAvatar uri={uri} onPress={() => setVisible(true)} />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
    </Screen>
  );
};

const Screen = styled.View`
  background-color: #f2f2fc;
  width: 100%;
  height: 150px;
`;
