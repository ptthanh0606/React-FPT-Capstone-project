import { atom, selector } from 'recoil';

const meta = atom({
  key: 'meta',
  default: {
    title: 'Untitled',
    description: '',
    breadcrumb: [],
    toolbar: null,
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

export const description = selector({
  key: 'description',
  get: ({ get }) => get(meta).description,
  set: ({ set }, newValue) =>
    set(meta, state => ({
      ...state,
      description: newValue,
    })),
});

export const breadcrumb = selector({
  key: 'breadcrumb',
  get: ({ get }) => get(meta).breadcrumb,
  set: ({ set }, newValue) =>
    set(meta, state => ({
      ...state,
      breadcrumb: newValue,
    })),
});

export const toolbar = selector({
  key: 'toolbar',
  get: ({ get }) => get(meta).toolbar,
  set: ({ set }, newValue) =>
    set(meta, state => ({
      ...state,
      toolbar: newValue,
    })),
});

export default meta;
