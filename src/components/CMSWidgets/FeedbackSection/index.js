import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import Comment from './Comment';
import Button from 'components/Button';

const mdParser = new MarkdownIt();

const FeedbackSection = ({
  className,
  feedbacks = [
    {
      name: 'Phan Thong Thanh',
      date: 'Todayy',
      content: 'Hiii',
    },
  ],
}) => {
  const [commentValue, setCommentValue] = React.useState('');
  const [commentHtml, setCommentHtml] = React.useState('');
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);

  const handleEditorChange = React.useCallback(e => {
    setCommentValue(e.text);
    setCommentHtml(e.html);
  }, []);

  const handleSubmitFeedback = React.useCallback(() => {
    setIsSubmitLoading(true);
    setTimeout(() => {
      console.log({ submiterID: '', comment: commentHtml });
      setIsSubmitLoading(false);
    }, 1000);
  }, [commentHtml]);

  React.useEffect(() => {}, []);

  return (
    <>
      <div
        className={className + ''}
        id="kt_apps_contacts_view_tab_1"
        role="tabpanel"
      >
        <div className="my-5">
          <span className="text-dark font-size-h5 font-weight-bold">
            Feedback comment
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
              <a href="/" className="btn btn-clean font-weight-bold">
                Cancel
              </a>
            </div>
          </div>
        </form>

        <div className="separator separator-dashed my-10"></div>

        <div className="timeline timeline-3">
          <div className="timeline-items">
            {feedbacks.length &&
              feedbacks.map(fb => (
                <Comment
                  key={feedbacks.indexOf(fb)}
                  email={fb.email}
                  name={fb.name}
                  date={fb.date}
                  content={fb.content}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackSection;
