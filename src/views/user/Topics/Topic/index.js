import React from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';
import userAtom from 'store/user';
import { role } from 'auth/recoil/selectors';

import toast from 'utils/toast';
import request from 'utils/request';
import { handleErrors } from 'utils/common';

import * as endpoints from 'endpoints';
import * as transformers from '../../../../modules/semester/topic/transformers';
import * as constants from '../../../../modules/semester/topic/constants';
import * as teamTransformers from '../../../../modules/semester/team/transformers';
import * as departmentTransformers from '../../../../modules/department/transformers';
import { rowActionFormatter } from './constants';

import CMSModal from 'components/CMSModal/CMSModal';
import CMSList from 'components/CMSList';
import GroupCard from 'components/GroupCard';
import TopicDetailCard from 'components/CMSWidgets/TopicDetailCard';
import useConfirm from 'utils/confirm';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toAbsoluteUrl } from '_metronic/_helpers';

const fakeData = {
  students: [
    {
      id: 1,
      code: 'DuyHD',
    },
    { id: 2, code: 'ThanhPT' },
  ],
  checkpoints: [
    {
      id: 1,
      name: 'Checkpoint 1',
      status: 2,
      weight: 50,
      submitDueDate: '2022-09-01T00:00:00',
      evaluateDueDate: '2022-09-01T00:00:00',
      council: {
        id: 1,
        name: 'ThanhPTLecturer',
        members: [
          {
            id: 1,
            weight: 100,
            code: 'KhanhKT',
          },
          {
            id: 2,
            weight: 10,
            code: 'PhuongLHK',
          },
        ],
      },
      columns: [
        {
          id: 1,
          weight: 10,
          name: 'Cot diem 1',
          grade: [
            // 1st: Evaluator 1, 2nd: Evaluator 1, 3rd: Total cua student trong cot diem
            // Moi array la cac diem cua 1 column
            [1, 2, 3],
            [4, 5, 6],
          ],
          total: 10,
        },
        {
          id: 2,
          weight: 10,
          name: 'Cot diem 2',
          grade: [
            // 1st: Evaluator 1, 2nd: Evaluator 1, 3rd: Total cua student trong cot diem
            // Moi array la cac diem cua 1 column
            [7, 8, 9],
            [10, 11, 12],
          ],
          total: 100,
        },
      ],
      total: [100, 200], // total student
      totalTeam: 10, // total all
    },
    {
      id: 2,
      name: 'Checkpoint 2',
      status: 3,
      weight: 80,
      submitDueDate: '2022-09-01T00:00:00',
      evaluateDueDate: '2022-09-01T00:00:00',
      council: {
        id: 1,
        name: 'Council IB',
        members: [
          {
            id: 1,
            weight: 100,
            code: 'KhanhKT',
          },
          {
            id: 2,
            weight: 10,
            code: 'PhuongLHK',
          },
        ],
      },
      columns: [
        {
          id: 1,
          weight: 10,
          name: 'Cot diem 1',
          grade: [
            // 1st: Evaluator 1, 2nd: Evaluator 1, 3rd: Total cua student trong cot diem
            // Moi array la cac diem cua 1 column
            [1, 2, 3],
            [4, 5, 6],
          ],
          total: 10,
        },
        {
          id: 2,
          weight: 10,
          name: 'Cot diem 2',
          grade: [
            // 1st: Evaluator 1, 2nd: Evaluator 1, 3rd: Total cua student trong cot diem
            // Moi array la cac diem cua 1 column
            [7, 8, 9],
            [10, 11, 12],
          ],
          total: 100,
        },
      ],
      total: [100, 200], // total student
      totalTeam: 10, // total all
    },
    {
      id: 3,
      name: 'Checkpoint 3',
      status: 1,
      weight: 80,
      submitDueDate: '2022-09-01T00:00:00',
      evaluateDueDate: '2022-09-01T00:00:00',
      council: {
        id: 1,
        name: 'Council IB',
        members: [
          {
            id: 1,
            weight: 100,
            code: 'KhanhKT',
          },
          {
            id: 2,
            weight: 10,
            code: 'PhuongLHK',
          },
        ],
      },
      columns: [
        {
          id: 1,
          weight: 10,
          name: 'Cot diem 1',
          grade: [
            // 1st: Evaluator 1, 2nd: Evaluator 1, 3rd: Total cua student trong cot diem
            // Moi array la cac diem cua 1 column
            [1, 2, 3],
            [4, 5, 6],
          ],
          total: 10,
        },
        {
          id: 2,
          weight: 10,
          name: 'Cot diem 2',
          grade: [
            // 1st: Evaluator 1, 2nd: Evaluator 1, 3rd: Total cua student trong cot diem
            // Moi array la cac diem cua 1 column
            [7, 8, 9],
            [10, 11, 12],
          ],
          total: 100,
        },
      ],
      total: [100, 200], // total student
      totalTeam: 10, // total all
    },
    {
      id: 4,
      name: 'Checkpoint 4',
      status: 0,
      weight: 130,
      submitDueDate: '2022-09-01T00:00:00',
      evaluateDueDate: '2022-09-01T00:00:00',
      council: {
        id: 1,
        name: 'Council IB',
        members: [
          {
            id: 1,
            weight: 100,
            code: 'KhanhKT',
          },
          {
            id: 2,
            weight: 10,
            code: 'PhuongLHK',
          },
        ],
      },
      columns: [
        {
          id: 1,
          weight: 10,
          name: 'Cot diem 1',
          grade: [
            // 1st: Evaluator 1, 2nd: Evaluator 1, 3rd: Total cua student trong cot diem
            // Moi array la cac diem cua 1 column
            [1, 2, 3],
            [4, 5, 6],
          ],
          total: 10,
        },
        {
          id: 2,
          weight: 10,
          name: 'Cot diem 2',
          grade: [
            // 1st: Evaluator 1, 2nd: Evaluator 1, 3rd: Total cua student trong cot diem
            // Moi array la cac diem cua 1 column
            [7, 8, 9],
            [10, 11, 12],
          ],
          total: 100,
        },
      ],
      total: [100, 200], // total student
      totalTeam: 10, // total all
    },
  ],
};

