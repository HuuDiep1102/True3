import 'react-redux';
//Raw Contact nay la mot phan  tu contact
// Model phai khop vs ben tao moi
// value thay cho lastname
export interface RawContact {
  key?: string;
  id: string;
  avatar: string;
  value: string; // Điệp
  firstName: string; // Hữu
  normalizerForSearch?: string; // firstName + value + slugify(firstName) + slugify(value)  Hữu Điệp huu diep
  company: string;
  phoneNumber: string[];
  email: string[];
  address: string[];
  birthday: string[];
}

export interface ContactDetailScreenProps {
  id?: string;
}

export interface CreateContactScreenProps extends ContactDetailScreenProps {
  item?: RawContact;
}

export interface ContactIdListProps {
  normalizerForSearch: string;
  key: string;
  value: string;
}
