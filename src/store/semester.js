import { atom } from 'recoil';
import LocalStorage from 'utils/localStorage';

const semester = atom({
  key: 'semester',
  default: {
    id: LocalStorage.get('semester_id', 0),
    name: '',
    status: 0,
  },
});

export default semester;
