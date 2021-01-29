import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import Table from 'components/Table';
import Filters from './Filters';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Import from './import';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import useConfirm from 'utils/confirm';

import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/semester/activeStudent/transformers';
import * as constants from 'modules/semester/activeStudent/constants';
import AddActiveStudentModal from './AddActiveStudentModal';
import { Modal } from 'react-bootstrap';
import Button from 'components/Button';
import SelectBox from 'components/SelectBox/SelectBox';

export const statusClasses = ['danger', 'info', 'success', ''];
export const statusTitles = ['Not in a team', 'Assigning', 'Assigned', ''];

export default function ActiveStudents({ semester }) {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);
  const { id: semId } = useParams();

  const [l, loadData] = React.useReducer(() => ({}), {});

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [debouncedFilters] = useDebounce(filters, 500);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(
    constants.sizePerPageList[0].value
  );
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);

  //----------------------------------------------------------------------------

  const [showCreate, setShowCreate] = React.useState(false);

  // ---------------------------------------------------------------------------

  const fileRef = React.useRef(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleClickFile = React.useCallback(e => {
    e.preventDefault();
    fileRef.current.click();
  }, []);

  const handleFileChange = React.useCallback(
    event => {
      event.preventDefault();
      event.persist();
      const data = new FormData();
      data.append(
        'file',
        event.currentTarget.files[0],
        event.currentTarget.files[0].name
      );
      setIsUploading(true);
      request({
        to: endpoints.IMPORT_ACTIVE_STUDENTS(semId).url,
        method: endpoints.IMPORT_ACTIVE_STUDENTS(semId).method,
        data: data,
      })
        .then(res => {
          // toast.success('Import student successfully');
          setImportResult(res.data?.message);
          setIsShowImport(true);
          loadData();
        })
        .catch(handleErrors)
        .finally(() => {
          setIsUploading(false);
          event.target.value = '';
        });
    },
    [semId]
  );

  // ---------------------------------------------------------------------------

  const showCreateModal = React.useCallback(() => {
    if (semester.status === 3) {
      toast.warn('Semester is finished, cannot make any further changes.');
      return;
    }
    setShowCreate(true);
  }, [semester.status]);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, []);

  const handleCreate = React.useCallback(
    fieldData => {
      return request({
        to: endpoints.CREATE_ACTIVE_STUDENTS(semId).url,
        method: endpoints.CREATE_ACTIVE_STUDENTS(semId).method,
        data: transformers.cUp(fieldData),
      })
        .then(res => {
          toast.success('Add active students successfully');
          setShowCreate(false);
          loadData();
        })
        .catch(handleErrors);
    },
    [semId]
  );

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      if (semester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      const id = Number(e.currentTarget.getAttribute('data-id'));
      if (!Number.isInteger(id)) {
        toast.error('Internal Server Error');
        return;
      }
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove this student?
            <br />
            This student will be <b>permanently removed from this semester</b>.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_ACTIVE_STUDENTS(semId).url,
            method: endpoints.DELETE_ACTIVE_STUDENTS(semId).method,
            data: {
              studentIDs: [id],
            },
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove active student');
            })
            .catch(handleErrors),
      });
    },
    [confirm, semId, semester.status]
  );

  // const handleRemoveAllSelected = React.useCallback(
  //   e => {
  //     e.preventDefault();
  //     const id = Number(e.currentTarget.getAttribute('data-id'));
  //     if (!Number.isInteger(id)) {
  //       toast.error('Internal Server Error');
  //       return;
  //     }
  //     confirm({
  //       title: 'Removal Confirmation',
  //       body: (
  //         <>
  //           Do you wanna remove all selected students?
  //           <br />
  //           All students will be <b>permanently removed from this semester</b>.
  //         </>
  //       ),
  //       onConfirm: () =>
  //         request({
  //           to: endpoints.DELETE_ACTIVE_STUDENTS(semId).url,
  //           method: endpoints.DELETE_ACTIVE_STUDENTS(semId).method,
  //           data: {
  //             studentIDs: selected,
  //           },
  //         })
  //           .then(res => {
  //             loadData();
  //             toast.success('Successfully remove active student');
  //           })
  //           .catch(handleErrors),
  //     });
  //   },
  //   [confirm, selected, semId]
  // );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(
    () => constants.createColumns({ handleRemove }),
    [handleRemove]
  );

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};
    request({
      to: endpoints.LIST_ACTIVE_STUDENTS(semId).url,
      method: endpoints.LIST_ACTIVE_STUDENTS(semId).method,
      params: {
        ...debouncedFilters,
        pageNumber: page,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
      },
      source,
    })
      .then(res => {
        setData(res.data?.data?.map(transformers.down));
        setTotal(res.data?.totalRecords);
        setPage(res.data?.pageNumber);
        setPageSize(res.data?.pageSize);
        setIsLoading(false);
      })
      .catch(err => {
        handleErrors(err);
        if (!err.isCancel) setIsLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder, semId]);
  // ---------------------------------------------------------------------------

  const [isShowImport, setIsShowImport] = React.useState(false);
  const [importResult, setImportResult] = React.useState('');
  const hideImport = React.useCallback(() => setIsShowImport(false), []);

  const [isShowExportPrompt, setIsShowExportPrompt] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportMethod, setExportMethod] = React.useState(1);

  const handleChangeExportMethod = React.useCallback(value => {
    setExportMethod(value);
  }, []);

  // ---------------------------------------------------------------------------

  const handleExport = React.useCallback(() => {
    setIsExporting(true);
    request({
      to: endpoints.EXPORT_ACTIVE_STUDENTS(semId).url,
      method: endpoints.EXPORT_ACTIVE_STUDENTS(semId).method,
      params: {
        ...debouncedFilters,
        pageNumber: Number(exportMethod) === 2 ? page : undefined,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
      },
    })
      .then(res => {
        saveAs(
          res.data,
          res.headers['content-disposition']
            ?.split(';')[1]
            ?.split('=')[1]
            ?.split('"')[1]
        );
      })
      .catch(handleErrors)
      .finally(() => {
        setIsExporting(false);
      });
  }, [
    debouncedFilters,
    exportMethod,
    page,
    pageSize,
    semId,
    sortField,
    sortOrder,
  ]);

  const showExportPrompt = React.useCallback(() => {
    setIsShowExportPrompt(true);
  }, []);

  const hideExportPrompt = React.useCallback(() => {
    setIsShowExportPrompt(false);
  }, []);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Active students of ' + semester.name,
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: semester.name, path: '/semester/' + semId },
        {
          title: 'Active student',
          path: '/semester/' + semId + '/active-student',
        },
      ],
    }));
  }, [semId, semester.name, setMeta]);

  return (
    <Card>
      <CardHeader title="All active students">
        <CardHeaderToolbar className="text-nowrap">
          {/* <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleRemoveAllSelected}
          >
            <i className="fas fa-trash mr-2"></i>
            Remove ({(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp; */}
          <Button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={showExportPrompt}
          >
            <i className="fas fa-file-export mr-2"></i>
            Export
          </Button>
          &nbsp;
          <Button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={handleClickFile}
            isLoading={isUploading}
          >
            <i className="fas fa-file-import mr-2"></i>
            Import
          </Button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={showCreateModal}
          >
            <i className="fas fa-plus mr-2"></i>
            Add
          </button>
          <input
            ref={fileRef}
            type="file"
            onChange={handleFileChange}
            className="d-none"
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Filters filters={filters} setFilters={setFilters} />
        <Table
          columns={columns}
          data={data}
          total={total}
          isLoading={isLoading}
          selected={selected}
          setSelected={setSelected}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          defaultSorted={constants.defaultSorted}
          pageSizeList={constants.sizePerPageList}
        />
      </CardBody>
      <AddActiveStudentModal
        isShowFlg={showCreate}
        onHide={hideCreateModal}
        onAdd={handleCreate}
      />
      <Import
        isShowFlg={isShowImport}
        onHide={hideImport}
        result={importResult}
      />
      <Modal
        size="xs"
        show={isShowExportPrompt}
        aria-labelledby="example-modal-sizes-title-lg"
        onHide={hideExportPrompt}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Select export method
            <small className="form-text text-muted">
              Select the method you want to export
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectBox
            onChange={handleChangeExportMethod}
            options={[
              { label: 'All', value: 1 },
              { label: 'This page', value: 2 },
            ]}
            value={exportMethod}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideExportPrompt}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            isLoading={isExporting}
          >
            Export
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
