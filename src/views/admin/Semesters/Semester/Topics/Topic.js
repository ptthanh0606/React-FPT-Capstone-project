import React from 'react';
import { useParams } from 'react-router-dom';

import request from 'utils/request';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';
import { Row, Col } from 'react-bootstrap';
import Card from 'components/Card';
import Button from 'components/Button';

import * as transformers from 'modules/semester/topic/transformers';

const Topic = () => {
  const { id: semId, topicId } = useParams();

  React.useEffect(() => {
    console.log(semId, topicId);
    request({
      to: endpoints.READ_TOPIC(topicId).url,
      method: endpoints.READ_TOPIC(topicId).method,
    })
      .then(res => {
        console.log(transformers.downRead(res?.data?.data));
      })
      .catch(handleErrors);
  }, [semId, topicId]);

  return (
    <>
      <Row>
        <Col lg={12}>
          <Card
            title="Information of topic"
            toolbar={
              <>
                <Button variant="danger" className="mr-2">
                  Delete topic
                </Button>
                <Button>Save</Button>
              </>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Card />
        </Col>
        <Col lg={6}>
          <Card />
        </Col>
      </Row>
    </>
  );
};

export default Topic;
