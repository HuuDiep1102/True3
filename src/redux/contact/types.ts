import 'react-redux';
import {StateType} from 'typesafe-actions';
//Raw Contact nay la mot phan  tu contact
// Model phai khop vs ben tao moi
export interface RawContact {
  id: string;
  value:string;
  avatar: string;
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  email: string;
  address: string;
  birthday: string;
}
