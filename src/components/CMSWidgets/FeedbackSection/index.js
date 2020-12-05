import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import Comment from './Comment';
import Button from 'components/Button';
import MessageTile from '../MessageTile';
import { toAbsoluteUrl } from '_metronic/_helpers';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';
import { useParams } from 'react-router-dom';
import * as constants from '../../../modules/semester/topic/constants';

const mdParser = new MarkdownIt();

const FeedbackSection = ({
  className,
  feedbacks = [
    {
      approver: { id: 3, code: 'TrungTTLecturer', name: 'Tran Thai Trung' },
      content: 'THIS IS CONTENT',
      date: '2020-12-03T16:48:49.272724',
      id: 6,
    },
  ],
  onSuccess,
  topicStatus,
  isInDep = false,
}) => {
  const { id } = useParams();
  const statusTitles = React.useMemo(() => constants.statusTitles, []);
  const statusClasses = React.useMemo(() => constants.statusClasses, []);
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
      <div
        className={className}
        id="kt_apps_contacts_view_tab_1"
        role="tabpanel"
      >
        <div className="my-5">
          <span className="text-dark font-size-h5 font-weight-bold">
            Feedback for this topic
          </span>
        </div>

        {topicStatus === 'Pending' && isInDep && (
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
                  <a href="/" className="btn btn-clean font-weight-bold">
                    Cancel
                  </a>
                </div>
              </div>
            </form>
            <div className="separator separator-dashed my-10"></div>
          </>
        )}

        {!isInDep && (
          <MessageTile
            iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Stop.svg')}
            content="You are not belong to this department"
            baseColor="warning"
          />
        )}

        {topicStatus !== 'Pending' && (
          <MessageTile
            iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Stop.svg')}
            content="Feedback session is over"
            baseColor="warning"
          />
        )}

        <div className="timeline timeline-3">
          <div className="my-5">
            <span className="text-dark font-size-h5 font-weight-bold">
              What other people think
            </span>
          </div>
          <div className="timeline-items">
            {feedbacks?.length ? (
              feedbacks.map(fb => (
                <Comment
                  key={feedbacks.indexOf(fb)}
                  email={'phanthongthanh0606@gmail.com'}
                  name={fb.approver.name}
                  date={fb.date}
                  content={fb.content}
                />
              ))
            ) : (
              <>
                {topicStatus === 'Pending' ? (
                  <>
                    {isInDep && (
                      <MessageTile
                        iconSrc={toAbsoluteUrl(
                          '/media/svg/icons/Communication/Chat-smile.svg'
                        )}
                        content="Be the first one to feedback for this topic"
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
