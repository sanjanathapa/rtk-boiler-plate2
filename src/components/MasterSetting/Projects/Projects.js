import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";

import { PAGINATION } from "settings/constants/pagination";

import ProjectsTable from "./ProjectsTable";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const Projects = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  allTableRows = [],
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  handleAddEditProjectInfoDialog = noop,
  handleDeleteProjectDialog = noop,
}) => {
  return (
    <ProjectsTable
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      totalTableRowsCount={totalTableRowsCount}
      totalPageCount={totalPageCount}
      allTableRows={allTableRows}
      handleAddEditProjectInfoDialog={handleAddEditProjectInfoDialog}
      handleDeleteProjectDialog={handleDeleteProjectDialog}
    />
  );
};

Projects.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  handleAddEditProjectInfoDialog: PropTypes.func,
  handleDeleteProjectDialog: PropTypes.func,
};

export default Projects;
