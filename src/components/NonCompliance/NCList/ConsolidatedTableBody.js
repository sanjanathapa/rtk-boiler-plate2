import React, { Children } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import {
  TableRow,
  TableCell,
  Typography,
  TableBody,
  styled,
  IconButton,
} from "@mui/material";
import { get } from "utils/lodash";
import { memo } from "utils/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import T from "T";
import { BACKGROUND, NETSMARTZ_THEME_COLOR, TEXT } from "theme/colors";
import { MISCurrentUser } from "utils/validations";
import { canDeleteNC } from "utils/permissions";
import { color } from "@mui/system";

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

const ConsolidatedTableBody = ({
  records = [],
  handleDeleteNCDialog =noop,
  handleByDateUserNCDialog =noop,
}) => {
  return (
    <TableBody>
      {Children.toArray(
        records.map((record, index) => {
          const ncStatusValue = get(record, "ncStatus", "");
          return (<> {ncStatusValue!==2 &&
                        <StyledTableRow sx={{ background: BACKGROUND.white }} key={index}>
                          <StyledTableCell>{get(record, "userName", "")}</StyledTableCell>
                          <StyledTableCell>{get(record, "empCode", "")}</StyledTableCell>
                          <StyledTableCell>{get(record, "reportingManager", "")}</StyledTableCell>
                          <StyledTableCell align="center">{get(record, "jiraNotFilled", "")}</StyledTableCell>
                          <StyledTableCell align="center">{get(record, "commentsMissing", "")}</StyledTableCell>
                          <StyledTableCell align="center">{get(record, "svnCheckIn", "-")}</StyledTableCell>
                          <StyledTableCell align="center">{get(record, "deletedNc", "")}</StyledTableCell>
                        </StyledTableRow>
                      }

                  </>
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

ConsolidatedTableBody.propTypes = {
  records: PropTypes.array,
  handleByDateUserNCDialog: PropTypes.func,
  handleDeleteNCDialog: PropTypes.func,
};

export default memo(ConsolidatedTableBody);
