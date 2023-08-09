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
import { get } from "utils/lodash";
import { memo } from "utils/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import T from "T";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

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

const TechnologyTableBody = ({
  records = [],
  handleAddEditTechnologyInfoDialog = noop,
  handleDeleteTechnologyDialog = noop,
}) => {
  return (
    <TableBody>
      {Children.toArray(
        records.map((record, index) => {
          return (
            <StyledTableRow sx={{ background: BACKGROUND.white }} key={index}>
              <StyledTableCell>{index + 1}.</StyledTableCell>
              <StyledTableCell>{get(record, "skillName", "")}</StyledTableCell>
              <StyledTableCell align="center">
                <EditIcon
                  onClick={() => {
                    handleAddEditTechnologyInfoDialog(get(record, "id", ""));
                  }}
                  sx={{
                    mr: 1,
                    height: 17,
                    cursor: "pointer",
                    color: NETSMARTZ_THEME_COLOR,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteIcon
                  fontSize="small"
                  onClick={() => {
                    handleDeleteTechnologyDialog(get(record, "id", ""));
                  }}
                  sx={{
                    mr: 1,
                    height: 18,
                    cursor: "pointer",
                    color: NETSMARTZ_THEME_COLOR,
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
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

TechnologyTableBody.propTypes = {
  records: PropTypes.array,
  handleAddEditTechnologyInfoDialog: PropTypes.func,
  handleDeleteTechnologyDialog: PropTypes.func,
};

export default memo(TechnologyTableBody);
