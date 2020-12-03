import CMSList from 'components/CMSList';
import TeamHeader from 'components/CMSWidgets/TeamHeader';
import UserCard from 'components/CMSWidgets/UserCard';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import Member from 'views/user/Teams/Team/Member';

const members = [
  { isLead: true },
  { isLead: false },
  { isLead: false },
  { isLead: false },
  { isLead: false },
  { isLead: false },
];

const Council = () => {
  const setMeta = useSetRecoilState(metaAtom);
  const [incomingTopic, setIncomingTopic] = React.useState([]);

  React.useEffect(() => {
    setMeta({
      title: 'My council ',
      breadcrumb: [
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'My council', path: '/my-council' },
      ],
      toolbar: (
        <>
          <button
            type="button"
            className="btn btn-primary font-weight-bold btn-sm btn-light mr-2"
          >
            <i className="fas fa-cog mr-2"></i>
            Settings
          </button>
          <button
            type="button"
            className="btn btn-primary btn-danger font-weight-bold btn-sm "
            onClick={() => {}}
          >
            <i className="far fa-trash-alt mr-2"></i>
            Leave
          </button>
        </>
      ),
    });
  }, [setMeta]);

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
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <TeamHeader />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xxl-9">
          <Row>
            {members.map(i => (
              <Col sm={12} md={6} lg={6} xl={4}>
                <UserCard
                  email="phanthongthanh0606@gmail.com"
                  name="Phan Thong Thanh"
                  department="Software Engineer"
                  isLead={i.isLead}
                />
              </Col>
            ))}
          </Row>
        </div>
        <div className="col-lg-12 col-xxl-3">
          <CMSList
            title="Incoming topic need evaluation"
            rows={incomingTopic}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(Council);
