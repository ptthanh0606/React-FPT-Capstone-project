import TeamHeader from 'components/CMSWidgets/TeamHeader';
import UserCard from 'components/CMSWidgets/UserCard';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';
import * as transformers from 'modules/semester/council/transformers';
import * as timelineTransformer from 'modules/timelines/transformers';

import metaAtom from 'store/meta';
import userAtom from 'store/user';
import semesterAtom from 'store/semester';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import request from 'utils/request';
import toast from 'utils/toast';
import { role } from 'auth/recoil/selectors';
import CMSAnotherList from 'components/CMSAnotherList';
import { useHistory, useParams } from 'react-router-dom';
import { down } from 'modules/semester/council/transformers';
import MessageTile from 'components/CMSWidgets/MessageTile';
import { toAbsoluteUrl } from '_metronic/_helpers';

const Council = () => {
  const history = useHistory();
  const { id } = useParams();

  // --------------------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentUser = useRecoilValue(userAtom);
  const currenSem = useRecoilValue(semesterAtom);
  const currentRole = useRecoilValue(role);

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

  const fetchTimelines = React.useCallback(
    (depId, currentCouncilId) => {
      setIsProcessing(true);
      request({
        to: endpoints.LIST_TIMELINES(currenSem.id).url,
        method: endpoints.LIST_TIMELINES(currenSem.id).method,
        params: {
          departmentId: depId,
        },
      })
        .then(res => {
          let topics = [];
          for (const topic of res.data.data.topics) {
            for (const e of topic.evaluations) {
              if (e.council.id === currentCouncilId) {
                topics.push(topic);
              }
            }
          }
          setIncomingTopic(
            topics.map(topic => ({
              id: topic.id,
              labelId: topic.id,
              label: topic.name,
              subLabel: topic.code,
              darkMode: true,
            }))
          );
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currenSem.id]
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
      toolbar: currentRole === 'lecturer' &&
        isUserInCouncil &&
        isUserLeadCouncil && <></>,
    });
  }, [
    currenSem.name,
    currentCouncil.id,
    currentCouncil.name,
    currentRole,
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
        fetchTimelines(transformedRes.department.value, transformedRes.id);
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
  }, [
    l,
    currenSem.id,
    currentUser.id,
    history,
    history.push,
    id,
    fetchTimelines,
  ]);

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
        <div className={`col-lg-12 col-xxl-${isUserInCouncil ? '9' : '12'}`}>
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
                      roleProp="lecturer"
                    />
                  </Col>
                ))) || (
              <Col xl={12}>
                <MessageTile
                  iconSrc={toAbsoluteUrl(
                    '/media/svg/icons/Code/Info-circle.svg'
                  )}
                  content={<>There is no members in this group.</>}
                  baseColor="warning"
                  className="gutter-b"
                />
              </Col>
            )}
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
                      roleProp="lecturer"
                      isUserLeadCouncil={isUserLeadCouncil}
                    />
                  </Col>
                ))) || <Col></Col>}
          </Row>
        </div>

        {currentRole === 'lecturer' && isUserInCouncil && (
          <div className="col-lg-12 col-xxl-3">
            <CMSAnotherList
              className="gutter-b"
              title="Topic need evaluate"
              rows={incomingTopic}
              darkMode={true}
              fallbackMsg={'No topics to be evaluate...'}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(Council);
