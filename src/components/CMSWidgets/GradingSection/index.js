import React from 'react';
import SVG from 'react-inlinesvg';
import { Accordion, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactDataSheet from 'react-datasheet';
import * as constantsCp from 'modules/semester/topic/checkpoints/constants';
import { toAbsoluteUrl } from '_metronic/_helpers';
import { role } from 'auth/recoil/selectors';
import { useRecoilValue } from 'recoil';
import MdEditor from 'react-markdown-editor-lite';
import semesterAtom from 'store/semester';
import { PUT_EVALUATION } from 'endpoints';
import { useParams } from 'react-router-dom';
import toast from 'utils/toast';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import { transformToData } from 'modules/semester/topic/checkpoints/transformers';
import Comment from '../FeedbackSection/Comment';
import Button from 'components/Button';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt();

const GradingSection = ({
  evaluations = [],
  isUserMentor = false,
  checkpointFeedbacks = [],
  onSuccessFeedback = () => {},
}) => {
  const [evals, setEvals] = React.useState([]);
  const currentRole = useRecoilValue(role);
  const currentSemester = useRecoilValue(semesterAtom);
  const { id } = useParams();
  const [isUpdating, setIsUpdating] = React.useState(false);

  // ------------------------------------------------------------------------------

  const [commentValue, setCommentValue] = React.useState('');
  const [commentHtml, setCommentHtml] = React.useState('');
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);

  // ------------------------------------------------------------------------------

  const handleEditorChange = React.useCallback(e => {
    setCommentValue(e.text);
    setCommentHtml(e.html);
  }, []);

  const handleSubmitFeedback = React.useCallback(() => {
    setIsSubmitLoading(true);
    // request({
    //   to: FEEDBACK_TOPIC(id).url,
    //   method: FEEDBACK_TOPIC(id).method,
    //   data: '"' + commentHtml + '"',
    // })
    //   .then(res => {
    onSuccessFeedback();
    setIsSubmitLoading(false);
    // })
    // .catch(err => {
    //   handleErrors(err);
    //   setIsSubmitLoading(false);
    // });
  }, [onSuccessFeedback]);

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
        })
        .catch(handleErrors)
        .finally(() => setIsUpdating(false));
    },
    [currentSemester.status, evals, id]
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
          <button
            className="btn btn-light-info d-flex align-items-center"
            onClick={onSaveEvals}
          >
            <span className="svg-icon svg-icon-md ml-0 mr-2">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/General/Save.svg')}
              ></SVG>
            </span>
            Save
          </button>
        )}
      </div>

      <Accordion>
        {evals?.map((i, index) => (
          <Card className="mb-7">
            <Card.Header>
              <Accordion.Toggle
                as={Card.Header}
                className={`bg-${constantsCp.statusClasses[0]}`}
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
                        Evauluation date
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
                      } font-weight-bolder`}
                    >
                      {constantsCp.statusTitles[i.status]}
                    </span>
                  </OverlayTrigger>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={i.id}>
              <Card.Body>
                <div className="my-5">
                  <span className="text-dark font-size-h5 font-weight-bold">
                    Grading
                  </span>
                </div>

                <div className="marks-table">
                  <ReactDataSheet
                    data={i.grid || []}
                    sheetRenderer={props => {
                      return (
                        <table
                          className={props.className}
                          style={{ width: '100%' }}
                        >
                          <thead></thead>
                          <tbody>{props.children}</tbody>
                        </table>
                      );
                    }}
                    valueRenderer={cell => cell.value}
                    onCellsChanged={changes =>
                      handleGradeChange(changes, index)
                    }
                    dataEditor={props => {
                      return (
                        <input
                          style={{ height: '100%' }}
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

                <div className="my-5">
                  <span className="text-dark font-size-h5 font-weight-bold">
                    Feedback for evaluators
                  </span>
                </div>

                <form className="form">
                  <div className="form-group">
                    <MdEditor
                      style={{ height: '200px' }}
                      value={commentValue}
                      renderHTML={text => mdParser.render(text)}
                      onChange={handleEditorChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <Button
                        isLoading={isSubmitLoading}
                        onClick={handleSubmitFeedback}
                        className="btn btn-light-primary font-weight-bold"
                      >
                        Submit
                      </Button>
                      <button
                        type="button"
                        onClick={() => setCommentValue('')}
                        className="btn btn-clean font-weight-bold ml-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
                <div className="timeline timeline-3">
                  <div className="my-5">
                    <span className="text-dark font-size-h5 font-weight-bold">
                      Evaluator feedbacks
                    </span>
                  </div>
                  <div className="timeline-items">
                    {checkpointFeedbacks.map(fb => (
                      <Comment
                        key={index}
                        email={fb.email || ''}
                        name={fb.name}
                        id={fb.id}
                        date={fb.date}
                        content={fb.content}
                      />
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )) || <></>}
      </Accordion>
    </>
  );
};

export default React.memo(GradingSection);
