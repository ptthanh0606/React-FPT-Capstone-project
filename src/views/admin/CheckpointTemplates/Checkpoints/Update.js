import React from 'react';
import Button from 'components/Button';
import FormGroups from 'components/CMSModal/FormGroups';
import { Form, Modal } from 'react-bootstrap';
import { columnsTransformer } from 'utils/common';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

class NumberEditor extends React.Component {
  static defaultProps = {
    value: 0,
  };
  getValue() {
    return parseInt(this.number.value, 10);
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return (
      <input
        {...rest}
        key="range"
        ref={node => (this.number = node)}
        type="number"
        className="form-control form-control-solid"
      />
    );
  }
}

class TextEditor extends React.Component {
  static defaultProps = {
    value: 0,
  };
  getValue() {
    return this.text.value || '';
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return (
      <input
        {...rest}
        key="range"
        ref={node => (this.text = node)}
        type="text"
        className="form-control form-control-solid"
      />
    );
  }
}

const UpdateCheckpoint = ({
  isShowFlg = false,
  setIsShowFlg = function () {},
  onOk = function () {},
  data = {
    name: '',
    description: '',
    weight: 0,
    marginPass: 0,
    cols: [],
  },
}) => {
  const onHide = React.useCallback(() => {
    setIsShowFlg(false);
  }, [setIsShowFlg]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [weight, setWeight] = React.useState(0);
  const [marginPass, setMarginPass] = React.useState(0);
  const [cols, setCols] = React.useState([]);

  const [newNum, setNewNum] = React.useState(1);

  //----------------------------------------------------------------------------

  const handleTableChange = React.useCallback((type, { cellEdit = {} }) => {
    if (type === 'cellEdit') {
      setCols(i => {
        const index = i.findIndex(x => x.id === cellEdit.rowId);
        const newI = [...i];
        if (index !== -1) newI[index][cellEdit.dataField] = cellEdit.newValue;
        return newI;
      });
    }
  }, []);

  const addNewCol = React.useCallback(
    e => {
      e.preventDefault();
      setCols(i => {
        const maxId = Math.max(...i.map(i => Number(i.id)));
        return [
          ...i,
          {
            id: (maxId !== -Infinity ? maxId : 0) + 1,
            name: 'New column ' + newNum,
            description: '',
            weight: 10,
          },
        ];
      });
      setNewNum(i => i + 1);
    },
    [newNum]
  );

  const handleRemoveCol = React.useCallback(e => {
    e.preventDefault();
    const index = Number(e.currentTarget.getAttribute('data-index'));
    console.log(index);

    setCols(i => {
      const newCols = [...i];
      newCols.splice(index, 1);
      return newCols;
    });
  }, []);

  const onUpdate = React.useCallback(
    e => {
      e.preventDefault();
      setIsLoading(true);
      onOk({
        name,
        description,
        weight,
        marginPass,
        cols,
      })
        .then(() => setIsShowFlg(false))
        .catch(() => {})
        .finally(() => setIsLoading(false));
    },
    [cols, description, marginPass, name, onOk, setIsShowFlg, weight]
  );
  //----------------------------------------------------------------------------

  const columns = React.useMemo(
    () =>
      columnsTransformer([
        {
          dataField: 'name',
          text: 'Name',
          editable: true,
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <TextEditor {...editorProps} value={value} />,
        },
        {
          dataField: 'description',
          text: 'Description',
          editable: true,
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <TextEditor {...editorProps} value={value} />,
        },
        {
          dataField: 'weight',
          text: 'Weight',
          editable: true,
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <NumberEditor {...editorProps} value={value} />,
        },
        {
          dataField: 'action',
          text: 'Actions',
          editable: false,
          formatter: (cellContent, row, rowIndex) => {
            return (
              <span className="text-nowrap">
                <a
                  href="/"
                  title="Remove"
                  className="btn btn-icon btn-light btn-hover-primary btn-sm"
                  data-index={rowIndex}
                  onClick={handleRemoveCol}
                >
                  <i className="fas fa-trash mx-2"></i>
                </a>
              </span>
            );
          },
          classes: 'text-right pr-0',
          headerClasses: 'text-right pr-3',
          style: {
            minWidth: '100px',
          },
        },
      ]),
    [handleRemoveCol]
  );

  const handleOnSubmitForm = React.useCallback(event => {
    event.preventDefault();
  }, []);

  React.useEffect(() => {
    if (isShowFlg === true) {
      setName(data.name);
      setDescription(data.description);
      setWeight(data.weight);
      setMarginPass(data.marginPass);
      setCols(data.cols);

      console.log(data.cols);

      setNewNum(1);
    }
  }, [isShowFlg, data]);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      style={{
        marginTop: '-1rem',
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Update checkpoint
          <small className="form-text text-muted">
            Update a checkpoint of this template
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{}}>
        <Form id="test-form" onSubmit={handleOnSubmitForm}>
          <FormGroups
            type="text"
            config={{
              label: 'Name',
              placeholder: 'Give this checkpoint a name...',
            }}
            value={name}
            handleChangeFields={value => setName(value)}
          />
          <FormGroups
            type="textarea"
            config={{
              label: 'Description',
              placeholder: 'Give this checkpoint a description...',
            }}
            value={description}
            handleChangeFields={value => setDescription(value)}
          />
          <FormGroups
            type="number"
            config={{
              label: 'Weight',
              placeholder: 'Give this checkpoint a weight...',
              min: 0,
            }}
            value={weight}
            handleChangeFields={value => setWeight(value)}
          />
          <FormGroups
            type="number"
            config={{
              label: 'Margin pass',
              placeholder: 'Minimum mark to pass this checkpoint',
              min: 0,
              max: 10,
              step: 0.01,
            }}
            value={marginPass}
            handleChangeFields={value => setMarginPass(value)}
          />
        </Form>
        <div
          style={{
            fontSize: '1.4rem',
            textAlign: 'center',
            borderBottom: '1.5px solid #eaedf2',
            paddingBottom: '1.5rem',
            marginTop: '2rem',
          }}
        >
          Mask columns
          <div
            style={{
              float: 'right',
              marginTop: '-0.25rem',
            }}
          >
            <span
              title="Remove"
              className="btn btn-icon btn-primary btn-hover-light btn-sm"
              onClick={addNewCol}
            >
              <i className="fas fa-plus mx-2"></i>
            </span>
          </div>
        </div>
        <BootstrapTable
          wrapperClasses="table-responsive"
          bordered={false}
          classes="table table-head-custom table-vertical-center overflow-hidden"
          bootstrap4
          remote
          keyField="id"
          data={cols && Array.isArray(cols) ? cols : []}
          columns={columns}
          noDataIndication={() => (
            <div style={{ textAlign: 'center' }} className="mt-5">
              No columns
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
        <Button
          type="submit"
          variant="primary"
          onClick={onUpdate}
          form="test-form"
          isLoading={isLoading}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCheckpoint;
