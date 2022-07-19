import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit';
import {RawContact} from './types';
import {useSelector} from 'react-redux';
import {store} from '../persist';
import {MESSAGE_ICON} from '@/assets';

// Tao ra mot mang rong voi kieu phan tu la RawContact
const initContact = {
  byId: {
    19282828282: {
      id: '19282828282',
      avatar: '',
      phoneNumber: ['0931924433', '093838383'],
      value: 'Nguyễn Tiến',
      firstName: 'Nam',
      company: 'Base',
      birthday: ['11/2/22'],
      email: ['email@gmal.com', 'email2@gmail.com'],
      address: ['So 2 ngo 198'],
    },
  },

  query: {
    all: ['19282828282'],
  },
};
export const contactReducer = createSlice({
  // dinh nghia 1 cai reducer su dung createSlide
  name: 'contactReducer',
  initialState: initContact,
  reducers: {
    // Reducer update nay cung la reducer add luon, payload.payload la goi payload lan dau roif vao PayloadAction

    updateContact: (state, payload: PayloadAction<RawContact>) => {
      const _byId = {
        ...state.byId,
        [payload.payload.id]: payload.payload,
      };

      return {
        ...state,
        byId: _byId,
        query: {
          all: [...new Set(Object.keys(_byId))],
        },
      };
    },

    // updateContact: (state, payload: PayloadAction<RawContact>) => {
    //   const _arr = [...state];
    //   const _index = _arr.findIndex(item => item.id === payload.payload.id);
    //   if (_index > -1) {
    //     _arr[_index] = payload.payload;
    //     return _arr;
    //   }
    //   //Neu ko tim thay index thi se tien hanh tao mot phan tu moi
    //   return [...state, payload.payload];
    // },

    removeContact: (state, payload: PayloadAction<string>) => {
      //Delete chua hoan thien
      const _all = [...state.query.all];
      const _byId = {...state.byId};
      const removedQuery = _all.filter(id => payload.payload !== id);
      if (payload.payload) {
        // @ts-ignore
        delete _byId[payload.payload];
      }

      return {
        ...state,
        byId: _byId,
        query: {
          ...state.query,
          all: removedQuery,
        },
      };
    },

    // removeContact: (state, payload: PayloadAction<RawContact>) => {
    //   //Delete chua hoan thien
    //   const oldState = [...state];
    //   const newState = oldState.filter(item => item.id !== payload.payload.id);
    //   return newState;
    // },
  },
});

export const {updateContact, removeContact} = contactReducer.actions; // goi ra cac action cua contactReducer

let _store: Store | undefined;

// export const useContacts = (val: string) => {
//   // connect vao store de lay ra danh sac
//   return useSelector((state: any) =>
//     state.contacts.query.all.map((key: string) => ({
//       key,
//       value: state.contacts.byId[key].value,
//     })),
//   );
// };
export const setStore = (store: Store) => {
  //Gan store de truyen xuong duoi
  _store = store;
};

export const useContactIdList = (value?: string) => {
  return useSelector((state: any) =>
    state.contacts.query.all.map((key: string) => ({
      normalizerForSearch: state.contacts.byId[key].normalizerForSearch,
      key,
      value: state.contacts.byId[key].value,
    })),
  );
};

export const useContactById = (id: string) => {
  return useSelector((state: any) => state.contacts.byId[id]);
};

export const updateContactAction = (val: RawContact, id: string) => {
  // dispatch vao action update cua todoReducer
  const newValue = {
    ...val,
    key: id,
  };
  return _store && _store.dispatch(updateContact(newValue));
};

export const removeContactAction = (id: string) => {
  // dispatch vao action update cua todoReducer
  return _store && _store.dispatch(removeContact(id));
};

// export const useContacts = () => {
//   // connect vao store de lay ra danh sac
//   return useSelector((state: any) => state.contacts);
// };
//
// export const updateContactAction = (val: RawContact) => {
//   // dispatch vao action update cua contactReduce
//   return store.dispatch(updateContact(val));
// };
//
// export const removeContactAction = (val: RawContact) => {
//   // dispatch vao action update cua contactReducer
//   return store.dispatch(removeContact(val));
// };
