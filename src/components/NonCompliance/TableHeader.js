import React, { Children } from "react";
import PropTypes from "prop-types";
import { TableRow, TableHead, TableCell, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

import { memo } from "utils/react";
import { get } from "utils/lodash";
import { BACKGROUND } from "theme/colors";
import T from "T";
import { CheckBox } from "@mui/icons-material";
import { Box } from "@mui/system";
import { noop } from "lodash";

const TableHeader = ({ columns = [] , selectAllCheck=false, handleDeleteCheckBoxChange = noop}) => {
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
                {
                  column.label===T.SELECT_ALL ?
                  <Box sx={{display:"block",justifyContent:"center"}}>
                          <FormGroup >
                              <FormControlLabel
                                sx={{ml:"18px"}}
                                control={
                                  <Checkbox checked={selectAllCheck} onChange={handleDeleteCheckBoxChange} name={T.SELECT_ALL} />
                                }
                                // label={T.SELECT_ALL}
                                // labelPlacement="bottom"
                              />
                          </FormGroup>
                          <Typography
                            variant="body1"
                            fontSize={14}
                            noWrap
                            fontWeight={600}
                            pl={2}
                          >
                            {column.label}
                          </Typography>
                  </Box>
                  :
                  <Typography
                    variant="body1"
                    fontSize={14}
                    noWrap
                    fontWeight={600}
                  >
                    {column.label}
                  </Typography>

                }
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
  selectAllCheck: PropTypes.array,
  handleDeleteCheckBoxChange: PropTypes.func,
};

export default memo(TableHeader);
