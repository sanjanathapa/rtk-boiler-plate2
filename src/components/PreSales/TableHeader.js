import React, { Children } from "react";
import PropTypes from "prop-types";

import { TableRow, TableHead, TableCell, Typography, Box, IconButton, Tooltip } from "@mui/material";
import SwapVertIcon from '@mui/icons-material/SwapVert';

import { memo } from "utils/react";
import { get } from "utils/lodash";
import { handleHeaderClass } from "utils/members";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";
import T from "T";
import { noop } from "lodash";


const TableHeader = ({ 
  columns = [], 
  lockedColumns = [] ,
  handleDaysSorting=noop,
  daysSorting=false,
  assignSorting=false,
  leadDateSorting=false
  }) => {
  return (
    <TableHead>
      <TableRow sx={{ height: 30 }}>
        {Children.toArray(
          columns.map((column, ind) => {
            const columnName = get(column, "label", "").toUpperCase();
            return (
              <TableCell
                sx={{
                  border: "none",
                  backgroundColor: BACKGROUND.header,
                  padding: "0px 8px 0px 24px",
                }}
              >
                {
                  columnName===T.DAYS_IN_OPERATION.toUpperCase()?
                  <Box sx={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      noWrap
                      fontWeight={600}
                      pl={2}
                    >
                      {column.label.toUpperCase()}
                    </Typography>
                    <Tooltip title={(leadDateSorting||assignSorting)?T.DISABLED: T.SORT} placement="top">
                      <Box>
                        <IconButton 
                        onClick={()=>handleDaysSorting(columnName)} 
                        aria-label="Sort" 
                        size="small"
                        disabled={leadDateSorting||assignSorting}
                        >
                          <SwapVertIcon
                              sx={{
                                mr: 1,
                                height: 20,
                                cursor: "pointer",
                              }}
                              htmlColor= {(!leadDateSorting && !assignSorting) && NETSMARTZ_THEME_COLOR}
                          />
                        </IconButton>
                      </Box>
                    </Tooltip>
                  </Box>:
                  columnName===T.ASSIGNED_TO.toUpperCase()?
                  <Box sx={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      noWrap
                      fontWeight={600}
                      pl={2}
                    >
                      {column.label.toUpperCase()}
                    </Typography>
                    <Tooltip title={(daysSorting||leadDateSorting)?T.DISABLED:T.SORT} placement="top">
                      <Box>
                        <IconButton 
                        onClick={()=>handleDaysSorting(columnName)} 
                        aria-label="Sort" 
                        size="small"
                        disabled={daysSorting||leadDateSorting}
                        >
                          <SwapVertIcon
                              sx={{
                                mr: 1,
                                height: 20,
                                cursor: "pointer",
                              }}
                              htmlColor= {(!leadDateSorting && !daysSorting) && NETSMARTZ_THEME_COLOR}
                          />
                        </IconButton>
                      </Box>
                    </Tooltip>
                  </Box>:
                  columnName===T.LEAD_DATE.toUpperCase()?
                  <Box sx={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      noWrap
                      fontWeight={600}
                      pl={2}
                    >
                      {column.label.toUpperCase()}
                    </Typography>
                    <Tooltip title={(daysSorting||assignSorting)?T.DISABLED:T.SORT} placement="top">
                      <Box>
                        <IconButton 
                        onClick={()=>handleDaysSorting(columnName)} 
                        aria-label="Sort" 
                        size="small"
                        disabled={daysSorting||assignSorting}
                        >
                          <SwapVertIcon
                              sx={{
                                mr: 1,
                                height: 20,
                                cursor: "pointer",
                              }}
                              htmlColor= {(!assignSorting && !daysSorting) && NETSMARTZ_THEME_COLOR}
                          />
                        </IconButton>
                      </Box>
                    </Tooltip>
                  </Box>:
                <Typography
                    variant="body1"
                    fontSize={14}
                    noWrap
                    fontWeight={600}
                >
                  {columnName}
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
  locked_columns: PropTypes.array,
  handleDaysSorting: PropTypes.func,
};

export default memo(TableHeader);
