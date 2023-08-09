import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  Table as TableView,
  Paper,
  TableContainer,
  Box,
  Card,
} from "@mui/material";

import { PRE_SALES_TABLE_HEADER, PROJECTS_TABLE_HEADER } from "settings/constants/members";
import { PAGINATION } from "settings/constants/pagination";


import TableHeader from "./TableHeader";
import PreSalesTableBody from "./PreSalesTableBody";
import MasterPagination from "components/MasterSetting/MasterPagination";
import { get, orderBy } from "lodash";
import T from "T";
import { FRONTEND_DATE_FORMAT } from "settings/constants/date";
import { format } from "date-fns";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const PreSalesTable = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
  allTableRows = [],
  // handleDaysSorting = noop,
  handleJdDialog = noop,
  handleDeleteProjectDialog = noop,
}) => {
  const [daysSorting,setDaysSorting]=useState(false);
  const [assignSorting,setAssignSorting]=useState(false);
  const [leadDateSorting,setLeadDateSorting]=useState(false);
 
const getDateFormatted = (val) => {
  if (val) return val.split(" ")[0];
  return "";
};
  const handleDaysSorting =(sortLabel)=>{
    if(sortLabel===T.DAYS_IN_OPERATION.toUpperCase())
    {
      setDaysSorting(!daysSorting)
    }
    else if(sortLabel===T.ASSIGNED_TO.toUpperCase())
    {
      setAssignSorting(!assignSorting)
    }
    else if(sortLabel===T.LEAD_DATE.toUpperCase())
    {
      setLeadDateSorting(!leadDateSorting)
    }
  }
  const rendredTableRows = 
  daysSorting?orderBy(allTableRows,["daysOfOperation"],["desc"])
  :assignSorting?orderBy(allTableRows,["projectManager.name"],["asc"]):
  leadDateSorting?orderBy(allTableRows,[(o) => new Date(getDateFormatted(o.startDate))],["asc"]):allTableRows;
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
      // elevation={0}
      // sx={{
      //   p: "0px 13px",
      //   mt: 1.5,
      // }}
    >
      <Box overflow="hidden">
        <TableContainer
          // component={Paper}
          sx={{
            maxHeight: "calc(100vh - 315px)",
            overflow: "scroll",
          }}
          // sx={{ height: "calc(100vh - 290px)", overflowY: "auto" }}
        >
          <TableView stickyHeader sx={{ borderSpacing: "0 8px" }}>
            <TableHeader 
              columns={PRE_SALES_TABLE_HEADER}
              handleDaysSorting={handleDaysSorting}
              daysSorting={daysSorting}
              assignSorting={assignSorting}
              leadDateSorting={leadDateSorting}
             />
            <PreSalesTableBody
              page={page}
              onPageChange={page}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={onRowsPerPageChange}
              totalTableRowsCount={totalTableRowsCount}
              totalPageCount={totalPageCount}
              allTableRows={rendredTableRows}
              handleJdDialog={handleJdDialog}
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

PreSalesTable.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  // handleDaysSorting: PropTypes.func,
  handleJdDialog: PropTypes.func,
  handleDeleteProjectDialog: PropTypes.func,
};
export default PreSalesTable;
