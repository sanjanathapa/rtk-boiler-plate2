import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {noop, orderBy} from "lodash";

import {
  Box,
  Grid,
  Card,
  Table as TableView,
  TableContainer,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { PAGINATION } from "settings/constants/pagination";

import TableHeader from "./TableHeader";
import MISTableBody from "./TableBody";
import TablePagination from "components/common/MISTablePagination";
import Pagination from "components/common/MISPagination";

import "./index.scss";

const { INITIAL_PAGE, ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } = PAGINATION;

const Table = ({
  columns = [],
  // storedScrollPosition = 0,
  lockedColumns = [],
  // tableData ={},
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  allTableRows,
  refreshMemberTable = noop,
  handleScroll = noop,
}) => {
  
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("md"));
  // const tableRef = useRef(null);
  // useEffect(()=>{
  //     if(storedScrollPosition && tableData)
  //     {
  //         tableRef.current.scrollTop = storedScrollPosition;
  //     }
    
  // },[storedScrollPosition,tableData]);
  return (
    <Card
      elevation={0}
      sx={{
        p: "0px 8px",
        mt: 1.5,
        backgroundColor: "background.card",
        "& .add-shadow": {
          boxShadow: "inset -6px 0px 5px -5px rgb(0 0 0 / 15%)",
        },
      }}
    >
      <Box overflow="hidden">
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 260px)",
            overflow: "scroll",
          }}
          // ref={tableRef}
          // onScroll = {handleScroll}
        >
          <TableView stickyHeader sx={{ borderSpacing: "0 8px" }}>
            <TableHeader columns={columns} lockedColumns={lockedColumns} />
            <MISTableBody
              columns={columns}
              lockedColumns={lockedColumns}
              //records={orderBy(allTableRows, ["userName"], ["asc"])}
              records={allTableRows}
              refreshMemberTable={refreshMemberTable}
            />
          </TableView>
        </TableContainer>
      </Box>

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs container justifyContent="flex-start">
          <TablePagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            component="div"
            count={totalTableRowsCount || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => onPageChange(newPage)}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </Grid>
        {isLg && (
          <Grid item xs container justifyContent="flex-end">
            <Pagination
              count={totalPageCount || 0}
              page={page + 1}
              onChange={(event, newPage) => onPageChange(newPage - 1)}
              shape="rounded"
            />
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  lockedColumns: PropTypes.array,
  page: PropTypes.number,
  storedScrollPosition: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  tableData: PropTypes.object,
  refreshMemberTable: PropTypes.func,
  handleScroll: PropTypes.func,
};

export default Table;
