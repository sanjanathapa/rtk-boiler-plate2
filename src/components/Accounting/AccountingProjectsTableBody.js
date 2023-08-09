import React, { Children } from "react";
import PropTypes from "prop-types";

import {
  TableRow,
  TableCell,
  Typography,
  TableBody,
  styled,
} from "@mui/material";

import { BACKGROUND} from "theme/colors";
import { get } from "utils/lodash";
import { memo } from "utils/react";

import T from "T";

import { PAGINATION } from "settings/constants/pagination";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const StyledTableCell = styled(TableCell)(({theme}) => ({
  borderTop: "inherit",
  overflow: "hidden",
  padding: "8px 0px 8px 10px",
  ...theme.typography.subtitle1,
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: BACKGROUND.white,
  },
  "&:nth-of-type(even)": {
    backgroundColor: BACKGROUND.cardDefault,
  },
}));

const AccountingProjectsTableBody = ({
  allTableRows = [],
  
}) => {
  return (
    <TableBody>
      {Children.toArray(
        allTableRows.map((record, index) => {
          return (
            <StyledTableRow sx={{ background: BACKGROUND.white }} key={index}>
              <StyledTableCell>{index + 1}.</StyledTableCell>
              <StyledTableCell>{get(record, "userName", "")}</StyledTableCell>
              <StyledTableCell>{get(record, "projectManager", "")}</StyledTableCell>
              <StyledTableCell>{get(record, "functionalHead", "")}</StyledTableCell>
              <StyledTableCell>{get(record, "hoursSpent", "")}</StyledTableCell>
            </StyledTableRow>
          );
        })
      )}

      {allTableRows && allTableRows.length === 0 && (
        <TableRow>
          <StyledTableCell colSpan="10%" sx={{ border: "none" }}>
            <Typography variant="body1" textAlign="center">
              {T.NO_RECORDS}
            </Typography>
          </StyledTableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

AccountingProjectsTableBody.propTypes = {
  allTableRows: PropTypes.array,
};

export default memo(AccountingProjectsTableBody);
