import { atom, selector } from 'recoil';

const meta = atom({
  key: 'meta',
  default: {
    title: 'Untitled',
    description: '',
    breadcrumb: [],
  },
});

export const title = selector({
  key: 'title',
  get: ({ get }) =>
    get(meta).title + ' | Capstone Management System for FPT University',
  set: ({ set }, newValue) =>
    set(meta, state => ({
      ...state,
      title: newValue,
    })),
});

export const breadcrumb = selector({
  key: 'breadcrumb',
  get: ({ get }) => get(meta).breadcrumb,
  set: ({ set }, newValue) =>
    set(meta, state => ({
      ...state,
      breadcrumb: breadcrumb,
    })),
});

export default meta;
