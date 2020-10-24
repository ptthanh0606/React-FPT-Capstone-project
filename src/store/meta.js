import { atom, selector } from 'recoil';

const meta = atom({
  key: 'meta',
  default: {
    title: 'Untitled | Capstone Management System for FPT University',
  },
});

export const title = selector({
  key: 'title',
  get: ({ get }) => get(meta).title,
  set: ({ set }, newValue) =>
    set(meta, state => ({
      ...state,
      title: newValue + ' | Capstone Management System for FPT University',
    })),
});

export default meta;
