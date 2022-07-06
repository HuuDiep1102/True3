import React, {useState, useCallback, useEffect} from 'react';
import * as ImagePicker from 'react-native-image-picker';

import {ImagePickerModal} from './ImagePickerModal';
import {ImagePickerAvatar} from './ImageAvatarPicker';
import styled from 'styled-components/native';

interface AvatarPickerProps {
  setParams;
}

export const AvatarPicker = (props: AvatarPickerProps) => {
  const {setParams} = props;
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

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  let uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  useEffect(() => {
    setParams(state => ({
      ...state,
      avatar: uri,
    }));
  }, [uri, setParams]);

  return (
    <Screen>
      <ImagePickerAvatar uri={uri} onPress={onImageLibraryPress} />
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
