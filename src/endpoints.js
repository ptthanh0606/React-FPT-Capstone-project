import config from 'config';
import { METHOD } from 'utils/request/constants';

export const LOGIN = {
  url: config.api + 'authentication',
  method: METHOD.POST,
};

export const ME = {
  url: config.api + 'authentication/me',
  method: METHOD.GET,
};

//------------------------------------------------------------------------------

export const LIST_DEPARTMENT = {
  url: config.api + 'departments/viewAll',
  method: METHOD.GET,
};

export const CREATE_DEPARTMENT = {
  url: config.api + 'departments',
  method: METHOD.POST,
};

export const READ_DEPARTMENT = id => ({
  url: CREATE_DEPARTMENT.url + '/' + id,
  method: METHOD.GET,
});

export const UPDATE_DEPARTMENT = id => ({
  url: READ_DEPARTMENT(id).url,
  method: METHOD.PUT,
});

export const DELETE_DEPARTMENT = id => ({
  url: READ_DEPARTMENT(id).url,
  method: METHOD.DELETE,
});

export const ADD_LECTURER_TO_DEPARTMENT = id => ({
  url: READ_DEPARTMENT(id).url + '/lecturers',
  method: METHOD.PUT,
});

export const REMOVE_LECTURER_FROM_DEPARTMENT = id => ({
  url: ADD_LECTURER_TO_DEPARTMENT(id).url,
  method: METHOD.DELETE,
});

export const GRAIN_LECTURER_APPROVER_OF_DEPARTMENT = id => ({
  url: ADD_LECTURER_TO_DEPARTMENT(id).url + '/makeApprovers',
  method: METHOD.PATCH,
});

export const REVOKE_LECTURER_APPROVER_OF_DEPARTMENT = id => ({
  url: ADD_LECTURER_TO_DEPARTMENT(id).url + '/removeApprovers',
  method: METHOD.PATCH,
});

// -----------------------------------------------------------------------------

export const LIST_LECTURER = {
  url: config.api + 'lecturers',
  method: METHOD.GET,
};

export const CREATE_LECTURER = {
  url: LIST_LECTURER.url,
  method: METHOD.POST,
};

export const READ_LECTURER = id => ({
  url: LIST_LECTURER.url + '/' + id,
  method: METHOD.GET,
});

export const UPDATE_LECTURER = id => ({
  url: READ_LECTURER(id).url,
  method: METHOD.PUT,
});

export const DELETE_LECTURER = id => ({
  url: READ_LECTURER(id).url,
  method: METHOD.DELETE,
});

// -----------------------------------------------------------------------------

export const LIST_SEMESTER = {
  url: config.api + 'semesters',
  method: METHOD.GET,
};

export const CREATE_SEMESTER = {
  url: LIST_SEMESTER.url,
  method: METHOD.POST,
};

export const READ_SEMESTER = id => ({
  url: LIST_SEMESTER.url + '/' + id,
  method: METHOD.GET,
});

export const UPDATE_SEMESTER = id => ({
  url: READ_SEMESTER(id).url,
  method: METHOD.PUT,
});

export const DELETE_SEMESTER = id => ({
  url: READ_SEMESTER(id).url,
  method: METHOD.DELETE,
});

//------------------------------------------------------------------------------
