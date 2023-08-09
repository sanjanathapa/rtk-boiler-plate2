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

import DeleteIcon from "@mui/icons-material/Delete";

import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

import T from "T";

import { get } from "utils/lodash";
import { memo } from "utils/react";
import { MONTH_LIST } from "../memberModel";

const StyledTableCell = styled(TableCell)(() => ({
  borderTop: "inherit",
  borderBottom: "none",
  overflow: "hidden",
  padding: "10px 24px",
  fontSize: 14,
  textAlign: "center",
}));

const NCTableBody = ({
  records = [],
  refreshMemberTable = noop,
  handleActiveNcCountDialog = noop,
  handleDeleteNcCountDialog = noop,
}) => {
  
  return (
    <TableBody>
      {Children.toArray(
        records.map((record) => {
          const ncMonth=MONTH_LIST[(get(record,"ncMonth","")-1)];
          const ncMonthCount =MONTH_LIST.indexOf(ncMonth)+1;
          const typeOfNc= get(record,"typeOfNc","");
          return (
            <TableRow sx={{ background: BACKGROUND.white }}>
              <StyledTableCell>{ncMonth}</StyledTableCell>
              <StyledTableCell>{typeOfNc}</StyledTableCell>
              <StyledTableCell sx={{color:NETSMARTZ_THEME_COLOR,cursor:"pointer"}} onClick={()=>handleActiveNcCountDialog(ncMonthCount,typeOfNc)}>
                {get(record,"ncCount","")}
                </StyledTableCell>
                <StyledTableCell sx={{color:NETSMARTZ_THEME_COLOR,cursor:"pointer"}} onClick={()=>handleDeleteNcCountDialog(ncMonthCount,typeOfNc)}>
                {get(record,"deletedNcCount","")}
              </StyledTableCell>
            </TableRow>
          );
        })
      )}

      {records && records.length === 0 && (
        <TableRow>
          <StyledTableCell colSpan="10%" sx={{ border: "none" }}>
            <Typography variant="body1" textAlign="center">
              {T.NC_COMING_SOON}
            </Typography>
          </StyledTableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

NCTableBody.propTypes = {
  records: PropTypes.array,
  refreshMemberTable: PropTypes.func,
  handleActiveNcCountDialog: PropTypes.func,
  handleDeleteNcCountDialog: PropTypes.func,
};

export default memo(NCTableBody);
