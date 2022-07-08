import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {RawContact} from './types';
import {useSelector} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Tao ra mot mang rong voi kieu phan tu la RawContact
const initContact: RawContact[] = [];

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

const contactReducer = createSlice({
  // dinh nghia 1 cai reducer su dung createSlide
  name: 'contactReducer',
  initialState: initContact,
  reducers: {
    // Reducer update nay cung la reducer add luon, payload.payload la goi payload lan dau roif vao PayloadAction
    updateContact: (state, payload: PayloadAction<RawContact>) => {
      const _arr = [...state];
      const _index = _arr.findIndex(item => item.id === payload.payload.id);
      if (_index > -1) {
        _arr[_index] = payload.payload;
        return _arr;
      }
      //Neu ko tim thay index thi se tien hanh tao mot phan tu moi
      return [...state, payload.payload];
    },
    removeContact: (state, payload: PayloadAction<RawContact>) => {
      //Delete chua hoan thien
      const oldState = [...state];
      const newState = oldState.filter(item => item.id !== payload.payload.id);
      return newState;
    },
  },
});

/////

// const persistedReducer = persistReducer(persistConfig, contactReducer.reducer);

/////

export const {updateContact, removeContact} = contactReducer.actions; // goi ra cac action cua contactReducer

export const store = configureStore({
  //khoi tao reducer
  reducer: {
    contactReducer: contactReducer.reducer,
  },

  //reducer: persistedReducer,
});

export const useContacts = () => {
  // connect vao store de lay ra danh sac
  return useSelector((state: any) => state.contactReducer);
};

export const updateContactAction = (val: RawContact) => {
  // dispatch vao action update cua contactReduce
  return store.dispatch(updateContact(val));
};

export const removeContactAction = (val: RawContact) => {
  // dispatch vao action update cua contactReducer
  return store.dispatch(removeContact(val));
};
