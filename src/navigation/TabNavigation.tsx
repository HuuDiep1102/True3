import React, {memo} from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HistoryScreen} from '@/screens/HistoryScreen';
import {ContactScreen} from '@/screens/ContactScreen/ContactScreen';
import {PHONEBOOK_ICON, WATCH_ICON} from '@/assets';
import styled from 'styled-components/native';

const Tab = createBottomTabNavigator();

export const TabNavigation = memo(() => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Danh bạ') {
            iconName = PHONEBOOK_ICON;
          } else if (route.name === 'Gần đây') {
            iconName = WATCH_ICON;
          }

          return (
            <Icon
              source={iconName}
              tintColor={focused ? '#ffffff' : '#FFDAAE'}
            />
          );
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

const Icon = styled.Image<{tintColor: string}>`
  width: 24px;
  height: 24px;
  tint-color: ${p => p.tintColor};
`;
