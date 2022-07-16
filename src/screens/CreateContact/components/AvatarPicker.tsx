import React, {useState, useCallback, useEffect, memo} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerAvatar} from './ImageAvatarPicker';
import styled from 'styled-components/native';
import {ImagePickerResponse} from 'react-native-image-picker';

interface AvatarPickerProps {
  setParams;
  imageUri: string;
}

export const AvatarPicker = memo((props: AvatarPickerProps) => {
  const {setParams, imageUri} = props;
  const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse>();

  const onImageLibraryPress = useCallback(async () => {
    const options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    await ImagePicker.launchImageLibrary(options, response =>
      setPickerResponse(response),
    );
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
      <ImagePickerAvatar
        uri={uri ? uri : imageUri}
        onPress={onImageLibraryPress}
      />
    </Screen>
  );
});

const Screen = styled.View`
  background-color: #f2f2fc;
  width: 100%;
  height: 124px;
`;
