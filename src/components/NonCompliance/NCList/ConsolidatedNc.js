import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

import { PAGINATION } from "settings/constants/pagination";
import ConsolidatedNcTable from "./ConsolidatedNcTable";



const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const ConsolidatedNc = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  allTableRows = [],
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  handleByDateUserNCDialog = noop,
  handleDeleteNCDialog = noop,
}) => {
  return (
    <ConsolidatedNcTable
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      totalTableRowsCount={totalTableRowsCount}
      totalPageCount={totalPageCount}
      allTableRows={allTableRows}
      handleDeleteNCDialog={handleDeleteNCDialog}
      handleByDateUserNCDialog={handleByDateUserNCDialog}
      
    />
  );
};

ConsolidatedNc.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  handleByDateUserNCDialog: PropTypes.func,
  handleDeleteNCDialog: PropTypes.func,
  
};

export default ConsolidatedNc;