function transformToGrid(data) {
  const final = [];
  const header = [
    { value: '', readOnly: true, colSpan: 4 },
    ...data.students.map(i => ({
      value: i.code,
      readOnly: true,
      colSpan: 2,
      id: i.id,
    })),
    { value: 'Team', readOnly: true },
  ];

  for (const z of data.checkpoints) {
    const grid = [header];

    for (const i in z.columns) {
      const firstEvaluator = z.council.members[0];
      const evaluatorNum = z.council.members.length;
      const toPush = [
        { value: z.columns[i].name, readOnly: true, rowSpan: evaluatorNum },
        {
          value: z.columns[i].weight,
          readOnly: true,
          rowSpan: evaluatorNum,
        },
        { value: firstEvaluator.code, readOnly: true },
        { value: firstEvaluator.weight, readOnly: true },
      ];

      for (const j in data.students) {
        toPush.push(
          {
            value: z.columns[i].grade[j][0],
            studentId: data.students[j].id,
            lecturerId: z.council.members[0].id,
            markColumnId: z.columns[i].id,
            evaluationId: z.id,
          },
          {
            value: z.columns[i].grade[j][z.columns[i].grade.length],
            rowSpan: z.council.members.length,
            readOnly: true,
          }
        );
      }

      toPush.push({
        value: z.columns[i].total,
        rowSpan: z.council.members.length,
        readOnly: true,
      });

      grid.push(toPush);

      for (const k in z.council.members.slice(1)) {
        grid.push([
          { value: z.council.members[+k + 1].code, readOnly: true },
          { value: z.council.members[+k + 1].weight, readOnly: true },
          ...z.columns[i].grade.map((x, index) => ({
            value: x[+k + 1],
            studentId: data.students[index].id,
            lecturerId: z.council.members[+k + 1].id,
            markColumnId: z.columns[i].id,
            evaluationId: z.id,
          })),
        ]);
      }
    }

    grid.push([
      { value: 'Total', colSpan: 4, readOnly: true },
      ...z.total.map(x => ({ value: x, colSpan: 2, readOnly: true })),
      { value: z.totalTeam, readOnly: true },
    ]);

    final.push({
      id: z.id,
      name: z.name,
      weight: z.weight,
      submitDueDate: z.submitDueDate,
      evaluateDueDate: z.evaluateDueDate,
      council: z.council,
      status: z.status,
      grid,
    });
  }

  console.log(final);

  return final;
}

