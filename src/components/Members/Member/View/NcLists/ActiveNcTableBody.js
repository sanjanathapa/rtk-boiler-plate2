import React, { Children, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TableRow,
  TableCell,
  Typography,
  TableBody,
  styled,
} from "@mui/material";
import { get } from "utils/lodash";
import { memo } from "utils/react";

import T from "T";
import { BACKGROUND} from "theme/colors";
import { handleError } from "utils/error";
import { useLazyGetActiveJiraByDateQuery } from "api/Jira/getActiveJiraByDate";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  borderTop: "inherit",
  overflow: "hidden",
  padding: "8px 0px 8px 24px",
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
const activeNcStatus= 0;
const ActiveNcTableBody = ({
  userId = "",
  month= "",
  typeOfNc= "",
}) => {
  const [getActiveJiraByDate]= useLazyGetActiveJiraByDateQuery();
  const [tableData,setTableData] =useState([]);

  useEffect(()=>{
      getUserJiraData()
  },[])
  const getUserJiraData = () =>{
    getActiveJiraByDate({ id :userId, month:month, status: activeNcStatus, type:typeOfNc })
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
                    {typeOfNc === T.JIRA_NOT_FILLED &&
                      <StyledTableCell align="center" >
                      {get(record,"timeSpentHours","-")}
                      </StyledTableCell>
                    }
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

ActiveNcTableBody.propTypes = {
  userId: PropTypes.number,
  month: PropTypes.number,
  typeOfNc: PropTypes.string,
};

export default memo(ActiveNcTableBody);
