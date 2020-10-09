import { selector } from 'recoil';
import atom from '../';

const isAuthenticated = selector({
  key: 'isAuthenticated',
  get: ({ get }) => get(atom).isAuthenticated,
  set: ({ set }, newValue) =>
    set(atom, state => ({ ...state, isAuthenticated: newValue })),
});

export default isAuthenticated;
