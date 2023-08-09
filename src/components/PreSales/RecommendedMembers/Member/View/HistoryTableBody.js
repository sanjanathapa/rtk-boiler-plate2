import React, { Children } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  Box,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  styled,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

import T from "T";

import { get } from "utils/lodash";
import { memo } from "utils/react";
import { getFEDateFormat } from "utils/members";

const StyledTableCell = styled(TableCell)(() => ({
  borderTop: "inherit",
  borderBottom: "none",
  overflow: "hidden",
  padding: "10px 24px",
  fontSize: 14,
  textAlign: "center",
}));

const HistoryTableBody = ({ records = [], handleAddFeedback = noop }) => {
  return (
    <TableBody>
      {Children.toArray(
        records.map((record, index) => {
          return (
            <TableRow sx={{ background: BACKGROUND.white }}>
              <StyledTableCell>{index + 1}.</StyledTableCell>
              <StyledTableCell>
                {get(record, "projectName", "")}
              </StyledTableCell>
              <StyledTableCell>
                {getFEDateFormat(get(record, "startDate", null))}
              </StyledTableCell>
              <StyledTableCell>
                {getFEDateFormat(get(record, "endDate", null))}
              </StyledTableCell>
              <StyledTableCell>
                {get(record, "projectManager", "")}
              </StyledTableCell>
              <StyledTableCell>
                {get(record, "functionalManager", "")}
              </StyledTableCell>
              <StyledTableCell>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  letterSpacing={10}
                >
                  <Typography variant="subtitle1">
                    {get(record, "projectFeedbacks", []).length}
                  </Typography>
                  <AddCircleOutlineIcon
                    fontSize="small"
                    onClick={(event) => {
                      event.preventDefault();
                      handleAddFeedback(get(record, "empProjectId", ""));
                    }}
                    sx={{
                      mr: 1,
                      cursor: "pointer",
                      color: NETSMARTZ_THEME_COLOR,
                    }}
                  />
                </Box>
              </StyledTableCell>
            </TableRow>
          );
        })
      )}

      {records && records.length === 0 && (
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

HistoryTableBody.propTypes = {
  records: PropTypes.array,
  handleAddFeedback: PropTypes.func,
};

export default memo(HistoryTableBody);
