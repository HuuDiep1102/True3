import React from 'react';

import {RootNavigation} from './src/navigation/RootNavigation';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'white'}
        barStyle={'dark-content'}
      />
      <RootNavigation />
    </>
  );
}
