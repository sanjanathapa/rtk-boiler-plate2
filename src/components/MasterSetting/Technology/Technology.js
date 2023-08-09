import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

import { PAGINATION } from "settings/constants/pagination";

import TechnologyTable from "./TechnologyTable";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const Technology = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  allTableRows = [],
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  handleAddEditTechnologyInfoDialog = noop,
  handleDeleteTechnologyDialog = noop,
}) => {
  return (
    <TechnologyTable
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      totalTableRowsCount={totalTableRowsCount}
      totalPageCount={totalPageCount}
      allTableRows={allTableRows}
      handleAddEditTechnologyInfoDialog={handleAddEditTechnologyInfoDialog}
      handleDeleteTechnologyDialog={handleDeleteTechnologyDialog}
    />
  );
};

Technology.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  handleAddEditTechnologyInfoDialog: PropTypes.func,
  handleDeleteTechnologyDialog: PropTypes.func,
};

export default Technology;
