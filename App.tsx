import React from 'react';

import {RootNavigation} from './src/navigation/RootNavigation';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';;

import {store, persistor} from './src/redux/persist';
// console.disableYellowBox = true;
//tat warning

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          translucent={true}
          //Bo header trong phien ban Android
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />

        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}

// export default function App() {
//   return (
//     <Provider store={store}>
//       <>
//         <StatusBar
//           translucent={true}
//           //Bo header trong phien ban Android
//           backgroundColor={'transparent'}
//           barStyle={'dark-content'}
//         />
//         <RootNavigation />
//       </>
//     </Provider>
//   );
// }
