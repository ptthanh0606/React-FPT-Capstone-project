import React from 'react';
import { toast as toastify } from 'react-toastify';
import { ToastContainer as ToastifyContainer } from 'react-toastify';

export const Container = React.memo(() => (
  <ToastifyContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
));

const toast = {
  success: function (mess) {
    toastify.success(
      <>
        <i className="fa fa-check mr-3" />
        {mess}
      </>
    );
  },
  error: function (mess) {
    toastify.error(
      <>
        <i className="fa fa-times mr-3" />
        {mess}
      </>
    );
  },
  info: function (mess) {
    toastify.info(
      <>
        <i className="fa fa-info mr-3" />
        {mess}
      </>
    );
  },
  warn: function (mess) {
    toastify.warn(
      <>
        <i className="fa fa-exclamation mr-3" />
        {mess}
      </>
    );
  },
};

export default toast;
