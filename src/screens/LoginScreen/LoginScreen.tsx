/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {memo} from 'react';
import styled from 'styled-components/native';
import {IC_BANNER_LOGO, LOADING_LOGO, LOGO} from '../../assets';
import {useNavigation} from '@react-navigation/native';

export const LoginScreen = memo(() => {
  const navigation = useNavigation<any>();

  return (
    <Container>
      <Section1>
        <Logo source={LOGO} />
        <BannerImage resizeMode={'contain'} source={IC_BANNER_LOGO} />
      </Section1>
      <Section2>
        <TextTitle>Base contact</TextTitle>
        <SubTitle>
          {
            'Giải pháp quản lý công việc \n & dự án toàn diện cho doanh nghiệp 4.0'
          }
        </SubTitle>
        <LoadingIcon source={LOADING_LOGO} />
      </Section2>
      <Section3>
        <WarningText>Bạn chưa đăng nhập</WarningText>
        <WrapButton>
          <BtnLogin onPress={() => navigation.navigate('MainNavigation')}>
            <BtnLoginText>ĐĂNG NHẬP BẰNG BASE ACCOUNT</BtnLoginText>
          </BtnLogin>
          <BtnRegister>
            <BtnRegisterText>ĐĂNG NHẬP THỦ CÔNG</BtnRegisterText>
          </BtnRegister>
        </WrapButton>
      </Section3>
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
  margin-bottom: 40px;
`;

const Section1 = styled.View`
  flex: 2;
  justify-content: flex-end;
  align-items: center;
`;

const BannerImage = styled.Image`
  position: absolute;
  height: 238px;
  width: 375px;
  opacity: 0.5;
  z-index: -1;
`;

const Logo = styled.Image`
  margin-bottom: 60px;
  height: 200px;
  width: 200px;
`;

const Section2 = styled.View`
  flex: 2;
  align-items: center;
  margin-bottom: 10px;
`;

const TextTitle = styled.Text`
  color: #f2a54a;
  font-weight: 700;
  font-size: 30px;
  height: 45px;
  align-self: center;
`;

const SubTitle = styled.Text`
  color: #333333;
  font-weight: 400;
  font-size: 15px;
  text-align: center;
`;
const LoadingIcon = styled.Image`
  height: 32px;
  width: 32px;
  margin-top: 78px;
`;

const Section3 = styled.View`
  flex: 1;
  margin-top: -60px;
`;

const WarningText = styled.Text`
  padding-bottom: 20px;
  color: #828282;
  font-weight: 400;
  font-size: 15px;
  text-align: center;
  font-style: italic;
`;

const WrapButton = styled.View`
  height: 120px;
  margin-right: 37px;
  margin-left: 37px;
  justify-content: space-evenly;
`;

const BtnLogin = styled.TouchableOpacity`
  background-color: #f2a54a;
  height: 48px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BtnLoginText = styled.Text`
  color: #ffffff;
  font-weight: 500;
  font-size: 15px;
`;

const BtnRegister = styled(BtnLogin)`
  background-color: #ffffff;
  border-color: #f2a54a;
  border-width: 1px;
`;

const BtnRegisterText = styled(BtnLoginText)`
  color: #f2a54a;
  font-weight: 400;
`;
