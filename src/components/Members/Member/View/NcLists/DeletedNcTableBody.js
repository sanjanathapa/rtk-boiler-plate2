import React, { Children, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TableRow,
  TableCell,
  Typography,
  TableBody,
  styled,
  Tooltip,
} from "@mui/material";
import { get } from "utils/lodash";
import { memo } from "utils/react";

import T from "T";
import { BACKGROUND} from "theme/colors";
import { handleError } from "utils/error";
import { useLazyGetDeletedJiraByDateQuery } from "api/Jira/getDeletedJiraByDate";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  borderTop: "inherit",
  overflow: "hidden",
  padding: "8px 0px 8px 24px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: 200,
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
const deletedNcStatus =2;
const DeletedNcTableBody = ({
  userId = "",
  month= "",
  typeOfNc= "",
}) => {
    const [getDeletedJiraByDate]= useLazyGetDeletedJiraByDateQuery();
    const [tableData,setTableData] =useState([]);

    useEffect(()=>{
        getUserJiraData()
    },[])
    const getUserJiraData = () =>{
      getDeletedJiraByDate({ id :userId, month:month, status: deletedNcStatus, type:typeOfNc })
        .unwrap()
        .then(res=>{
        setTableData(get(res,"results",""));
        })
        .catch(handleError)
    }
  
  return (
    <TableBody>
      {Children.toArray(
        tableData.map((record, index) => {
          return (         
                <StyledTableRow sx={{ background: BACKGROUND.white }} key={index}>
                    <StyledTableCell>{index+1}.</StyledTableCell>
                    <StyledTableCell >
                    {get(record,"dateOfNc","-")}
                    </StyledTableCell>
                    <StyledTableCell >
                    {get(record,"projectName","-")}
                    </StyledTableCell>
                    <StyledTableCell >
                    {get(record,"projectManager","-")}
                    </StyledTableCell>
                    <StyledTableCell >
                    {get(record,"reportingManager","-")}
                    </StyledTableCell>
                    <StyledTableCell >
                    {get(record,"functionalHead","-")}
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                    {get(record,"typeOfNc","-")}
                    </StyledTableCell>
                    <Tooltip title={get(record,"comments","")} placement="top">
                      <StyledTableCell align="center" >
                      {get(record,"comments","-")}
                      </StyledTableCell>
                    </Tooltip>
                </StyledTableRow>
          );
        })
      )}

      {tableData && tableData.length === 0 && (
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

DeletedNcTableBody.propTypes = {
  userId: PropTypes.number,
  month: PropTypes.number,
  typeOfNc: PropTypes.string,
};

export default memo(DeletedNcTableBody);
