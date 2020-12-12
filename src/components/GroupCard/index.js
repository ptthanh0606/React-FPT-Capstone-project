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
  leaderId,
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
      <div className="card-header d-flex align-items-start border-0 mt-4">
        <h3 className="card-title font-weight-bolder align-items-start text-dark flex-column">
          {title}
          <span className="text-muted mt-3 font-weight-bold font-size-sm mb-5">
            {subTitle}
          </span>
        </h3>
        <div className="card-toolbar align-items-start">{toolBar}</div>
      </div>
      <div className="card-body pt-2">
        <div className={'d-flex-column align-items-center' + className}>
          <Form id="change-weight-form" onSubmit={handleSubmit}>
            {group?.length ? (
              <>
                {group
                  .filter(member => member.id === leaderId)
                  .map(leader => (
                    <GroupMember
                      email={leader.email}
                      key={leader.id}
                      id={leader.id}
                      role={role}
                      label={leader.name}
                      subLabel={'Leader'}
                      booleanFlg={booleanFlg}
                      value={leader.weight}
                    />
                  ))}
                {group
                  .filter(member => member.id !== leaderId)
                  .map(mem => (
                    <GroupMember
                      email={mem.email}
                      key={mem.id}
                      id={mem.id}
                      role={role}
                      label={mem.name}
                      subLabel={''}
                      booleanFlg={booleanFlg}
                      value={mem.weight}
                    />
                  ))}
              </>
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
