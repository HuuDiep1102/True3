import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen} from '@/screens/LoginScreen/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigation} from './TabNavigation';
import {CreateContactScreen} from '@/screens/CreateContactScreen/CreateContactScreen';
import {ContactDetailScreen} from '@/screens/ContactDetailScreen/ContactDetailScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import CustomDrawer from '../components/CustomDrawer';

const Roots = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = memo(() => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="TabNavigation"
      screenOptions={{headerShown: false, drawerType: 'front'}}>
      <Drawer.Screen name="TabNavigation" component={TabNavigation} />
    </Drawer.Navigator>
  );
});

const MainNavigation = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Draw" component={DrawerNavigation} />
      <Stack.Screen
        name="ContactDetailScreen"
        component={ContactDetailScreen}
      />
      <Stack.Screen
        name="CreateContactScreen"
        component={CreateContactScreen}
      />
    </Stack.Navigator>
  );
});

export const RootNavigation = memo(() => {
  return (
    <NavigationContainer>
      <Roots.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{headerShown: false}}>
        <Roots.Screen name="LoginScreen" component={LoginScreen} />
        <Roots.Screen name="MainNavigation" component={MainNavigation} />
      </Roots.Navigator>
    </NavigationContainer>
  );
});
