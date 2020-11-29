import React from 'react';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import CMSModal from 'components/CMSModal/CMSModal';

import toast from 'utils/toast';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from './transformers';
import * as constants from './constants';

import SemesterCard from './SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './NearestSemester.module.scss';

export default React.memo(function NearestSemester() {
  const setMeta = useSetRecoilState(metaAtom);

  const [l, loadData] = React.useReducer(() => ({}), {});

  const [data, setData] = React.useState([]);

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
  }, []);

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
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
      });

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
        {data.map(s => (
          <SemesterCard {...s} key={s.id} />
        ))}
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
