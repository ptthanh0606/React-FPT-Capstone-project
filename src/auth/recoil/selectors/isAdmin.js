import { selector } from 'recoil';
import atom from '../';

const isAdmin = selector({
  key: 'isAdmin',
  get: ({ get }) => get(atom).isAdmin,
  set: ({ set }, newValue) =>
    set(atom, state => ({ ...state, isAdmin: newValue })),
});

export default isAdmin;
