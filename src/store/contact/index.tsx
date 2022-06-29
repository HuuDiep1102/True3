import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {ContactList} from './types';
import {useSelector} from 'react-redux';

const initContact: ContactList[] = [];

const contactSlice = createSlice({
  // dinh nghia 1 cai reducer su dung createSlide
  name: 'contact',
  initialState: initContact,
  reducers: {
    addContact: (state, action: PayloadAction<ContactList>) => {
      state.push(action.payload);
    },
    updateContact: (state, payload: PayloadAction<ContactList>) => {
      const _arr = [...state];
      const _index = _arr.findIndex(item => item.id === payload.payload.id);
      if (_index > -1) {
        _arr[_index] = payload.payload;
        return _arr;
      }
      return [...state, payload.payload];
    },
    deleteContact: (state, payload: PayloadAction<ContactList>) => {
      return state;
    },
  },
});

export const {updateContact, deleteContact} = contactSlice.actions; // goi ra cac action cua contactReducer

export const store = configureStore({
  // khoi tao reducer
  reducer: {
    contactReducer: contactSlice.reducer,
  },
});

export const useContacts = () => {
  // connect vao store de lay ra danh sach todo
  return useSelector(state => state.contactReducer);
};

export const updateContactAction = (val: ContactList) => {
  // dispatch vao action update cua todoReducer
  return store.dispatch(updateContact(val));
};

export const removeContactAction = (val: ContactList) => {
  // dispatch vao action update cua todoReducer
  return store.dispatch(deleteContact(val));
};
