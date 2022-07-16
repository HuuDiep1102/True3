import React, {memo} from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HistoryScreen} from '../screens/HistoryScreen';
import {ContactScreen} from '../screens/ContactScreen/ContactScreen';
import {
  PHONEBOOK_ACTIVE_ICON,
  PHONEBOOK_INACTIVE_ICON,
  WATCH_ACTIVE_ICON,
  WATCH_INACTIVE_ICON,
} from '../assets';
import styled from 'styled-components/native';

const Tab = createBottomTabNavigator();

export const TabNavigation = memo(() => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Danh bạ') {
            iconName = focused
              ? PHONEBOOK_ACTIVE_ICON
              : PHONEBOOK_INACTIVE_ICON;
          } else if (route.name === 'Gần đây') {
            iconName = focused ? WATCH_ACTIVE_ICON : WATCH_INACTIVE_ICON;
          }

          return <Icon source={iconName} />;
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#FFDAAE',
        tabBarStyle: {
          backgroundColor: '#F2A54A',
          height: Platform.OS === 'ios' ? 80 : 60,
        },
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Danh bạ" component={ContactScreen} />
      <Tab.Screen name="Gần đây" component={HistoryScreen} />
    </Tab.Navigator>
  );
});

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;