function transformToData(data) {
  const grades = [];
  for (const k of data) {
    for (const i of k.grid) {
      for (const j of i) {
        if (j.readOnly !== true) grades.push(j);
      }
    }
  }
  return grades;
}

const Topic = () => {
  const history = useHistory();
  const { id } = useParams();
  const confirm = useConfirm();

  // ----------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);
  const currentUser = useRecoilValue(userAtom);
  const currentRole = useRecoilValue(role);

  // ----------------------------------------------------------

  const [currentTopic, setCurrentTopic] = React.useState({});
  const [evals, setEvals] = React.useState([]);
  const [isStudentUserHaveTeam, setIsStudentUserHaveTeam] = React.useState(
    false
  );
  const [isTeamInTopic, setIsTeamInTopic] = React.useState(false);
  const [isStudentTeamLead, setIsStudentTeamLead] = React.useState(false);
  const [isTeamApplied, setIsTeamApplied] = React.useState(false);
  const [isTeamLocked, setIsTeamLocked] = React.useState(false);

  const [isUserMentor, setIsUserMentor] = React.useState(false);
  const [isUserMentorLeader, setIsUserMentorLeader] = React.useState(false);
  const [isUserApprover, setIsUserApprover] = React.useState(false);
  const [isUserCouncilMember, setIsUserCouncilMember] = React.useState(false);

  const [mentorLeaderId, setMentorLeaderId] = React.useState();
  const [studentLeaderId, setStudentLeaderId] = React.useState();
  const [guestStudentTeamId, setGuestStudentTeamId] = React.useState();
  const [studentApplicationId, setStudentApplicationId] = React.useState();

  const [editWeightFlg, setEditWeightFlg] = React.useState(false);

  //----------------------------------------------------------------------------

  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ---------------------------------------------------------------------------

  const statusTitles = React.useMemo(() => constants.statusTitles, []);

  // ----------------------------------------------------------

  const fetchDepartment = React.useCallback(
    depId => {
      request({
        to: endpoints.READ_DEPARTMENT(depId).url,
        method: endpoints.READ_DEPARTMENT(depId).method,
      })
        .then(res => {
          const transformedRes = departmentTransformers.down(res.data.data);
          setIsUserApprover(
            transformedRes.approvers.some(
              approver => approver.value === currentUser.id
            )
          );
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentUser.id]
  );

  const fetchLeaderTeam = React.useCallback(
    teamId => {
      request({
        to: endpoints.READ_TEAM(teamId).url,
        method: endpoints.READ_TEAM(teamId).method,
        params: {
          semesterId: currentSemester.id,
        },
      })
        .then(res => {
          const transformedRes = teamTransformers.down(res.data.data);
          setStudentLeaderId(transformedRes.leader.value);
        })
        .catch(err => {});
    },
    [currentSemester.id]
  );

  const checkPreConditions = React.useCallback(
    data => {
      setMentorLeaderId(
        data.mentorMembers?.filter(({ isLeader }) => isLeader === true)[0]?.id
      );
      if (currentRole === 'lecturer') {
        setIsUserMentor(
          data.mentorMembers?.some(({ value }) => value === currentUser.id)
        );

        setIsUserMentorLeader(
          data.mentorMembers?.filter(({ isLeader }) => isLeader === true)[0]
            ?.id === currentUser.id
        );

        fetchDepartment(data.department.value);
      } else {
        if (
          !['Pending', 'Approved', 'Rejected', 'Ready'].includes(
            statusTitles[data.status]
          )
        ) {
          fetchLeaderTeam(data.team.value);
        }
      }
    },
    [
      currentRole,
      currentUser.id,
      fetchDepartment,
      fetchLeaderTeam,
      statusTitles,
    ]
  );

  const fetchCouncil = React.useCallback(() => {
    // fetch Topic
    request({
      to: endpoints.READ_TOPIC(id).url,
      method: endpoints.READ_TOPIC(id).method,
    })
      .then(res => {
        const transformedRes = transformers.downRead(res.data.data);
        checkPreConditions(transformedRes);

        setCurrentTopic(transformedRes);
      })
      .catch(err => {
        history.push('/topic');
        handleErrors(err);
      });
  }, [checkPreConditions, history, id]);

  const fetchTopic = React.useCallback(() => {
    // fetch Topic
    setIsProcessing(true);
    request({
      to: endpoints.READ_TOPIC(id).url,
      method: endpoints.READ_TOPIC(id).method,
    })
      .then(res => {
        const transformedRes = transformers.downRead(res.data.data);
        checkPreConditions(transformedRes);
        setCurrentTopic(transformedRes);
        setIsProcessing(false);
        setEvals(transformToGrid(fakeData));
      })
      .catch(err => {
        history.push('/topic');
        setIsProcessing(false);
        handleErrors(err);
      });
  }, [checkPreConditions, history, id]);

  const fetchUserTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(0).url,
      method: endpoints.READ_TEAM(0).method,
      params: {
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        setIsStudentUserHaveTeam(true);
        const transformedRes = teamTransformers.down(res.data.data);

        if (
          transformedRes.applications.some(
            app => id * 1 === app.topic.id && app.status === 0
          )
        ) {
          setIsTeamApplied(true);
          setStudentApplicationId(
            transformedRes.applications.filter(
              app => id * 1 === app.topic.id && app.status === 0
            )[0].id
          );
        }
        setGuestStudentTeamId(transformedRes.id);
        setIsStudentTeamLead(currentUser.id === transformedRes.leader.value);
        setIsTeamInTopic(id === transformedRes.topic?.value);
        setIsTeamLocked(transformedRes.lock);
      })
      .catch(err => {
        setIsStudentUserHaveTeam(false);
      });
  }, [currentSemester.id, currentUser.id, id]);

  // ----------------------------------------------------------

  const handleConfirmApproveTeam = React.useCallback(
    appId => {
      return () => {
        request({
          to: endpoints.APPROVE_APPLICATION(appId).url,
          method: endpoints.APPROVE_APPLICATION(appId).method,
        })
          .then(res => {
            toast.success('Approved selected team to topic.');
            fetchTopic();
          })
          .catch(err => {
            handleErrors(err);
          });
      };
    },
    [fetchTopic]
  );

  const handleConfirmRejectTeam = React.useCallback(
    appId => {
      return () => {
        request({
          to: endpoints.REJECT_APPLICATION(appId).url,
          method: endpoints.REJECT_APPLICATION(appId).method,
        })
          .then(res => {
            toast.success('Rejected selected team.');
            fetchTopic();
          })
          .catch(err => {
            handleErrors(err);
          });
      };
    },
    [fetchTopic]
  );

  const handleApproveTeam = React.useCallback(
    appId => {
      confirm({
        title: 'Confirm required',
        body: 'Are you sure you want to match this team to topic?',
        onConfirm: handleConfirmApproveTeam(appId),
      });
    },
    [confirm, handleConfirmApproveTeam]
  );

  const handleRejectTeam = React.useCallback(
    appId => {
      confirm({
        title: 'Confirm required',
        body: 'Are you sure you want to reject this team to application?',
        onConfirm: handleConfirmRejectTeam(appId),
      });
    },
    [confirm, handleConfirmRejectTeam]
  );

  const handleShowEditWeight = React.useCallback(e => {
    e.preventDefault();
    setEditWeightFlg(editWeightFlg => !editWeightFlg);
  }, []);

  const handleChangeWeight = React.useCallback(
    weightData => {
      request({
        to: endpoints.UPDATE_WEIGHT(id).url,
        method: endpoints.UPDATE_WEIGHT(id).method,
        data: {
          topicId: currentTopic?.id,
          mentorMembers: weightData,
        },
      })
        .then(res => {
          fetchTopic();
          toast.success('Mentor weights updated!');
          setEditWeightFlg(editWeightFlg => !editWeightFlg);
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentTopic.id, fetchTopic, id]
  );

  const onFeedbackSuccess = React.useCallback(
    e => {
      fetchTopic();
    },
    [fetchTopic]
  );

  const handleConfirmSettingModal = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.UPDATE_TOPIC(id).url,
        method: endpoints.UPDATE_TOPIC(id).method,
        params: {
          topicId: id,
        },
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Update topic successfully');
          setShowUpdate(false);
          fetchTopic();
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [fetchTopic, id]
  );

  const handleShowSettingModal = React.useCallback(
    e => {
      e.preventDefault();
      request({
        to: endpoints.READ_TOPIC(id).url,
        method: endpoints.READ_TOPIC(id).method,
        params: {
          topicId: id,
        },
      })
        .then(res => {
          setUpdateFieldTemplate(transformers.downRead(res.data?.data) || {});
          setShowUpdate(true);
        })
        .catch(handleErrors);
    },
    [id]
  );

  const onDumpConfirm = React.useCallback(() => {
    request({
      to: endpoints.DELETE_TOPIC(id).url,
      method: endpoints.DELETE_TOPIC(id).method,
    })
      .then(res => {
        fetchTopic();
      })
      .catch(handleErrors);
  }, [fetchTopic, id]);

  const handleConfirmDumpTopic = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to dump this selected topic?',
      onConfirm: onDumpConfirm,
    });
  }, [confirm, onDumpConfirm]);

  const onConfirmApplyMentor = React.useCallback(() => {
    request({
      to: endpoints.APPLY_MENTOR(id).url,
      method: endpoints.APPLY_MENTOR(id).method,
    })
      .then(res => {
        toast.success('You are now a mentor of this topic!');
        fetchTopic();
      })
      .catch(handleErrors);
  }, [fetchTopic, id]);

  const handleApplyMentor = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to be a mentor of this topic?',
      onConfirm: onConfirmApplyMentor,
    });
  }, [confirm, onConfirmApplyMentor]);

  const onConfirmApplyMatching = React.useCallback(() => {
    request({
      to: endpoints.SEND_APPLICATION.url,
      method: endpoints.SEND_APPLICATION.method,
      data: {
        teamId: guestStudentTeamId,
        topicId: id,
      },
    })
      .then(() => {
        fetchTopic();
        fetchUserTeam();
        toast.success(
          'Your team application sent, please wait for mentor to confirm!'
        );
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [fetchTopic, fetchUserTeam, guestStudentTeamId, id]);

  const onConfirmCancelApplication = React.useCallback(() => {
    request({
      to: endpoints.CANCEL_APPLICATION(studentApplicationId).url,
      method: endpoints.CANCEL_APPLICATION(studentApplicationId).method,
    })
      .then(() => {
        fetchTopic();
        fetchUserTeam();
        setIsTeamApplied(false);
        toast.success('Application canceled.');
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [fetchTopic, fetchUserTeam, studentApplicationId]);

  const handleCancelApplication = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to cancel this application?',
      onConfirm: onConfirmCancelApplication,
    });
  }, [confirm, onConfirmCancelApplication]);

  const handleStudentApplyForMatching = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to apply matching for this topic?',
      onConfirm: onConfirmApplyMatching,
    });
  }, [confirm, onConfirmApplyMatching]);

  // ----------------------------------------------------------

  const toolBar = React.useCallback(() => {
    let buttons = <></>;
    if (currentTopic) {
      switch (currentRole) {
        case 'student':
          buttons =
            statusTitles[currentTopic?.status] === 'Ready' &&
            isStudentUserHaveTeam &&
            !isTeamInTopic &&
            isStudentTeamLead &&
            (!isTeamApplied ? (
              <>
                {isTeamLocked ? (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        Apply matching for this topic, mentor will consider your
                        application after you sent. <br />
                        You must lock your team before you can apply.
                      </Tooltip>
                    }
                  >
                    <button
                      type="button"
                      className="btn btn-primary btn-success font-weight-bold btn-sm "
                      onClick={handleStudentApplyForMatching}
                      disabled={!isTeamLocked}
                    >
                      <i className="fas fa-sign-in-alt mr-1"></i>
                      Send application
                    </button>
                  </OverlayTrigger>
                ) : (
                  <>
                    <span class="svg-icon svg-icon-danger mr-1">
                      <SVG
                        src={toAbsoluteUrl(
                          '/media/svg/icons/Code/Warning-1-circle.svg'
                        )}
                      ></SVG>
                    </span>
                    <span className="text-danger font-weight-bolder">
                      You must lock your team before send application for this
                      topic.
                    </span>
                  </>
                )}
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-danger font-weight-bold btn-sm "
                onClick={handleCancelApplication}
              >
                <i className="fas fa-ban mr-1"></i>
                Cancel application
              </button>
            ));
          break;

        case 'lecturer':
          buttons = (
            <>
              {statusTitles[currentTopic.status] === 'Pending' &&
                currentTopic.submitter.value === currentUser.id && (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary font-weight-bold btn-sm btn-light mr-2"
                      onClick={handleShowSettingModal}
                    >
                      <i className="fas fa-cog mr-1"></i>
                      Settings
                    </button>
                    <CMSModal
                      isShowFlg={showUpdate}
                      onHide={() => setShowUpdate(false)}
                      configs={constants.submitterModalConfigs}
                      title="Update topic"
                      subTitle="Change this topic info"
                      onConfirmForm={handleConfirmSettingModal}
                      fieldTemplate={updateFieldTemplate}
                      primaryButtonLabel="Update"
                      isProcessing={isProcessing}
                    />
                  </>
                )}
              {!['Pending', 'Rejected'].includes(
                statusTitles[currentTopic.status]
              ) &&
                !isUserMentor && (
                  <button
                    type="button"
                    className="btn btn-primary btn-success font-weight-bold btn-sm ml-2"
                    onClick={handleApplyMentor}
                  >
                    <i className="fas fa-sign-in-alt mr-1"></i>
                    Become a mentor
                  </button>
                )}
              {statusTitles[currentTopic.status] === 'Pending' &&
                currentTopic.submitter.value === currentUser.id && (
                  <button
                    type="button"
                    className="btn btn-primary btn-danger font-weight-bold btn-sm "
                    onClick={handleConfirmDumpTopic}
                  >
                    <i className="far fa-trash-alt mr-2"></i>
                    Dump
                  </button>
                )}
            </>
          );
          break;

        default:
          break;
      }
    }
    return buttons;
  }, [
    currentRole,
    currentTopic,
    currentUser.id,
    handleApplyMentor,
    handleCancelApplication,
    handleConfirmDumpTopic,
    handleConfirmSettingModal,
    handleShowSettingModal,
    handleStudentApplyForMatching,
    isProcessing,
    isStudentTeamLead,
    isStudentUserHaveTeam,
    isTeamApplied,
    isTeamInTopic,
    isTeamLocked,
    isUserMentor,
    showUpdate,
    statusTitles,
    updateFieldTemplate,
  ]);

  const mentorCardToolbar = React.useCallback(() => {
    return editWeightFlg ? (
      <button
        type="submit"
        form="change-weight-form"
        className="btn btn-sm font-weight-bolder btn-success"
      >
        Save
      </button>
    ) : (
      <button
        type="button"
        onClick={handleShowEditWeight}
        className="btn btn-sm font-weight-bolder btn-light-primary"
      >
        Edit weight
      </button>
    );
  }, [editWeightFlg, handleShowEditWeight]);

  // ----------------------------------------------------------

  const setViewMeta = React.useCallback(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Topic detail',
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        { title: 'Fall 2020', path: '/select-semester#' + id },
        { title: 'Topic', path: '/topic/' },
        {
          title: currentTopic.name,
          path: '/topic/' + id,
        },
      ],
      toolbar: toolBar(),
    }));
  }, [currentTopic.name, id, setMeta, toolBar]);

  React.useEffect(() => {
    setViewMeta();
  });

  React.useEffect(() => {
    if (currentRole === 'student') {
      fetchUserTeam();
    } else {
      // fetchCouncil();
    }
    fetchTopic();
  }, [currentRole, fetchCouncil, fetchTopic, fetchUserTeam]);

  const applicationsMap = React.useCallback(
    applications => {
      return applications
        .filter(application => application.status === 0)
        .map(application => ({
          id: application.id,
          label: application.team?.name,
          subLabel: (
            <>
              <span className="font-weight-bolder">Leader: </span>
              {
                application.team?.members?.filter(
                  member => member.id === application.team.leaderId
                )[0]?.name
              }
            </>
          ),
          actions: (() => (
            <>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Approve selected team</Tooltip>}
              >
                <Button
                  className="btn btn-primary btn-light-success font-weight-bold btn-sm mr-2"
                  onClick={() => handleApproveTeam(application.id)}
                >
                  <span class="svg-icon mr-0">
                    <SVG
                      src={toAbsoluteUrl('/media/svg/icons/General/Smile.svg')}
                    ></SVG>
                  </span>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Reject selected team</Tooltip>}
              >
                <Button
                  className="btn btn-light-danger font-weight-bold btn-sm "
                  onClick={() => handleRejectTeam(application.id)}
                >
                  <span class="svg-icon mr-0 svg-icon-red">
                    <SVG
                      src={toAbsoluteUrl('/media/svg/icons/General/Sad.svg')}
                    ></SVG>
                  </span>
                </Button>
              </OverlayTrigger>
            </>
          ))(),
        }));
    },
    [handleApproveTeam, handleRejectTeam]
  );

  return (
    <>
      <div className="row">
        <div
          className={`col-lg-12 col-xxl-${
            ['Pending', 'Rejected'].includes(statusTitles[currentTopic.status])
              ? '12'
              : '9'
          }`}
        >
          <TopicDetailCard
            topicId={currentTopic.id || ''}
            topicCode={currentTopic.code || ''}
            topicName={currentTopic.name || ''}
            fullDesc={currentTopic.description || ''}
            department={currentTopic.department || ''}
            status={currentTopic.status}
            minMembers={currentTopic.minMembers || ''}
            maxMember={currentTopic.maxMembers || ''}
            studentMembers={currentTopic.team?.members}
            mentorMembers={currentTopic.mentorMembers}
            applications={currentTopic.applications}
            feedbacks={currentTopic.feedbacks}
            submitter={currentTopic.submitter}
            isUserApprover={isUserApprover}
            isUserMentor={isUserMentor}
            onFeedbackSuccess={onFeedbackSuccess}
            isLoading={isProcessing}
            evaluations={evals || []}
          />
        </div>
        <div className="col-lg-6 col-xxl-3">
          {currentRole === 'lecturer' &&
            isUserMentor &&
            statusTitles[currentTopic.status] === 'Ready' && (
              <CMSList
                className="gutter-b"
                title="Applying teams"
                subTitle="Consider approve team to topic"
                rows={applicationsMap(currentTopic.applications)}
                rowActions={
                  (isUserMentorLeader &&
                    rowActionFormatter(
                      handleApproveTeam,
                      handleRejectTeam
                    )) || <></>
                }
                fallbackMsg="Awaiting for application..."
              />
            )}

          {statusTitles[currentTopic.status] === 'Matched' && (
            <GroupCard
              className="gutter-b"
              title="Assigned team"
              subTitle="Team currently matched to this topic"
              role="student"
              group={currentTopic.team?.members}
              leaderId={studentLeaderId}
              fallbackMsg={'Matched but no team? This might be a problem...'}
              toolBar={
                !!currentTopic.team?.members.length && (
                  <Link
                    to={`/team/${currentTopic.team?.value}`}
                    className="btn btn-sm btn-light-primary font-weight-bolder"
                  >
                    More
                  </Link>
                )
              }
            />
          )}

          {!['Pending', 'Rejected'].includes(
            statusTitles[currentTopic.status]
          ) && (
            <GroupCard
              title="Mentors"
              subTitle="Mentor of this topic"
              role="lecturer"
              leaderId={mentorLeaderId}
              fallbackMsg={'Become a leader mentor for this topic now!'}
              group={currentTopic.mentorMembers}
              handleSubmitRowData={handleChangeWeight}
              toolBar={
                (currentTopic?.mentorMembers?.length &&
                  isUserMentorLeader &&
                  mentorCardToolbar()) || <></>
              }
              booleanFlg={editWeightFlg}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Topic;
