import React, { Children } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  TableRow,
  TableCell,
  Typography,
  TableBody,
  styled,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";
import {
  canDeleteMasterSettings,
  canEditMasterSettings,
} from "utils/permissions";
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

const ProjectsTableBody = ({
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
    <TableBody>
      {Children.toArray(
        allTableRows.map((record, index) => {
          return (
            <StyledTableRow sx={{ background: BACKGROUND.white }} key={index}>
              <StyledTableCell>{index + 1}.</StyledTableCell>
              <StyledTableCell>{get(record, "name", "")}</StyledTableCell>
              <StyledTableCell>{get(record, "startDate", "")}</StyledTableCell>
              <StyledTableCell>{get(record, "endDate", "")}</StyledTableCell>
              <StyledTableCell>
                {get(record, "projectManager.name", "")}
              </StyledTableCell>
              <StyledTableCell>
                {get(record, "projectFunctionalHead.name", "")}
              </StyledTableCell>
              <StyledTableCell align="center">
                {canEditMasterSettings() ? (
                  <EditIcon
                    onClick={() => {
                      handleAddEditProjectInfoDialog(get(record, "id", ""));
                    }}
                    sx={{
                      mr: 1,
                      height: 17,
                      cursor: "pointer",
                      color: NETSMARTZ_THEME_COLOR,
                    }}
                  />
                ) : (
                  T.NA
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {canDeleteMasterSettings() ? (
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => {
                      handleDeleteProjectDialog(get(record, "id", ""));
                    }}
                    sx={{
                      mr: 1,
                      height: 18,
                      cursor: "pointer",
                      color: NETSMARTZ_THEME_COLOR,
                    }}
                  />
                ) : (
                  T.NA
                )}
              </StyledTableCell>
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

ProjectsTableBody.propTypes = {
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

export default memo(ProjectsTableBody);
