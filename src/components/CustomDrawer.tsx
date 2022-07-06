import React, {useState} from 'react';
import {Platform} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import {ASSIGNMENT_ICON, AVATAR2, ADD_ICON, DROP_ICON} from '../assets';

import styled, {css} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {CustomerButtonList} from '../screens/CreateContact/components/CustomerButtonList';

const CustomDrawer = props => {
  const [isShow, setShow] = useState(false);

  const showEdit = () => {
    setShow(!isShow);
  };

  return (
    <DrawerContainer>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#F2A54A'}}>
        <BannerContainer>
          <Avatar source={AVATAR2} />
          <ProfileContainer>
            <ProfileUser>Nguyễn Tiến Nam</ProfileUser>
            <ProfileJob>Admin Admin</ProfileJob>
          </ProfileContainer>
        </BannerContainer>

        <NewCollectionContainer>
          <NewCollectionButton onPress={() => {}}>
            <LogIcon source={ADD_ICON} />
            <NewCollectionButtonText>New Collection</NewCollectionButtonText>
          </NewCollectionButton>
        </NewCollectionContainer>

        <CollectionContainer>
          <CollectionButton onPress={showEdit}>
            <DropIcon source={DROP_ICON} />
            <CollectionButtonText>COLLECTIONS</CollectionButtonText>
            <EditButtonText>Edit</EditButtonText>
          </CollectionButton>
          {/*<EditButton onPress={() => {}}>*/}
          {/*  <EditButtonText>Edit</EditButtonText>*/}
          {/*</EditButton>*/}
        </CollectionContainer>

        {isShow && (
          <CustomerItemContainer>
            <CustomerItem label={'All'} />
            <CustomerItem label={'General'} />
            <CustomerItem label={'Investors'} />
            <CustomerItem label={'Lead'} />
            <CustomerItem label={'VIP'} />
          </CustomerItemContainer>
        )}
      </DrawerContentScrollView>
    </DrawerContainer>
  );
};

interface CustomerItemProps {
  label: string;
}
export const CustomerItem = (props: CustomerItemProps) => {
  const {label} = props;

  return (
    <CustomerItemButton onPress={() => {}}>
      <LogIcon source={ASSIGNMENT_ICON} />
      <CustomerItemButtonText>{label}</CustomerItemButtonText>
    </CustomerItemButton>
  );
};

const DrawerContainer = styled.View`
  flex: 1;

  ${Platform.select({
    ios: css`
      margin-top: 0;
    `,
    android: css`
      margin-top: -20;
    `,
  })};
`;

const BannerContainer = styled.View`
  flex-direction: row;
  height: 74px;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
  padding-right: 9px;
`;
const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 45px;
`;

const ProfileContainer = styled.View`
  flex-direction: column;
`;

const ProfileUser = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  margin-left: 9px;
`;

const ProfileJob = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 400;
  margin-right: 5px;
  margin-left: 9px;
`;

const NewCollectionContainer = styled.View`
  padding-left: 20px;
  background-color: #ffffff;
  justify-content: center;
  height: 64px;
`;

const NewCollectionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const NewCollectionButtonText = styled.Text`
  font-size: 15px;
  margin-left: 17px;
  color: black;
`;

const CollectionContainer = styled.View`
  background-color: #ffffff;
  height: 44px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const CollectionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(242, 165, 74, 0.1);
  width: 100%;
  height: 44px;
  padding-left: 20px;
`;

const CollectionButtonText = styled.Text`
  font-size: 13px;
  margin-left: 16px;
  font-weight: 700;
  font-style: normal;
  color: black;
`;

const EditButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: rgba(242, 165, 74, 0.1);
  width: 100px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const EditButtonText = styled.Text`
  position: absolute;
  font-size: 13px;
  margin-left: 5px;
  color: #f2a54a;
  font-weight: 500;
  right: 14px;
`;

const CustomerItemContainer = styled.View`
  padding-left: 20px;
  background-color: #ffffff;
  padding-top: 10px;
`;

const CustomerItemButton = styled.TouchableOpacity`
  padding-bottom: 15px;
  flex-direction: row;
  align-items: center;
  height: 44px;
`;

const CustomerItemButtonText = styled.Text`
  font-size: 15px;
  margin-left: 17px;
  color: black;
`;

const LogIcon = styled.Image`
  height: 20px;
  width: 20px;
`;

const DropIcon = styled.Image`
  height: 5px;
  width: 10px;
`;

export default CustomDrawer;
