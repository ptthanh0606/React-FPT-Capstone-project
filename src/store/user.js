import { atom } from 'recoil';

const user = atom({
  key: 'user',
  default: {
    id: 0,
    email: '',
    name: '',
    department: [],
  },
});

export default user;
