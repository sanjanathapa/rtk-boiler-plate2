import React, { Children } from "react";
import PropTypes from "prop-types";
import { TableRow, TableHead, TableCell, Typography } from "@mui/material";

import { memo } from "utils/react";
import { get } from "utils/lodash";
import { BACKGROUND } from "theme/colors";

const TableHeader = ({ columns = [] }) => {
  return (
    <TableHead>
      <TableRow>
        {Children.toArray(
          columns.map((column, index) => {
            return (
              <TableCell
                align={get(column, "align", "")}
                sx={{
                  border: "none",
                  backgroundColor: BACKGROUND.cardDefault,
                  padding: 1,
                }}
              >
                <Typography
                  variant="body1"
                  fontSize={14}
                  noWrap
                  fontWeight={600}
                >
                  {column.label}
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
};

export default memo(TableHeader);
