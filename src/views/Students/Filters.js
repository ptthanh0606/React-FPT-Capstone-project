import React from 'react';
import { Formik } from 'formik';

export default function CustomersFilter({ filters, setFilters }) {
  return (
    <>
      <Formik
        initialValues={{
          status: '',
          searchText: '',
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
                  placeholder="Filter by Department"
                  onChange={e => {
                    setFieldValue('status', e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">SE</option>
                  <option value="1">BA</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>department</b>
                </small>
              </div>
              <div className="col-lg-10">
                <div class="input-icon">
                  <input
                    type="text"
                    className="form-control form-control-solid"
                    name="searchText"
                    placeholder="Search"
                    onBlur={handleBlur}
                    value={values.searchText}
                    onChange={e => {
                      setFieldValue('searchText', e.target.value);
                      handleSubmit();
                    }}
                  />
                  <span>
                    <i class="flaticon2-search-1 text-muted"></i>
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
