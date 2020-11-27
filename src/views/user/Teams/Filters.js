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
                  <option value="2">SS</option>
                  <option value="2">JP</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>department</b>
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control form-control-solid"
                  name="status"
                  placeholder="Filter by status"
                  onChange={e => {
                    setFieldValue('status', e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="1">Matching</option>
                  <option value="2">Matched</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>status</b>
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control form-control-solid"
                  name="status"
                  placeholder="Filter by status"
                  onChange={e => {
                    setFieldValue('status', e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">Locked</option>
                  <option value="1">Unlocked</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>lock</b>
                </small>
              </div>
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
                  <option value="0">Public</option>
                  <option value="1">Private</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>private</b>
                </small>
              </div>
              <div className="col-lg-4">
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
