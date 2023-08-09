import React, { Children } from "react";
import PropTypes from "prop-types";

import {
  TableRow,
  TableHead as THead,
  TableCell,
  Typography,
} from "@mui/material";
import { BACKGROUND } from "theme/colors";
import { memo } from "utils/react";

const TableHeader = ({ values = [] }) => {
  return (
    <THead>
      <TableRow>
        {Children.toArray(
          values &&
            values.map((val, index) => {
              return (
                <TableCell
                  sx={{
                    textAlign: index > 0 ? "center" : "",
                    backgroundColor: BACKGROUND.header,
                  }}
                >
                  <Typography fontSize={14} fontWeight={700}>
                    {val}
                  </Typography>
                </TableCell>
              );
            })
        )}
      </TableRow>
    </THead>
  );
};

TableHeader.propTypes = {
  values: PropTypes.array,
};

export default memo(TableHeader);
