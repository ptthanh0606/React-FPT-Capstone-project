import { atom } from 'recoil';
import LocalStorage from 'utils/localStorage';

export const resetState = {
  id: 0,
  name: '',
  status: 0,
  maxApplications: 0,
};

const semester = atom({
  key: 'semester',
  default: {
    id: Number(LocalStorage.get('semester_id', 0)),
    name: '',
    status: 0,
    maxApplications: 0,
  },
});

export default semester;
