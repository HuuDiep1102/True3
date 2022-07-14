import 'react-redux';
//Raw Contact nay la mot phan  tu contact
// Model phai khop vs ben tao moi
// value thay cho lastname
export interface RawContact {
  id: string;
  value: string; // Điệp
  avatar: string;
  firstName: string; // Hữu
  normalizerForSearch?: string; // firstName + value + slugify(firstName) + slugify(value)  Hữu Điệp huu diep
  company: string;
  phoneNumber: string[];
  email: string[];
  address: string[];
  birthday: string[];
}
