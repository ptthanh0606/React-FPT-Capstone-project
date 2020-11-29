import toast from 'utils/toast';

import { sortCaret, headerSortingClasses } from '_metronic/_helpers';

export function handleErrors(err) {
  if (!err.isCancel)
    if (err?.response?.data?.data?.message) {
      toast.error(err.response.data.data.message);
    } else if (err?.response?.data?.errors) {
      for (const i of Object.entries(err.response.data.errors)) {
        for (const j of i[1]) toast.error(j);
      }
    } else {
      toast.error('Internal Server Error');
    }
}

// to-do
export function handleResponse(res) {}

export function columnsTransformer(cols) {
  const newCols = [];

  for (const col of cols) {
    if (col.sort === true) {
      col.sortCaret = col.sortCaret || sortCaret;
      col.headerSortingClasses =
        col.headerSortingClasses || headerSortingClasses;
    }
    newCols.push(col);
  }

  return newCols;
}
