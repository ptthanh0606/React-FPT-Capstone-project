import { atom } from 'recoil';

const semester = atom({
  key: 'semester',
  default: {
    id: 0,
    name: '',
    status: 0,
  },
});

export default semester;
