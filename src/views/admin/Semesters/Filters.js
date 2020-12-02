import React from 'react';
import { Formik } from 'formik';

export default function CustomersFilter({ filters, setFilters }) {
  return (
    <>
      <Formik
        initialValues={{
          status: '',
          term: '',
        }}
        onSubmit={setFilters}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control form-control-solid"
                  name="status"
                  placeholder="Filter by Status"
                  onChange={e => {
                    setFieldValue('status', e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">Preparing</option>
                  <option value="1">In progress</option>
                  <option value="2">Finished</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>status</b>
                </small>
              </div>
              <div className="col-lg-10">
                <div className="input-icon">
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    name="term"
                    placeholder="Search"
                    onBlur={handleBlur}
                    value={values.term}
                    onChange={e => {
                      setFieldValue('term', e.target.value);
                      handleSubmit();
                    }}
                  />
                  <span>
                    <i className="flaticon2-search-1 text-muted"></i>
                  </span>
                </div>
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
