import { selector } from 'recoil';
import atom from '..';

const role = selector({
  key: 'role',
  get: ({ get }) => get(atom).role,
  set: ({ set }, newValue) =>
    set(atom, state => ({ ...state, role: newValue })),
});

export default role;
