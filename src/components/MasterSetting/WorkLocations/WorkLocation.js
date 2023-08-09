import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

import { PAGINATION } from "settings/constants/pagination";
import WorkLocationTable from "./WorkLocationTable";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const WorkLocation = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  allTableRows = [],
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  handleAddEditWorkLocationInfoDialog = noop,
  handleDeleteWorkLocationDialog = noop,
}) => {
  return (
    <WorkLocationTable
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      totalTableRowsCount={totalTableRowsCount}
      totalPageCount={totalPageCount}
      allTableRows={allTableRows}
      handleAddEditWorkLocationInfoDialog={handleAddEditWorkLocationInfoDialog}
      handleDeleteWorkLocationDialog={handleDeleteWorkLocationDialog}
    />
  );
};

WorkLocation.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  handleAddEditWorkLocationInfoDialog: PropTypes.func,
  handleDeleteWorkLocationDialog: PropTypes.func,
};

export default WorkLocation;
