import CMSList from 'components/CMSList';
import TeamHeader from 'components/CMSWidgets/TeamHeader';
import UserCard from 'components/CMSWidgets/UserCard';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';
import * as transformers from '../../../../modules/semester/council/transformers';
import Update from '../../../admin/Semesters/Semester/Councils/Update';

import metaAtom from 'store/meta';
import userAtom from 'store/user';
import semesterAtom from 'store/semester';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import request from 'utils/request';
import toast from 'utils/toast';
import CMSAnotherList from 'components/CMSAnotherList';
import { useHistory } from 'react-router-dom';

const Council = () => {
  const history = useHistory();
  const setMeta = useSetRecoilState(metaAtom);
  const currentUser = useRecoilValue(userAtom);
  const currenSem = useRecoilValue(semesterAtom);

  const [l, loadData] = React.useReducer(() => ({}), {});

  // --------------------------------------------------------------------

  const [showUpdate, setShowUpdate] = React.useState(false);
  const [incomingTopic, setIncomingTopic] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [currenCouncilId, setCurrentCouncilId] = React.useState(0);

  // --------------------------------------------------------------------

  const showUpdateModal = React.useCallback(() => {
    request({
      to: endpoints.READ_COUNCIL(currenSem.id, currenCouncilId).url,
      method: endpoints.READ_COUNCIL(currenSem.id, currenCouncilId).method,
    })
      .then(res => {
        setUpdateFieldTemplate(transformers.down(res.data?.data) || {});
        setShowUpdate(true);
      })
      .catch(handleErrors);
    setShowUpdate(true);
  }, [currenCouncilId, currenSem.id]);

  const hideUpdateModal = React.useCallback(() => {
    setShowUpdate(false);
  }, []);

  const edit = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.UPDATE_COUNCIL(currenSem.id, currenCouncilId).url,
        method: endpoints.UPDATE_COUNCIL(currenSem.id, currenCouncilId).method,
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Update council successfully');
          setShowUpdate(false);
          loadData();
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [currenCouncilId, currenSem.id]
  );

  // --------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'My council ',
      breadcrumb: [
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'My council', path: '/my-council' },
      ],
      toolbar: (
        <>
          <button
            type="button"
            onClick={showUpdateModal}
            className="btn btn-primary font-weight-bold btn-sm btn-light mr-2"
          >
            <i className="fas fa-cog mr-2"></i>
            Settings
          </button>
          <Update
            isShowFlg={showUpdate}
            setIsShowFlg={setShowUpdate}
            onHide={hideUpdateModal}
            onConfirmForm={edit}
            isProcessing={isProcessing}
            fieldTemplate={updateFieldTemplate}
          />
          <button
            type="button"
            className="btn btn-primary btn-danger font-weight-bold btn-sm "
            onClick={() => {}}
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Leave
          </button>
        </>
      ),
    });
  }, [
    edit,
    hideUpdateModal,
    isProcessing,
    setMeta,
    showUpdate,
    showUpdateModal,
    updateFieldTemplate,
  ]);

  React.useEffect(() => {
    const response = [
      {
        id: 0,
        label: 'Capstone Management System',
        subLabel: 'FA20SE13',
        onLabelClick: e => {
          e.preventDefault();
          history.push(`/topic/${0}`);
        },
      },
      {
        id: 0,
        label: 'Web Checker System',
        subLabel: 'FA20SE11',
      },
      {
        id: 0,
        label: 'Example topic name',
        subLabel: 'FA20SE15',
      },
      {
        id: 0,
        label: 'Example topic name 2',
        subLabel: 'FA20SE15',
      },
      {
        id: 0,
        label: 'Example topic name 3',
        subLabel: 'FA20SE15',
      },
      {
        id: 0,
        label: 'Example topic name 4',
        subLabel: 'FA20SE15',
      },
    ];
    setIncomingTopic(response);
  }, [history, history.push]);

  React.useEffect(() => {
    const response = [
      {
        id: '0',
        name: 'Thay Thong',
        email: 'phanthongthanh0606@gmail.com',
        weight: 0,
        isLead: true,
      },
      {
        id: '1',
        name: 'Thay Hung',
        email: 'yorkittran@gmail.com',
        weight: 0,
        isLead: false,
      },
      {
        id: '2',
        name: 'Thay Khanh',
        email: 'thaitrung1604@gmail.com',
        weight: 0,
        isLead: false,
      },
      {
        id: '3',
        name: 'Thay Hoang',
        email: 'duuuuuuuuy@gmail.com',
        weight: 0,
        isLead: false,
      },
    ];
    setMembers(response);
  }, []);

  React.useEffect(() => {
    // Get council based on current lecturer id
    console.log(currentUser);
    const response = 0;
    setCurrentCouncilId(response);
  }, [currentUser]);

  // ---------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <TeamHeader />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xxl-9">
          <Row>
            {members.map(i => (
              <Col key={i.id} sm={12} md={6} lg={6} xl={4}>
                <UserCard
                  id={i.id}
                  email={i.email}
                  name={i.name}
                  isLead={i.isLead}
                  role="lecturer"
                />
              </Col>
            ))}
          </Row>
        </div>
        <div className="col-lg-12 col-xxl-3">
          <CMSAnotherList
            className="gutter-b"
            title="Topic need feedback"
            rows={incomingTopic}
            darkMode={true}
          />
          {/* <CMSList
            title="Incoming topic need evaluation"
            rows={incomingTopic}
          /> */}
        </div>
      </div>
    </>
  );
};

export default React.memo(Council);
