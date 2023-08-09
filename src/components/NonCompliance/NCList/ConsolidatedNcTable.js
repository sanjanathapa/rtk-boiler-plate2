import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
} from "@mui/material";

import {  CONSOLIDATED_NC_TABLE_HEADER } from "settings/constants/members";

import { PAGINATION } from "settings/constants/pagination";

import TableHeader from "../TableHeader";
import MasterPagination from "../MasterPagination";
import { MISCurrentUser } from "utils/validations";
import { get } from "lodash";
import ConsolidatedTableBody from "./ConsolidatedTableBody";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const ConsolidatedNcTable = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  allTableRows = [],
  handleDeleteNCDialog = noop,
  handleByDateUserNCDialog = noop,
}) => {
  
  return (
    <Card
      elevation={0}
      sx={{
        p: "0px 8px 0px 0px",
        mt: 1.5,
      }}
    >
      <Box overflow="hidden">
        <TableContainer
          component={Paper}
          sx={{ height: "calc(100vh - 290px)", width:"inherit", overflowY: "auto" }}
        >
          <TableView stickyHeader>
            <TableHeader columns={ CONSOLIDATED_NC_TABLE_HEADER } />
            <ConsolidatedTableBody
              handleDeleteNCDialog={handleDeleteNCDialog}
              handleByDateUserNCDialog={handleByDateUserNCDialog}
              records={allTableRows}
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

ConsolidatedNcTable.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  totalTableRowsCount: PropTypes.number,
  handleDeleteNCDialog: PropTypes.func,
  handleByDateUserNCDialog: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
};
export default ConsolidatedNcTable;
