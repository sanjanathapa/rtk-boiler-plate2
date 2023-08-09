import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
} from "@mui/material";

import { PROJECTS_TABLE_HEADER } from "settings/constants/members";
import { PAGINATION } from "settings/constants/pagination";

import ProjectsTableBody from "./ProjectsTableBody";
import TableHeader from "../TableHeader";
import MasterPagination from "../MasterPagination";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const ProjectsTable = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  allTableRows = [],
  handleAddEditProjectInfoDialog = noop,
  handleDeleteProjectDialog = noop,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        p: "0px 8px",
        mt: 1.5,
      }}
    >
      <Box overflow="hidden">
        <TableContainer
          component={Paper}
          sx={{ height: "calc(100vh - 290px)", overflowY: "auto" }}
        >
          <TableView stickyHeader>
            <TableHeader columns={PROJECTS_TABLE_HEADER} />
            <ProjectsTableBody
              page={page}
              onPageChange={page}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={onRowsPerPageChange}
              totalTableRowsCount={totalTableRowsCount}
              totalPageCount={totalPageCount}
              allTableRows={allTableRows}
              handleAddEditProjectInfoDialog={handleAddEditProjectInfoDialog}
              handleDeleteProjectDialog={handleDeleteProjectDialog}
            />
          </TableView>
        </TableContainer>
      </Box>

      <MasterPagination
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        totalTableRowsCount={totalTableRowsCount}
        totalPageCount={totalPageCount}
      />
    </Card>
  );
};

ProjectsTable.propTypes = {
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
export default ProjectsTable;
