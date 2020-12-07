import React from 'react';
import Button from 'components/Button';
import { Modal } from 'react-bootstrap';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { columnsTransformer } from 'utils/common';
import BootstrapTable from 'react-bootstrap-table-next';
import toast from 'utils/toast';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { addMinutes, format, subMinutes } from 'date-fns';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import { mDown as mDownCouncil } from 'modules/semester/council/transformers';
import { useParams } from 'react-router-dom';

export function convertDateDown(dateInput) {
  return format(
    subMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "yyyy-MM-dd'T'HH:mm:ss.SSS"
  );
}

export function convertDateUp(dateInput) {
  return format(
    addMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "yyyy-MM-dd'T'HH:mm:ss.SSS"
  );
}

class DateTimeEditor extends React.Component {
  static defaultProps = {
    value: 0,
  };
  getValue() {
    return this.dateTime.value;
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return (
      <input
        {...rest}
        key="range"
        ref={node => (this.dateTime = node)}
        type="datetime-local"
        step={3600}
        className="form-control form-control-solid"
      />
    );
  }
}

class CouncilEditor extends React.Component {
  static defaultProps = {
    value: undefined,
    semesterId: 0,
  };
  getValue() {
    return this.council.value;
  }
  render() {
    const { value, onUpdate } = this.props;
    return (
      <SelectTagInput
        onChange={value => onUpdate(value)}
        isMulti={false}
        load={(input, callback) => {
          request({
            to: endpoints.LIST_COUNCIL(this.props.semesterId).url,
            method: endpoints.LIST_COUNCIL(this.props.semesterId).method,
            params: {
              term: input,
              pageSize: 10,
            },
          })
            .then(res => {
              callback(
                [
                  { label: 'Topic mentors', value: 0 },
                  ...res.data.data?.map(mDownCouncil),
                ] || [{ label: 'Topic mentors', value: 0 }]
              );
            })
            .catch(() => callback([]));
        }}
        value={value}
        menuPortalTarget={document.body}
      />
    );
  }
}

const AssignCheckpointTemplateModal = ({
  isShowFlg = false,
  setIsShowFlg = function () {},
  onOk = function () {},
}) => {
  const { id: semId } = useParams();
  const onHide = React.useCallback(() => {
    setIsShowFlg(false);
  }, [setIsShowFlg]);

  const [checkpoints, setCheckpoints] = React.useState([]);

  const [isShowAdd, setIsShowAdd] = React.useState(false);
  const [isShowEdit, setIsShowEdit] = React.useState(false);

  React.useEffect(() => {
    setCheckpoints([{ id: 1, name: 'haha' }]);
  }, []);

  //----------------------------------------------------------------------------

  const showAdd = React.useCallback(e => {
    e.preventDefault();
    setIsShowAdd(true);
  }, []);

  const hideAdd = React.useCallback(e => {
    e.preventDefault();
    setIsShowAdd(false);
  }, []);

  //----------------------------------------------------------------------------

  const handleEdit = React.useCallback(e => {
    e.preventDefault();
  }, []);

  const handleRemove = React.useCallback(e => {
    e.preventDefault();
  }, []);

  //----------------------------------------------------------------------------

  const handleTableChange = React.useCallback((type, { cellEdit = {} }) => {
    if (type === 'cellEdit') {
      console.log(cellEdit);
      setCheckpoints(i => {
        const index = i.findIndex(x => x.id === cellEdit.rowId);
        const newI = [...i];
        if (index !== -1) newI[index][cellEdit.dataField] = cellEdit.newValue;
        return newI;
      });
    }
  }, []);

  const columns = React.useMemo(
    () =>
      columnsTransformer([
        {
          dataField: 'name',
          text: 'Name',
          editable: false,
        },
        {
          dataField: 'description',
          text: 'Description',
          editable: false,
        },
        {
          dataField: 'count',
          text: 'Columns number',
          editable: false,
        },
        {
          dataField: 'weight',
          text: 'Weight',
          editable: false,
        },
        {
          dataField: 'marginPass',
          text: 'Margin Pass',
          editable: false,
        },
        {
          dataField: 'submitDueDate',
          text: 'Submit Due Date',
          editable: true,
          formatter: (cellContent, row, rowIndex) => {
            return (
              (cellContent &&
                format(new Date(cellContent), "HH'h', dd/MM/yyyy")) ||
              ''
            );
          },
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <DateTimeEditor {...editorProps} value={value} />,
        },
        {
          dataField: 'evaluateDueDate',
          text: 'Evaluate Due Date',
          editable: true,
          formatter: (cellContent, row, rowIndex) => {
            return (
              (cellContent &&
                format(new Date(cellContent), "HH'h', dd/MM/yyyy")) ||
              ''
            );
          },
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <DateTimeEditor {...editorProps} value={value} />,
        },
        {
          dataField: 'council',
          text: 'Council',
          editable: true,
          formatter: (cellContent, row, rowIndex) => {
            return cellContent && cellContent.label;
          },
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <CouncilEditor {...editorProps} value={value} semesterId={semId} />
          ),
          classes: 'text-right pr-0',
          headerClasses: 'text-right pr-3',
        },
      ]),
    [semId]
  );

  return (
    <>
      <Modal
        show={isShowFlg}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
        dialogClassName="modal-xxl"
      >
        <Modal.Body style={{}}>
          <div
            style={{
              fontSize: '1.4rem',
              textAlign: 'center',
              borderBottom: '1.5px solid #eaedf2',
              paddingBottom: '1.5rem',
              marginTop: '.5rem',
            }}
          >
            Checkpoints of xxx
          </div>
          <BootstrapTable
            wrapperClasses="table-responsive"
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bootstrap4
            remote
            keyField="id"
            data={checkpoints && Array.isArray(checkpoints) ? checkpoints : []}
            columns={columns}
            noDataIndication={() => (
              <div style={{ textAlign: 'center' }} className="mt-5">
                No records found
              </div>
            )}
            onTableChange={handleTableChange}
            headerClasses="text-nowrap"
            cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignCheckpointTemplateModal;
