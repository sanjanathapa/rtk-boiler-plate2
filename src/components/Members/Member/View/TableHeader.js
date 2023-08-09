import React, { Children } from "react";
import PropTypes from "prop-types";

import { TableRow, TableHead, TableCell, Typography } from "@mui/material";

import { memo } from "utils/react";

import { BACKGROUND } from "theme/colors";

const TableHeader = ({ columns = [], lockedColumns = [] }) => {
  return (
    <TableHead>
      <TableRow>
        {Children.toArray(
          columns.map((column, ind) => {
            return (
              <TableCell
                sx={{
                  border: "none",
                  backgroundColor: BACKGROUND.cardDefault,
                  padding: "10px 24px",
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" noWrap fontWeight={600}>
                  {column}
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
