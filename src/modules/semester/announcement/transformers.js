import format from 'date-fns/format';
import subMinutes from 'date-fns/subMinutes';

export function down(i) {
  return {
    id: i?.announcementId || console.log('announcementId field not found'),
    content: i?.content || console.log('content field not found'),
    title: i?.title || console.log('title field not found'),
    role: Number.isInteger(i?.userRole)
      ? i.userRole
      : console.log('userRole field not found'),
    createdAt:
      (i?.createdAt &&
        format(
          subMinutes(new Date(i?.createdAt), new Date().getTimezoneOffset()),
          "yyyy-MM-dd'T'HH:mm:ss.SSS"
        )) ||
      console.log('createdAt field not found'),
    updatedAt:
      (i?.updatedAt &&
        format(
          subMinutes(new Date(i?.updatedAt), new Date().getTimezoneOffset()),
          "yyyy-MM-dd'T'HH:mm:ss.SSS"
        )) ||
      console.log('createdAt field not found'),
  };
}

export function up(i) {
  return {
    content: i?.content,
    title: i?.title,
    userRole: Number(i?.role),
  };
}

// Down for list
// Down for selection
// Down for read
// Up for update
// Up for create
