import React from 'react';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import CMSModal from 'components/CMSModal/CMSModal';

import toast from 'utils/toast';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/semester/transformers';
import * as constants from 'modules/semester/constants';

import SemesterCard from './SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './nearest.module.scss';

export default React.memo(function NearestSemester() {
  const setMeta = useSetRecoilState(metaAtom);

  const [l, loadData] = React.useReducer(() => ({}), {});

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  //----------------------------------------------------------------------------

  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [showCreate, setShowCreate] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ---------------------------------------------------------------------------

  const showCreateModal = React.useCallback(() => {
    setShowCreate(true);
  }, []);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, []);

  const handleCreate = React.useCallback(fieldData => {
    setIsProcessing(true);
    try {
      request({
        to: endpoints.CREATE_SEMESTER.url,
        method: endpoints.CREATE_SEMESTER.method,
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Create semester successfully');
          setShowCreate(false);
          loadData();
          setFieldTemplate({});
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    } catch (err) {
      handleErrors(err);
      setIsProcessing(false);
    }
  }, []);

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};

    request({
      to: endpoints.LIST_SEMESTER.url,
      method: endpoints.LIST_SEMESTER.method,
      params: {
        pageNumber: 1,
        pageSize: 5,
      },
      source,
    })
      .then(res => {
        setData(res.data?.data?.map(transformers.down));
      })
      .catch(err => {
        handleErrors(err);
      })
      .finally(() => setIsLoading(false));

    return () => {
      source.cancel();
    };
  }, [l]);

  React.useEffect(() => {
    setMeta({
      title: 'Nearest semesters',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Nearest semesters', path: '/semester/nearest' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          onClick={showCreateModal}
        >
          <i className="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [setMeta, showCreateModal]);

  return (
    <>
      <ScrollContainer
        className={styles['semester-scroll'] + ' alert-shadow gutter-b'}
      >
        {isLoading ? (
          <div className="mb-8">Loading...</div>
        ) : data?.length > 0 ? (
          data.map(s => <SemesterCard {...s} key={s.id} />)
        ) : (
          <div className="mb-8">There is no semester at the moment...</div>
        )}
      </ScrollContainer>
      <div className={styles['nav-box']}>
        <Link to="/semester/all">View all semesters</Link>
      </div>
      <CMSModal
        isShowFlg={showCreate}
        onHide={hideCreateModal}
        configs={constants.modalConfigs}
        primaryButtonLabel="Create"
        title="Create new semester"
        subTitle="Start a new capstone semester"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
    </>
  );
});
