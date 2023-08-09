import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

import { PAGINATION } from "settings/constants/pagination";
import PreSalesTable from "./PresSalesTable";


const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const PreSalesTab = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  allTableRows = [],
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  handleDaysSorting = noop,
  handleJdDialog = noop,
  handleDeleteProjectDialog = noop,
}) => {
  return (
    <PreSalesTable
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      totalTableRowsCount={totalTableRowsCount}
      totalPageCount={totalPageCount}
      allTableRows={allTableRows}
      handleJdDialog={handleJdDialog}
      handleDaysSorting={handleDaysSorting}
      handleDeleteProjectDialog={handleDeleteProjectDialog}
    />
  );
};

PreSalesTab.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  handleDaysSorting: PropTypes.func,
  handleJdDialog: PropTypes.func,
  handleDeleteProjectDialog: PropTypes.func,
};

export default PreSalesTab;
