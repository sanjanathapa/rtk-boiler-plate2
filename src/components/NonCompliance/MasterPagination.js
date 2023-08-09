import React from "react";
import PropTypes from "prop-types";

import { Grid, useMediaQuery, useTheme } from "@mui/material";

import TablePagination from "components/common/MISTablePagination";
import Pagination from "components/common/MISPagination";

import { PAGINATION } from "settings/constants/pagination";

const { INITIAL_PAGE, ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } = PAGINATION;

const MasterPagination = ({
  page = INITIAL_PAGE,
  onPageChange,
  rowsPerPage = ROWS_PER_PAGE,
  onRowsPerPageChange,
  totalTableRowsCount = INITIAL_PAGE,
  totalPageCount = INITIAL_PAGE,
}) => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ backgroundColor: "background.card", pl: 1, pr: 1 }}
    >
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
  );
};

MasterPagination.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};
export default MasterPagination;
