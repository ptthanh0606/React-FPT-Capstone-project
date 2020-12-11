import TeamHeader from 'components/CMSWidgets/TeamHeader';
import UserCard from 'components/CMSWidgets/UserCard';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';
import * as transformers from 'modules/semester/council/transformers';
import Update from '../../../admin/Semesters/Semester/Councils/Update';

import metaAtom from 'store/meta';
import userAtom from 'store/user';
import semesterAtom from 'store/semester';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import request from 'utils/request';
import toast from 'utils/toast';
import CMSAnotherList from 'components/CMSAnotherList';
import { useHistory, useParams } from 'react-router-dom';
import { down } from 'modules/semester/council/transformers';

const Council = () => {
  const history = useHistory();
  const { id } = useParams();

  // --------------------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentUser = useRecoilValue(userAtom);
  const currenSem = useRecoilValue(semesterAtom);

  const [l, loadData] = React.useReducer(() => ({}), {});

  // --------------------------------------------------------------------

  const [showUpdate, setShowUpdate] = React.useState(false);
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});

  // --------------------------------------------------------------------

  const [currentCouncil, setCurrentCouncil] = React.useState({});
  const [isUserInCouncil, setIsUserInCouncil] = React.useState(false);
  const [isUserLeadCouncil, setIsUserLeadCouncil] = React.useState(false);

  const [incomingTopic, setIncomingTopic] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // --------------------------------------------------------------------

  const showUpdateModal = React.useCallback(() => {
    request({
      to: endpoints.READ_COUNCIL(currenSem.id, id).url,
      method: endpoints.READ_COUNCIL(currenSem.id, id).method,
    })
      .then(res => {
        setUpdateFieldTemplate(transformers.down(res.data?.data) || {});
        setShowUpdate(true);
      })
      .catch(handleErrors);
    setShowUpdate(true);
  }, [currenSem.id, id]);

  const hideUpdateModal = React.useCallback(() => {
    setShowUpdate(false);
  }, []);

  const edit = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.UPDATE_COUNCIL(currenSem.id, id).url,
        method: endpoints.UPDATE_COUNCIL(currenSem.id, id).method,
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
    [currenSem.id, id]
  );

  // --------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: currentCouncil?.name,
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        { title: currenSem.name, path: '/dashboard' },
        { title: 'Council', path: '/council' },
        { title: currentCouncil?.name, path: `/council/${currentCouncil?.id}` },
      ],
      toolbar: isUserInCouncil && isUserLeadCouncil && (
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
        </>
      ),
    });
  }, [
    currenSem.name,
    currentCouncil.id,
    currentCouncil.name,
    edit,
    hideUpdateModal,
    isProcessing,
    isUserInCouncil,
    isUserLeadCouncil,
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

    request({
      to: endpoints.READ_COUNCIL(currenSem.id, id).url,
      method: endpoints.READ_COUNCIL(currenSem.id, id).method,
    })
      .then(res => {
        const transformedRes = down(res.data.data);
        console.log(transformedRes);
        setCurrentCouncil(transformedRes);
        setIsUserInCouncil(
          transformedRes.members.some(({ value }) => value === currentUser.id)
        );
        setIsUserLeadCouncil(
          transformedRes.members.filter(({ isLeader }) => isLeader === true)[0]
            ?.value === currentUser.id
        );
      })
      .catch(err => {
        history.push('/council');
        handleErrors(err);
      });
  }, [currenSem.id, currentUser.id, history, history.push, id]);

  // ---------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <TeamHeader
            teamName={currentCouncil?.name}
            department={currentCouncil?.department?.fullLabel}
            teamStatus=""
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xxl-9">
          <Row>
            {(currentCouncil?.members?.length &&
              currentCouncil?.members
                .filter(({ isLeader }) => isLeader === true)
                .map(i => (
                  <Col key={i.value} sm={12} md={6} lg={6} xl={4}>
                    <UserCard
                      id={i.value}
                      code={i.label}
                      email={i.email || ''}
                      name={i.name}
                      isLead={i.isLeader}
                      role="lecturer"
                    />
                  </Col>
                ))) || <Col>No member</Col>}
            {(currentCouncil?.members?.length &&
              currentCouncil?.members
                .filter(({ isLeader }) => isLeader !== true)
                .map(i => (
                  <Col key={i.value} sm={12} md={6} lg={6} xl={4}>
                    <UserCard
                      id={i.value}
                      code={i.label}
                      email={i.email || ''}
                      name={i.name}
                      isLead={i.isLeader}
                      role="lecturer"
                    />
                  </Col>
                ))) || <Col></Col>}
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
