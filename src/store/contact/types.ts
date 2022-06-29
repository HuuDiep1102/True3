import 'react-redux';
import {StateType} from 'typesafe-actions';

export interface ContactList {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  email: string;
  address: string;
  birthday: string;
}
