import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import Comment from './Comment';
import Button from 'components/Button';
import MessageTile from '../MessageTile';
import { toAbsoluteUrl } from '_metronic/_helpers';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';
import { useParams } from 'react-router-dom';

const mdParser = new MarkdownIt();

const FeedbackSection = ({
  className,
  feedbacks = [],
  onSuccess,
  topicStatus,
  isInDep = false,
  isUserApprover = false,
}) => {
  const { id } = useParams();
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
    request({
      to: endpoints.FEEDBACK_TOPIC(id).url,
      method: endpoints.FEEDBACK_TOPIC(id).method,
      data: '"' + commentHtml + '"',
    })
      .then(res => {
        onSuccess();
        setIsSubmitLoading(false);
      })
      .catch(err => {
        handleErrors(err);
        setIsSubmitLoading(false);
      });
  }, [commentHtml, id, onSuccess]);

  // ------------------------------------------------------------------------------

  return (
    <>
      <div className={className}>
        <div className="my-5">
          <span className="text-dark font-size-h5 font-weight-bold">
            Feedback for this topic
          </span>
        </div>

        {topicStatus === 'Waiting' && !isUserApprover && (
          <MessageTile
            iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Stop.svg')}
            content="You are not an approver to give feedback or you are not an approver of this topic department."
            baseColor="warning"
          />
        )}

        {topicStatus === 'Waiting' && isUserApprover && !isInDep && (
          <MessageTile
            iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Stop.svg')}
            content="You are not an approver of this topic department."
            baseColor="warning"
          />
        )}

        {['Approved'].includes(topicStatus) && (
          <MessageTile
            iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Stop.svg')}
            content="Feedback session is over"
            baseColor="warning"
          />
        )}

        {topicStatus === 'Waiting' && isUserApprover && isInDep && (
          <>
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
            <div className="separator separator-dashed my-10"></div>
          </>
        )}

        <div className="timeline timeline-3">
          <div className="my-5">
            <span className="text-dark font-size-h5 font-weight-bold">
              What other approvers think:
            </span>
          </div>
          <div className="timeline-items">
            {feedbacks?.length ? (
              feedbacks.map((fb, index) => (
                <Comment
                  key={index}
                  email={fb.approver.email || ''}
                  name={fb.approver.name}
                  id={fb.approver.id}
                  date={fb.date}
                  content={fb.content}
                />
              ))
            ) : (
              <>
                {topicStatus === 'Waiting' ? (
                  <>
                    {isInDep && (
                      <MessageTile
                        iconSrc={toAbsoluteUrl(
                          '/media/svg/icons/Communication/Chat-smile.svg'
                        )}
                        content={
                          isUserApprover
                            ? 'Be the first one to feedback for this topic'
                            : 'Waiting for feedbacks...'
                        }
                        baseColor="primary"
                      />
                    )}
                  </>
                ) : (
                  <span className="text-muted">No feedback provided</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackSection;
