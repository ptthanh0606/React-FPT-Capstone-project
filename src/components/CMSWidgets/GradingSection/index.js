import React from 'react';
import SVG from 'react-inlinesvg';
import { Accordion, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactDataSheet from 'react-datasheet';
import * as constantsCp from 'modules/semester/topic/checkpoints/constants';
import { toAbsoluteUrl } from '_metronic/_helpers';
import { role } from 'auth/recoil/selectors';
import { useRecoilValue } from 'recoil';
import semesterAtom from 'store/semester';
import { PUT_EVALUATION } from 'endpoints';
import { useParams } from 'react-router-dom';
import toast from 'utils/toast';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import { transformToData } from 'modules/semester/topic/checkpoints/transformers';
import Button from 'components/Button';

const GradingSection = ({
  evaluations = [],
  isUserMentor = false,
  onSuccessFeedback = () => {},
  isButtonProcessing = false,
  loadData = () => {},
}) => {
  const [evals, setEvals] = React.useState([]);
  const currentRole = useRecoilValue(role);
  const currentSemester = useRecoilValue(semesterAtom);
  const { id } = useParams();
  const [isUpdating, setIsUpdating] = React.useState(false);

  // ---------------------------------------------------------------

  const handleGradeChange = React.useCallback(
    (changes, index) => {
      changes.forEach(({ cell, row, col, value }) => {
        evals[index].grid[row][col] = {
          ...evals[index].grid[row][col],
          value: Number(value),
        };
      });
      setEvals(evals);
    },
    [evals]
  );

  const onSaveEvals = React.useCallback(
    e => {
      console.log(transformToData(evals));
      e.preventDefault();
      if (currentSemester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      setIsUpdating(true);
      request({
        to: PUT_EVALUATION(id).url,
        method: PUT_EVALUATION(id).method,
        data: {
          marks: transformToData(evals),
        },
      })
        .then(res => {
          toast.success('Updated');
          loadData();
        })
        .catch(handleErrors)
        .finally(() => setIsUpdating(false));
    },
    [currentSemester.status, evals, id, loadData]
  );

  // ---------------------------------------------------------------

  React.useEffect(() => {
    setEvals(evaluations);
  }, [evaluations]);

  // ---------------------------------------------------------------

  return (
    <>
      <div className="my-5 d-flex justify-content-between">
        <div className="">
          <span className="text-dark font-size-h5 font-weight-bold mr-2">
            Grading section for mentors and councils
          </span>
          <span className="text-info font-size-sm font-weight-bold">
            {currentRole === 'lecturer' && (
              <>(Click the checkpoint to start grading.)</>
            )}
          </span>
        </div>
        {currentRole === 'lecturer' && isUserMentor && (
          <Button
            isLoading={isButtonProcessing}
            className="btn btn-light-info d-flex align-items-center"
            onClick={onSaveEvals}
          >
            <span className="svg-icon svg-icon-md ml-0 mr-2">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/General/Save.svg')}
              ></SVG>
            </span>
            Save
          </Button>
        )}
      </div>

      <Accordion>
        {evals?.map((i, index) => (
          <Card className="mb-7">
            <Card.Header>
              <Accordion.Toggle
                as={Card.Header}
                className={`bg-${constantsCp.statusClasses[i.status]}`}
                eventKey={i.id}
                style={{
                  padding: '1rem',
                  fontSize: '1.25rem',
                }}
              >
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <div className="d-flex flex-column">
                    <span
                      className={`font-size-h3 font-weight-bolder text-${
                        i.status === 0 ? 'white' : 'white'
                      } text-uppercase`}
                    >
                      {i.name}
                    </span>
                    <div
                      className={`d-flex font-size-sm text-${
                        i.status === 0 ? 'white' : 'white'
                      } mt-3`}
                    >
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>This checkpoint weight</Tooltip>}
                      >
                        <div className="mr-10">
                          <i
                            class={`flaticon2-pie-chart-3 text-${
                              i.status === 0 ? 'white' : 'white'
                            } mr-2 icon-nm`}
                          ></i>
                          {i.weight}
                        </div>
                      </OverlayTrigger>
                      <div className="mr-10">
                        <i
                          class={`flaticon2-paperplane text-${
                            i.status === 0 ? 'white' : 'white'
                          } mr-2 icon-nm`}
                        ></i>
                        Submission due date
                        <span className="ml-2 font-weight-bolder">
                          {constantsCp.convertDateDown(i.submitDueDate)}
                        </span>
                      </div>
                      <div className="mr-10">
                        <i
                          class={`flaticon2-notepad text-${
                            i.status === 0 ? 'white' : 'white'
                          } mr-2 icon-nm`}
                        ></i>
                        Evaluation date
                        <span className="ml-2 font-weight-bolder">
                          {constantsCp.convertDateDown(i.evaluateDueDate)}
                        </span>
                      </div>
                      <div className="mr-10">
                        By
                        <span className="ml-1 font-weight-bolder">
                          {i.council.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Final status of this checkpoint</Tooltip>}
                  >
                    <span
                      class={`text-${
                        i.status === 0 ? 'white' : 'white'
                      } font-weight-bolder mt-3`}
                    >
                      {constantsCp.statusTitles[i.status]}
                    </span>
                  </OverlayTrigger>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={i.id}>
              <div className="marks-table" style={{ overflowX: 'scroll' }}>
                <ReactDataSheet
                  data={i.grid || []}
                  sheetRenderer={props => {
                    return (
                      <table
                        className={props.className}
                        style={{ minWidth: '100%' }}
                      >
                        {props.children}
                      </table>
                    );
                  }}
                  valueRenderer={cell => cell.value}
                  onCellsChanged={changes => handleGradeChange(changes, index)}
                  dataEditor={props => {
                    return (
                      <input
                        style={{ height: '100%', minHeight: '25px' }}
                        onChange={e => props.onChange(e.currentTarget.value)}
                        value={props.value}
                        onKeyDown={props.onKeyDown}
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                      />
                    );
                  }}
                />
              </div>
            </Accordion.Collapse>
          </Card>
        )) || <></>}
      </Accordion>
    </>
  );
};

export default React.memo(GradingSection);
