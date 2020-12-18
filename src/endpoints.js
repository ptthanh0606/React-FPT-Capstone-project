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
  url: config.api + 'departments',
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

export const LIST_CHECKPOINT_TEMPLATE = {
  url: config.api + 'checkpointTemplates',
  method: METHOD.GET,
};

export const CREATE_CHECKPOINT_TEMPLATE = {
  url: LIST_CHECKPOINT_TEMPLATE.url,
  method: METHOD.POST,
};

export const READ_CHECKPOINT_TEMPLATE = id => ({
  url: LIST_CHECKPOINT_TEMPLATE.url + '/' + id,
  method: METHOD.GET,
});

export const CREATE_CHECKPOINT = id => ({
  url: LIST_CHECKPOINT_TEMPLATE.url + '/' + id + '/checkpoints',
  method: METHOD.POST,
});

export const READ_CHECKPOINT = (id, id2) => ({
  url: LIST_CHECKPOINT_TEMPLATE.url + '/' + id + '/checkpoints/' + id2,
  method: METHOD.GET,
});

export const UPDATE_CHECKPOINT = (id, id2) => ({
  url: LIST_CHECKPOINT_TEMPLATE.url + '/' + id + '/checkpoints/' + id2,
  method: METHOD.PUT,
});

export const DELETE_CHECKPOINT = (id, id2) => ({
  url: LIST_CHECKPOINT_TEMPLATE.url + '/' + id + '/checkpoints/' + id2,
  method: METHOD.DELETE,
});

export const UPDATE_CHECKPOINT_TEMPLATE = id => ({
  url: READ_CHECKPOINT_TEMPLATE(id).url,
  method: METHOD.PUT,
});

export const DELETE_CHECKPOINT_TEMPLATE = id => ({
  url: READ_CHECKPOINT_TEMPLATE(id).url,
  method: METHOD.DELETE,
});

// -----------------------------------------------------------------------------

export const LIST_ADMIN = {
  url: config.api + 'admins',
  method: METHOD.GET,
};

export const CREATE_ADMIN = {
  url: LIST_ADMIN.url,
  method: METHOD.POST,
};

export const READ_ADMIN = id => ({
  url: LIST_ADMIN.url + '/' + id,
  method: METHOD.GET,
});

export const UPDATE_ADMIN = id => ({
  url: READ_ADMIN(id).url,
  method: METHOD.PUT,
});

