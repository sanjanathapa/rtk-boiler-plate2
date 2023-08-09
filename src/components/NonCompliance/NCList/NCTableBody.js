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
  Tooltip,
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
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: 100,
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

const NCTableBody = ({
  records = [],
  handleDeleteNCDialog =noop,
  handleByDateUserNCDialog =noop,
}) => {
  const {user}= MISCurrentUser();
  const userRole= get(user,"role","");
  const userId=get(user,"id","")
  return (
    <TableBody>
      {Children.toArray(
        records.map((record, index) => {
          const ncId = get(record,"id","");
          const ncStatusValue = get(record, "ncStatus", "");
          const userName = get(record, "userName", "");
          const ncDate = get(record, "dateOfNc", "");
          const comments = get(record, "comments", "");
          const ncStatus = 
          ncStatusValue === 0 ? T.OPEN :
           ncStatusValue === 1 ? T.NC_DELETE_REQUEST :
            ncStatusValue === 2 ? T.NC_DELETED : T.NA;
          return (<> {ncStatusValue!==2 &&
                        <StyledTableRow sx={{ background: BACKGROUND.white }} key={index}>
                          {/* <StyledTableCell>{index+1}.</StyledTableCell> */}
                          <StyledTableCell>{ncDate}</StyledTableCell>
                          <StyledTableCell 
                            sx={{cursor:"pointer", color:NETSMARTZ_THEME_COLOR}} 
                            onClick={()=>handleByDateUserNCDialog(ncId,userName,ncDate)}>
                            {userName}
                          </StyledTableCell>
                          <StyledTableCell>{get(record, "typeOfNc", "")}</StyledTableCell>
                          {
                            (userRole === T.PMO || userRole === T.VP) && 
                            <>
                              <StyledTableCell>{get(record, "reportingManager", "")}</StyledTableCell>
                            </>
                          }
                          <StyledTableCell>{ncStatus}</StyledTableCell>
                          <Tooltip title={comments} placement="top">
                            <StyledTableCell>{comments}</StyledTableCell>
                          </Tooltip>
                          {
                            <StyledTableCell align="center">
                              { <IconButton disabled={userRole ===T.PM && ncStatusValue!==0}>
                                <DeleteIcon
                                  fontSize="small"
                                  disabled
                                  onClick={() => {
                                    handleDeleteNCDialog(ncId,userId,comments);
                                  }}
                                sx={{
                                  mr: 1,
                                  height: 18,
                                  cursor: "pointer",
                                  color: userRole ===T.PM && ncStatusValue!==0? TEXT.grayBlue:NETSMARTZ_THEME_COLOR,
                                  

                                }}
                              />

                              </IconButton>
                            }
                          </StyledTableCell>
                          }

                          
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

NCTableBody.propTypes = {
  records: PropTypes.array,
  handleByDateUserNCDialog: PropTypes.func,
  handleDeleteNCDialog: PropTypes.func,
};

export default memo(NCTableBody);
