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
import { useLazyGetUserJiraQuery } from "api/Jira/getJiraByUser";
import { handleError } from "utils/error";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  borderTop: "inherit",
  overflow: "hidden",
  padding: "8px 0px 8px 10px",
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

const UserNcTableBody = ({
  id="",
}) => {
    const [getUserJira]= useLazyGetUserJiraQuery();
    const [tableData,setTableData] =useState([]);

    useEffect(()=>{
        getUserJiraData()
    },[])
    const getUserJiraData = () =>{
        getUserJira({ id :id })
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
                    {get(record,"project","-")}
                    </StyledTableCell>
                    <StyledTableCell >
                    {get(record,"projectManager","-")}
                    </StyledTableCell>
                    <StyledTableCell >
                    {get(record,"functionalHead","-")}
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                    {get(record,"timeSpentHours","-")}
                    </StyledTableCell>
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

UserNcTableBody.propTypes = {
  ID: PropTypes.number,
};

export default memo(UserNcTableBody);
