import {combineReducers} from '@reduxjs/toolkit';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {contactReducer} from './contact/contactStore';

const reducers = combineReducers({
  contacts: contactReducer.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
