import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
  Typography,
} from "@mui/material";

import { ACCOUNTS_TABLE_HEADER } from "settings/constants/members";


import { PAGINATION } from "settings/constants/pagination";
import TableHeader from "./TableHeader";
import AccountingProjectsTableBody from "./AccountingProjectsTableBody";

import T from "T";
import { NETSMARTZ_THEME_COLOR } from "theme/colors";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const AccountingProjectsTable = ({
  allTableRows = [],
  totalHrsLogged = "",
}) => {
  
  return (
    <Card
      elevation={0}
      sx={{
        // p: "0px 8px",
        mt: 1.5,
      }}
    >
      <Box overflow="hidden">
        <TableContainer
          component={Paper}
          sx={{ height: "calc(100vh - 290px)", overflowY: "auto" }}
        >
          <TableView stickyHeader>
            <TableHeader columns={ACCOUNTS_TABLE_HEADER} />
            <AccountingProjectsTableBody
              allTableRows={allTableRows}
            />
          </TableView>
        </TableContainer>
      </Box>
      {
        allTableRows && allTableRows.length !== 0 &&
        <Box sx={{display:"flex", justifyContent:"flex-end"}}>
          <Typography fontWeight={600} color={NETSMARTZ_THEME_COLOR}>{`${T.TOTAL_TIME_LOGGED} :`} </Typography>
          <Typography fontWeight={600} ml={2} mr={1}>{` ${totalHrsLogged} Hrs`}</Typography>
        </Box>
      }

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

AccountingProjectsTable.propTypes = {
  totalHrsLogged: PropTypes.string,
  allTableRows: PropTypes.array,
};
export default AccountingProjectsTable;
