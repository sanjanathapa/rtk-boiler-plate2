import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
} from "@mui/material";

import { DELETED_NC_TABLE_HEADER } from "settings/constants/members";

import { PAGINATION } from "settings/constants/pagination";

import TableHeader from "../TableHeader";
import MasterPagination from "../MasterPagination";
import DeletedNcListTableBody from "./DeletedNcListTableBody";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const DeletedNcListTable = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  allTableRows = [],
  deleteChecks = [],
  selectAllCheck = false,
  deleteChecksPayload = [],
  setDeleteChecksIntialData = noop,
  handleDeleteNCDialog = noop,
  handleByDateUserNCDialog = noop,
  handleDeleteCheckBoxChange = noop,
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
            <TableHeader columns={ DELETED_NC_TABLE_HEADER } selectAllCheck={selectAllCheck} handleDeleteCheckBoxChange={handleDeleteCheckBoxChange} />
            <DeletedNcListTableBody
              handleDeleteNCDialog={handleDeleteNCDialog}
              handleByDateUserNCDialog={handleByDateUserNCDialog}
              handleDeleteCheckBoxChange={handleDeleteCheckBoxChange}
              setDeleteChecksIntialData={setDeleteChecksIntialData}
              records={allTableRows}
              deleteChecks={deleteChecks}
              deleteChecksPayload={deleteChecksPayload}
            />
          </TableView>
        </TableContainer>
      </Box>

      {/* <MasterPagination
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        totalTableRowsCount={totalTableRowsCount}
        totalPageCount={totalPageCount}
      /> */}
    </Card>
  );
};

DeletedNcListTable.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  totalTableRowsCount: PropTypes.number,
  handleDeleteNCDialog: PropTypes.func,
  handleByDateUserNCDialog: PropTypes.func,
  handleDeleteCheckBoxChange: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  deleteChecks: PropTypes.array,
  selectAllCheck: PropTypes.bool,
  deleteChecksPayload: PropTypes.array,
};
export default DeletedNcListTable;
