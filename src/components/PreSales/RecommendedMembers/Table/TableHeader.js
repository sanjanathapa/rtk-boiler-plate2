import React, { Children } from "react";
import PropTypes from "prop-types";

import { TableRow, TableHead, TableCell, Typography } from "@mui/material";

import { memo } from "utils/react";
import { get } from "utils/lodash";
import { handleHeaderClass } from "utils/members";
import { BACKGROUND } from "theme/colors";

const TableHeader = ({ columns = [], lockedColumns = [] }) => {
  return (
    <TableHead>
      <TableRow sx={{ height: 30 }}>
        {/* <TableCell
          className="sticky-col"
          sx={{
            border: "none",
            backgroundColor: BACKGROUND.header,
            padding: "0px 8px 8px",
          }}
        /> */}
        {Children.toArray(
          columns.map((column, ind) => {
            const isLocked = get(column, "locked", false);
            const columnName = get(column, "label", "").toUpperCase();
            return (
              <TableCell
                sx={{
                  border: "none",
                  backgroundColor: BACKGROUND.header,
                  padding: "0px 8px 0px 24px",
                }}
                className={handleHeaderClass(ind, isLocked, lockedColumns)}
              >
                <Typography
                    variant="body1"
                    fontSize={14}
                    noWrap
                    fontWeight={600}
                >
                  {columnName}
                </Typography>
              </TableCell>
            );
          })
        )}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.array,
  locked_columns: PropTypes.array,
};

export default memo(TableHeader);
