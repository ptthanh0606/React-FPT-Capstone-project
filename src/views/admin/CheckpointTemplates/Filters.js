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
              <div className="col-lg-3">
                <select
                  className="form-control form-control-solid"
                  name="isDisabled"
                  placeholder="Filter by status"
                  onChange={e => {
                    setFieldValue('isDisabled', e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.isDisabled}
                >
                  <option value="">All</option>
                  <option value="false">Activated</option>
                  <option value="true">Deactivated</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>status</b>
                </small>
              </div>
              <div className="col-lg-9">
                <div className="input-icon">
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
