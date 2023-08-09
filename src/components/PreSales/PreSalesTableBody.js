import React, { Children, useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import {
  TableRow,
  TableCell,
  Typography,
  TableBody,
  styled,
  Box,
  Tooltip,
} from "@mui/material";

import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';

import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";
import {
  canDeleteMasterSettings,
  canEditMasterSettings,
} from "utils/permissions";
import { get } from "utils/lodash";
import { memo } from "utils/react";

import T from "T";

import { PAGINATION } from "settings/constants/pagination";
import { MainTitleTypography, SubTitleTypography, TitleTypography } from "utils/members";
import { useGetRecommendationsMutation } from "api/preSales/getPreSalesRecommendations";
import { handleError } from "utils/error";
import { useNavigate } from "react-router-dom";
import { memberFilterStore } from "slices/memberFilterSlice";
import usePMFetch from "hooks/usePMFetch";
import { format } from "date-fns";
import { FRONTEND_DATE_FORMAT } from "settings/constants/date";

const { INITIAL_PAGE, ROWS_PER_PAGE } = PAGINATION;

const StyledTableCell = styled(TableCell)(({theme}) => ({
  borderTop: "inherit",
  overflow: "hidden",
  padding: "8px 0px 8px 24px",
  ...theme.typography.subtitle1,
}));
const StyledTableRow = styled(TableRow)(() => ({
  // "&:nth-of-type(odd)": {
  //   backgroundColor: BACKGROUND.white,
  // },
  // "&:nth-of-type(even)": {
  //   backgroundColor: BACKGROUND.cardDefault,
  // },
}));

const PreSalesTableBody = ({
  allTableRows = [],
  handleJdDialog = noop,
  handleDeleteProjectDialog = noop,
}) => {
  const getFEDateFormat = (val) => {
    if (val) return format(new Date(val.split(" ")[0]), FRONTEND_DATE_FORMAT);
    return "";
  };
  const [projectManagers,functionalManagers, workLocationList, skillList, projectList, departmentList] =
  usePMFetch();
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      
      filters: {},
      
    }
  );
  

  const {
    
    filters
    
  } = localState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ getRecommendations ] = useGetRecommendationsMutation();
  const handleRecommendations =(jdId) =>{
    getRecommendedMembers(jdId);
  };
  const getAvailabilityValById = (availability) => {
    if (availability === "1") return T.FULL;
    if (availability === "0") return T.NO;
    if (availability === "2") return T.PARTIAL;
    return "";
  };
  const loadFetchedFilters = (records) => {
    const totalExp = get(records, "totalExp", "");
    const exp = totalExp.split("-");
    filters[T.PRIMARY_SKILL] = get(skillList, "results", []).filter((rec) =>
      get(records, "primarySkillName", []).includes(rec.skillName)
    );  

    filters[T.SECONDARY_SKILL] = get(skillList, "results", []).filter((rec) =>
      get(records, "secondarySkillName", []).includes(rec.skillName)
    );

    filters[T.WORK_LOCATION] = get(workLocationList, "results", []).filter(
      (rec) =>
        get(records, "workLocationName", []).includes(rec.workLocationName)
    );
    filters[T.EMP_MODE] = get(records, "empMode", "");
    filters[T.STATUS] = get(records, "empStatus", "");
    filters[T.DEPARTMENT] = get(departmentList, "results", []).filter((rec) =>
      get(records, "departmentName", []).includes(rec.departmentName)
    )
    filters[T.PROJECT] = get(projectList, "results", []).filter((rec) =>
      get(records, "projectName", []).includes(rec.name)
    );
    filters[T.PROJECT_MODE] = get(records, "projectMode", "");
    filters[T.AVAILABILITY] = getAvailabilityValById(
      get(records, "availability", "")
    );
    filters[T.PROJECT_MANAGER] = get(projectManagers, "results", []).filter(
      (rec) => get(records, "projectManagerName", []).includes(rec.name)
    );
    filters.minExp = exp[0] || "";
    filters.maxExp = exp[1] || "";

    return filters;
  };

  const getRecommendedMembers =(id)=>{
    
    getRecommendations({id:id})
    .unwrap()
    .then(res=>{
      const recommendedFilters = loadFetchedFilters(res);
      // dispatch(memberFilterStore({storedFilters:res}));
      // navigate("/app/members", { state: { filters:  recommendedFilters} })
      navigate("/app/pre-sales/recommended-members", { state: { filters:  recommendedFilters} });
    }
      )
    .catch(handleError)
  }
  const handleEditRequirement = (id) =>{
    navigate(`/app/pre-sales/${id}/edit`);
  }
  
  return (
    <TableBody>
      {Children.toArray(
        allTableRows.map((record, index) => {
          const companyName = get(record,"companyName","");
          const region = get(record,"clientRegion.regionName","");
          const shiftTimings = get(record,"shiftTimings.shiftTimings","");
          const startDate = getFEDateFormat(get(record,"startDate",null));
          const endDate = getFEDateFormat(get(record,"endDate",null));
          const salesManager = get(record,"salesManagers.name","");
          const createdBy = get(record,"createdBy","");
          const assignedTo = get(record,"projectManager.name","");
          const jdList = get(record,"preSalesMapping","");
          const preSalesStatus = get(record,"preSalesStatus","");
          const daysInOperation =  get(record,"daysOfOperation","0");
          const requirementId =  get(record,"id","");
          return (
            <StyledTableRow sx={{ background: BACKGROUND.white }} key={index}>
              <StyledTableCell>
                {
                endDate ?
                <>
                  <Box display="flex" whiteSpace="nowrap">
                    <SubTitleTypography>
                      {T.FROM}:
                    </SubTitleTypography>
                    <TitleTypography ml={1}>
                      {startDate}
                    </TitleTypography>
                  </Box>
                  <Box display="flex" whiteSpace="nowrap">
                    <SubTitleTypography>
                      {T.TO}:
                    </SubTitleTypography>
                    <TitleTypography ml={1}>
                      {endDate}
                    </TitleTypography>
                  </Box>
                  </>:
                  <Box display="flex" whiteSpace="nowrap">
                    <TitleTypography>
                      {startDate}
                    </TitleTypography>
                  </Box>
                  }
                </StyledTableCell>

              <StyledTableCell>
              <MainTitleTypography>
              {/* <a href={`member/${id}`} style={{color:NETSMARTZ_THEME_COLOR, textDecoration:"none"}} >
                {clientName}
              </a> */}
              {companyName}
              <Box display="flex" whiteSpace="nowrap">
                <SubTitleTypography>{T.REGION}:</SubTitleTypography>
                <TitleTypography ml={1}>{region}</TitleTypography>
              </Box>
              <Box display="flex" whiteSpace="nowrap">
                <SubTitleTypography>{T.SHIFT}:</SubTitleTypography>
                <TitleTypography ml={1}>{shiftTimings}</TitleTypography>
              </Box>
            </MainTitleTypography>
              </StyledTableCell>

              <StyledTableCell align="center">
                <TitleTypography>
                  {daysInOperation}
                </TitleTypography>
              </StyledTableCell> 

              <StyledTableCell>
                <TitleTypography>
                  {preSalesStatus}
                </TitleTypography>
              </StyledTableCell>
              
              <StyledTableCell>
              <Box display="flex" whiteSpace="nowrap">
                  <SubTitleTypography>
                    {T.SALES_MANAGER}:
                  </SubTitleTypography>
                  <TitleTypography ml={1}>
                    {salesManager}
                  </TitleTypography>
                </Box>
                <Box display="flex" whiteSpace="nowrap">
                  <SubTitleTypography>
                    {T.CREATED_BY}:
                  </SubTitleTypography>
                  <TitleTypography ml={1}>
                    {createdBy}
                  </TitleTypography>
                </Box>
              </StyledTableCell>

              <StyledTableCell>
                <TitleTypography>
                  {assignedTo}
                </TitleTypography>
              </StyledTableCell>
              
              <StyledTableCell>
                {Children.toArray(
                  jdList.map(data=>{
                    const jdName = get (data,"preSalesMappingName","");
                    const jdId = get(data,"id","");
                    return (
                      <MainTitleTypography>
                      <SubTitleTypography display="flex" alignItems="center">
                        <SubTitleTypography 
                          sx={{color:NETSMARTZ_THEME_COLOR,cursor:"pointer"}} 
                          onClick={()=>handleJdDialog(data)}>
                          {jdName}
                        </SubTitleTypography>
                        {jdName &&
                          <Tooltip title={T.RECOMMENDATIONS} placement="top">
                            <RecommendOutlinedIcon 
                              onClick={()=>handleRecommendations(jdId)}
                              sx={{
                                mr: 1,
                                ml:1,
                                height: 20,
                                cursor: "pointer",
                                color: NETSMARTZ_THEME_COLOR,
                              }}
                            />
                          </Tooltip>
                        }
                      </SubTitleTypography>
                    </MainTitleTypography>
                    )
                  })
                )}
               
              </StyledTableCell>
              
              <StyledTableCell align="center">
             
                  <EditIcon
                    onClick={()=>handleEditRequirement(requirementId)}
                    sx={{
                      mr: 1,
                      height: 17,
                      cursor: "pointer",
                      color: NETSMARTZ_THEME_COLOR,
                    }}
                  />
                 
              </StyledTableCell>

            {/* <StyledTableCell align="center">
             
                  <RecommendOutlinedIcon
                    // onClick={()=>handleEditProjectInfoDialog()}
                    sx={{
                      mr: 1,
                      height: 18,
                      cursor: "pointer",
                      color: NETSMARTZ_THEME_COLOR,
                    }}
                  />
                 
              </StyledTableCell>

            <StyledTableCell align="center">
             
                  <DeleteIcon
                    onClick={()=>handleDeleteProjectDialog()}
                    sx={{
                      mr: 1,
                      height: 17,
                      cursor: "pointer",
                      color: NETSMARTZ_THEME_COLOR,
                    }}
                  />
                 
              </StyledTableCell> */}
            </StyledTableRow>
          );
        })
      )}

      {allTableRows && allTableRows.length === 0 && (
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

PreSalesTableBody.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalDataCount: PropTypes.number,
  totalPageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  allTableRows: PropTypes.array,
  handleJdDialog: PropTypes.func,
  handleDeleteProjectDialog: PropTypes.func,
};

export default memo(PreSalesTableBody);
