import toast from 'utils/toast';

export function handleErrors(err) {
  if (err.response.data.data?.message) {
    toast.error(err.response.data.data?.message);
  } else if (err.response.data.errors) {
    console.log(err.response.data.errors);
    for (const i of Object.entries(err.response.data.errors)) {
      for (const j of i[1]) toast.error(j);
    }
  } else {
    toast.error('Internal Server Error');
  }
}
