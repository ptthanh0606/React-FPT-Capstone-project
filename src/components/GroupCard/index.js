import React from 'react';
import { Form } from 'react-bootstrap';
import GroupMember from './GroupMember';

const GroupCard = ({
  group = [],
  role,
  className,
  title,
  subTitle,
  toolBar = <></>,
  booleanFlg = false,
  fallbackMsg,
  handleSubmitRowData = () => {},
}) => {
  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      let payload = [];

      document.querySelectorAll('*[data-weight]').forEach(el => {
        payload = [
          ...payload,
          {
            id: el.getAttribute('data-weight-id'),
            weight: el.getAttribute('data-weight'),
          },
        ];
      });

      handleSubmitRowData(payload);
    },
    [handleSubmitRowData]
  );

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header d-flex align-items-center border-0 mt-4">
        <h3 className="card-title font-weight-bolder align-items-start text-dark flex-column">
          {title}
          <span className="text-muted mt-3 font-weight-bold font-size-sm mb-5">
            {subTitle}
          </span>
        </h3>
        <div className="card-toolbar">{toolBar}</div>
      </div>
      <div className="card-body pt-2">
        <div className={'d-flex-column align-items-center' + className}>
          <Form id="change-weight-form" onSubmit={handleSubmit}>
            {group?.length ? (
              group.map(member => (
                <GroupMember
                  email={member.email}
                  key={member.id}
                  id={member.id}
                  role={role}
                  label={member.name}
                  subLabel={member.isLeader && 'Leader'}
                  booleanFlg={booleanFlg}
                  value={member.weight}
                />
              ))
            ) : (
              <>{fallbackMsg}</>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GroupCard);
