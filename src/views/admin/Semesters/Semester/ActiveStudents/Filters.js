import React from 'react';
import { Formik } from 'formik';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { mDown as mDownDep } from 'views/admin/Departments/transformers';

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
              <div className="col-lg-2">
                <SelectTagInput
                  placeholder="All"
                  onChange={e => {
                    setSelectState(e);
                    setFieldValue('departmentId', e?.value);
                    handleSubmit();
                  }}
                  value={selectState}
                  load={(input, callback) => {
                    request({
                      to: endpoints.LIST_DEPARTMENT.url,
                      method: endpoints.LIST_DEPARTMENT.method,
                      params: {
                        term: input,
                        pageSize: 10,
                      },
                    })
                      .then(res => {
                        callback(res?.data?.data?.map(mDownDep) || []);
                      })
                      .catch(() => callback([]));
                  }}
                />
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
                  <option value="0">Not in a team</option>
                  <option value="1">Matching</option>
                  <option value="2">Matched</option>
                </select>
                <small className="form-text text-muted">
                  Filter by <b>status</b>
                </small>
              </div>
              <div className="col-lg-8">
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
