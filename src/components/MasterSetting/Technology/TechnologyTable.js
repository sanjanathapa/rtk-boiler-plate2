import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
} from "@mui/material";

import { TECHNOLOGY_TABLE_HEADER } from "settings/constants/members";

import { PAGINATION } from "settings/constants/pagination";

import TechnologyTableBody from "./TechnologyTableBody";
import TableHeader from "../TableHeader";
import MasterPagination from "../MasterPagination";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const TechnologyTable = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  allTableRows = [],
  handleAddEditTechnologyInfoDialog = noop,
  handleDeleteTechnologyDialog = noop,
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
            <TableHeader columns={TECHNOLOGY_TABLE_HEADER} />
            <TechnologyTableBody
              records={allTableRows}
              handleAddEditTechnologyInfoDialog={
                handleAddEditTechnologyInfoDialog
              }
              handleDeleteTechnologyDialog={handleDeleteTechnologyDialog}
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

TechnologyTable.propTypes = {
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
export default TechnologyTable;
