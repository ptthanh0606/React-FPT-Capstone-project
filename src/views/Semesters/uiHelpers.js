export const CustomerStatusCssClasses = ['danger', 'success', 'info', ''];
export const CustomerStatusTitles = [
  'Finished',
  'In progress',
  'Preparing',
  '',
];
export const CustomerTypeCssClasses = ['success', 'primary', ''];
export const CustomerTypeTitles = ['Business', 'Individual', ''];
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
];
export const initialFilter = {
  filter: {
    lastName: '',
    firstName: '',
    email: '',
    ipAddress: '',
  },
  sortOrder: 'asc', // asc || desc
  sortField: 'id',
  pageNumber: 1,
  pageSize: 10,
};
