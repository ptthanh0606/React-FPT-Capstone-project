import React from 'react';
import { Formik } from 'formik';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { mDown as mDownDep } from 'modules/department/transformers';

export default function CustomersFilter({ filters, setFilters }) {
  const [selectState, setSelectState] = React.useState();
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
                  name="userRole"
                  placeholder="Filter by userRole"
                  onChange={e => {
                    setFieldValue('userRole', e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.userRole}
                >
                  <option value="">All</option>
                  <option value="1">Student</option>
                  <option value="2">Lecturer</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>role</b>
                </small>
              </div>
              <div className="col-lg-9">
                <div className="input-icon">
                  <input
                    type="text"
                    className="form-control form-control-solid"
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