export const DELETE_ADMIN = id => ({
  url: READ_ADMIN(id).url,
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

// -----------------------------------------------------------------------------

export const LIST_ACTIVE_STUDENTS = id => ({
  url: READ_SEMESTER(id).url + '/students',
  method: METHOD.GET,
});

export const CREATE_ACTIVE_STUDENTS = id => ({
  url: LIST_ACTIVE_STUDENTS(id).url,
  method: METHOD.POST,
});

export const READ_ACTIVE_STUDENTS = (id, id2) => ({
  url: LIST_ACTIVE_STUDENTS(id).url + '/' + id2,
  method: METHOD.GET,
});

export const UPDATE_ACTIVE_STUDENTS = (id, id2) => ({
  url: READ_ACTIVE_STUDENTS(id, id2).url,
  method: METHOD.PATCH,
});

export const DELETE_ACTIVE_STUDENTS = id => ({
  url: LIST_ACTIVE_STUDENTS(id).url,
  method: METHOD.DELETE,
});

// -----------------------------------------------------------------------------

export const LIST_ANNOUNCEMENT = id => ({
  url: READ_SEMESTER(id).url + '/announcements',
  method: METHOD.GET,
});

export const CREATE_ANNOUNCEMENT = id => ({
  url: LIST_ANNOUNCEMENT(id).url,
  method: METHOD.POST,
});

export const READ_ANNOUNCEMENT = (id, id2) => ({
  url: LIST_ANNOUNCEMENT(id).url + '/' + id2,
  method: METHOD.GET,
});

export const UPDATE_ANNOUNCEMENT = (id, id2) => ({
  url: READ_ANNOUNCEMENT(id, id2).url,
  method: METHOD.PUT,
});

export const DELETE_ANNOUNCEMENT = id => ({
  url: LIST_ANNOUNCEMENT(id).url,
  method: METHOD.DELETE,
});

// -----------------------------------------------------------------------------

export const LIST_STUDENT = {
  url: config.api + 'students',
  method: METHOD.GET,
};

export const CREATE_STUDENT = {
  url: LIST_STUDENT.url,
  method: METHOD.POST,
};

export const READ_STUDENT = id => ({
  url: LIST_STUDENT.url + '/' + id,
  method: METHOD.GET,
});

export const UPDATE_STUDENT = id => ({
  url: READ_STUDENT(id).url,
  method: METHOD.PUT,
});

export const DELETE_STUDENT = id => ({
  url: READ_STUDENT(id).url,
  method: METHOD.DELETE,
});

// -----------------------------------------------------------------------------

export const LIST_TEAM = {
  url: config.api + 'teams',
  method: METHOD.GET,
};

export const CREATE_TEAM = {
  url: LIST_TEAM.url,
  method: METHOD.POST,
};

export const READ_TEAM = id => ({
  url: LIST_TEAM.url + '/' + id,
  method: METHOD.GET,
});

export const UPDATE_TEAM = id => ({
  url: READ_TEAM(id).url,
  method: METHOD.PUT,
});

export const DELETE_TEAM = id => ({
  url: READ_TEAM(id).url,
  method: METHOD.DELETE,
});

// -----------------------------------------------------------------------------

export const JOIN_TEAM = id => ({
  url: READ_TEAM(id).url + '/join',
  method: METHOD.PUT,
});

export const TRANSFER_LEADER_TEAM = id => ({
  url: READ_TEAM(id).url + '/transferLeader',
  method: METHOD.PUT,
});

export const LEAVE_TEAM = id => ({
  url: READ_TEAM(id).url + '/leave',
  method: METHOD.PUT,
});

export const LOCK_TEAM = id => ({
  url: READ_TEAM(id).url + '/editLockStatus',
  method: METHOD.PUT,
});

export const REFRESH_CODE_TEAM = id => ({
  url: READ_TEAM(id).url + '/refreshCode',
  method: METHOD.PUT,
});

// -----------------------------------------------------------------------------

export const LIST_COUNCIL = id => ({
  url: config.api + 'semesters/' + id + '/councils',
  method: METHOD.GET,
});

export const CREATE_COUNCIL = id => ({
  url: LIST_COUNCIL(id).url,
  method: METHOD.POST,
});

export const READ_COUNCIL = (id, id2) => ({
  url: LIST_COUNCIL(id).url + '/' + id2,
  method: METHOD.GET,
});

export const UPDATE_COUNCIL = (id, id2) => ({
  url: READ_COUNCIL(id, id2).url,
  method: METHOD.PUT,
});

export const DELETE_COUNCIL = (id, id2) => ({
  url: READ_COUNCIL(id, id2).url,
  method: METHOD.DELETE,
});

// -----------------------------------------------------------------------------

export const LIST_TOPIC = {
  url: config.api + 'topics',
  method: METHOD.GET,
};

export const CREATE_TOPIC = {
  url: LIST_TOPIC.url,
  method: METHOD.POST,
};

export const READ_TOPIC = id => ({
  url: LIST_TOPIC.url + '/' + id,
  method: METHOD.GET,
});

export const UPDATE_TOPIC = id => ({
  url: READ_TOPIC(id).url,
  method: METHOD.PUT,
});

export const REJECT_TOPIC = id => ({
  url: READ_TOPIC(id).url + '/reject',
  method: METHOD.PUT,
});

export const APPROVE_TOPIC = id => ({
  url: READ_TOPIC(id).url + '/approve',
  method: METHOD.PUT,
});

export const DELETE_TOPIC = id => ({
  url: READ_TOPIC(id).url,
  method: METHOD.DELETE,
});

export const FEEDBACK_TOPIC = id => ({
  url: READ_TOPIC(id).url + '/feedback',
  method: METHOD.POST,
});

export const APPLY_MENTOR = id => ({
  url: READ_TOPIC(id).url + '/mentor',
  method: METHOD.POST,
});

export const UPDATE_WEIGHT = id => ({
  url: READ_TOPIC(id).url + '/mentors/updateweight',
  method: METHOD.PUT,
});

// -----------------------------------------------------------------------------

export const LIST_NOTIFICATION = {
  url: config.api + 'notifications',
  method: METHOD.GET,
};

// -----------------------------------------------------------------------------

export const SEND_APPLICATION = {
  url: config.api + 'topicapplications',
  method: METHOD.POST,
};

export const APPROVE_APPLICATION = id => ({
  url: SEND_APPLICATION.url + '/' + id + '/accept',
  method: METHOD.PUT,
});

export const REJECT_APPLICATION = id => ({
  url: SEND_APPLICATION.url + '/' + id + '/reject',
  method: METHOD.PUT,
});

export const CANCEL_APPLICATION = id => ({
  url: SEND_APPLICATION.url + '/' + id + '/cancel',
  method: METHOD.PUT,
});

// -----------------------------------------------------------------------------

export const LIST_EVALUATION = {
  url: config.api + 'evaluations',
  method: METHOD.GET,
};

export const ASSIGN_EVALUATION = {
  url: LIST_EVALUATION.url,
  method: METHOD.POST,
};

export const UPDATE_EVALUATION = {
  url: LIST_EVALUATION.url,
  method: METHOD.PUT,
};

// -----------------------------------------------------------------------------
