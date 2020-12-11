import React from 'react';
import { Accordion, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactDataSheet from 'react-datasheet';
import * as constantsCp from 'modules/semester/topic/checkpoints/constants';

const GradingSection = ({ evaluations = [] }) => {
  const [evals, setEvals] = React.useState([]);

  // --------------------------------------------------------------

  const [data, setData] = React.useReducer((state, action) => {
    if (action.name === 'all') return { ...state, ...action.value };
    return {
      ...state,
      [action.name]: action.value,
    };
  }, {});

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

  // ---------------------------------------------------------------

  React.useEffect(() => {
    setEvals(evaluations);
  }, [evaluations]);

  // ---------------------------------------------------------------

  return (
    <>
      <div className="my-5">
        <span className="text-dark font-size-h5 font-weight-bold mr-2">
          Grading section for mentors and councils
        </span>
        <span className="text-info font-size-sm font-weight-bold">
          (Click the checkpoint to start grading.)
        </span>
      </div>

      <Accordion>
        {evals?.map((i, index) => (
          <Card className="mb-10">
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
                    <span className="font-size-h3 font-weight-bolder text-white text-uppercase">
                      {i.name}
                    </span>
                    <div className="d-flex font-size-sm text-white mt-3">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="quick-user-tooltip">
                            This checkpoint weight
                          </Tooltip>
                        }
                      >
                        <div className="mr-10">
                          <i class="flaticon2-pie-chart-3 text-white mr-2 icon-nm"></i>
                          {i.weight}
                        </div>
                      </OverlayTrigger>
                      <div className="mr-10">
                        <i class="flaticon2-paperplane text-white mr-2 icon-nm"></i>
                        Submitted at:
                        <span className="ml-2 font-weight-bolder">
                          {constantsCp.convertDateDown(i.submitDueDate)}
                        </span>
                      </div>
                      <div className="mr-10">
                        <i class="flaticon2-notepad text-white mr-2 icon-nm"></i>
                        Evaluated at:
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
                    <span class={`text-white font-weight-bolder`}>
                      {constantsCp.statusTitles[i.status]}
                    </span>
                  </OverlayTrigger>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={i.id}>
              <ReactDataSheet
                sheetRenderer={props => (
                  <table
                    border="1"
                    className={props.className}
                    style={{
                      width: '100%',
                    }}
                  >
                    <tbody>{props.children}</tbody>
                  </table>
                )}
                rowRenderer={props => (
                  <tr {...props} className={props.className}>
                    {props.children}
                  </tr>
                )}
                data={i.grid || []}
                valueRenderer={cell => cell.value}
                onCellsChanged={changes => handleGradeChange(changes, index)}
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
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  );
};

export default React.memo(GradingSection);
