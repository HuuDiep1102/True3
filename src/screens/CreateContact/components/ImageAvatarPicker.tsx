import React from 'react';

import styled from 'styled-components/native';

import {CAMERA_INPUT_ICON, AVATAR_DEFAULT_ICON} from '../../../assets';
import {ImageBackground} from 'react-native';

export function ImagePickerAvatar({uri, onPress}) {
  return (
    <Container>
      <ImageBackground
        style={{
          height: 100,
          width: 100,
          backgroundColor: '#f2f2f2',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{borderRadius: 50}}
        source={{uri}}>
        <AvatarImage source={AVATAR_DEFAULT_ICON} />
        <AddButton onPress={onPress}>
          <AddButtonIcon source={CAMERA_INPUT_ICON} />
        </AddButton>
      </ImageBackground>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

// const Avatar = styled.ImageBackground`
//   height: 100px;
//   width: 100px;
//   background-color: #f2f2f2;
//   border-radius: 50px;
//   justify-content: center;
//   align-items: center;
// `;

const AvatarImage = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 50px;
  z-index: -1;
`;
const AddButton = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  background-color: #f2a54a;
  border-radius: 50px;
  position: absolute;
  right: 1px;
  top: 70px;
  justify-content: center;
  align-items: center;
`;
const AddButtonIcon = styled.Image`
  height: 13px;
  width: 15px;
`;
