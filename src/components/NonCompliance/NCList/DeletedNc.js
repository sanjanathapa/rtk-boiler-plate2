import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

import { PAGINATION } from "settings/constants/pagination";
import DeletedNcListTable from "./DeletedNcTable";



const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const DeletedNc = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  allTableRows = [],
  deleteChecks = [],
  selectAllCheck = false,
  deleteChecksPayload = [],
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  handleByDateUserNCDialog = noop,
  setDeleteChecksIntialData = noop,
  handleDeleteNCDialog = noop,
  handleDeleteCheckBoxChange = noop,
}) => {
  return (
    <DeletedNcListTable
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      totalTableRowsCount={totalTableRowsCount}
      totalPageCount={totalPageCount}
      allTableRows={allTableRows}
      selectAllCheck={selectAllCheck}
      deleteChecks={deleteChecks}
      deleteChecksPayload={deleteChecksPayload}
      handleDeleteNCDialog={handleDeleteNCDialog}
      setDeleteChecksIntialData={setDeleteChecksIntialData}
      handleByDateUserNCDialog={handleByDateUserNCDialog}
      handleDeleteCheckBoxChange={handleDeleteCheckBoxChange}
      
    />
  );
};

DeletedNc.propTypes = {
  page: PropTypes.number,
  deleteChecks: PropTypes.array,
  deleteChecksPayload: PropTypes.array,
  selectAllCheck: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  handleByDateUserNCDialog: PropTypes.func,
  handleDeleteNCDialog: PropTypes.func,
  handleDeleteCheckBoxChange: PropTypes.func,
  
};

export default DeletedNc;
