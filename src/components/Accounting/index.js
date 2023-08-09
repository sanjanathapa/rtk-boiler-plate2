import React, { useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Paper, Typography } from "@mui/material";
import T from "T";
import { GET_SIZE } from "utils/responsive";

import AccountingProjects from "./AccountingProjects";
import TopBar from "./Topbar";
import { format, isValid } from "date-fns";
import { BACKEND_DATE_FORMAT } from "settings/constants/date";
import { useLazyGetActiveProjectListQuery } from "api/projects/getActiveProjectList";
import { PAGINATION } from "settings/constants/pagination";
import { get } from "lodash";
import { useLazyGetFilteredAccountingInfoQuery } from "api/Accounting/getFilteredAccountingInfo";
import Constants from "Constants";
import { downloadFile } from "utils/file";
import { handleError } from "utils/error";
import { MISCurrentUser } from "utils/validations";
import { toast } from "react-toastify";

const { SERVER_URL } = Constants;
const { INITIAL_PAGE } = PAGINATION;
const ROWS_PER_PAGE = 10000;



const AccountingInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isXs } = GET_SIZE();
  const { sessionToken } = MISCurrentUser();
  const [getActiveProjectList, { data: activeProjectList }] = useLazyGetActiveProjectListQuery();
  const [getFilteredAccountingInfo]= useLazyGetFilteredAccountingInfoQuery();
  const getBEDateFormat = (val) => format(val, BACKEND_DATE_FORMAT);

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      startDate: null,
      endDate: null,
      projectId: "",
      allTableRows: [],
      totalHrsLogged:""
     
    }
  );

  const {
    startDate,
    endDate,
    projectId,
    allTableRows,
    totalHrsLogged
    } =
    localState;
    

    useEffect(() => {
      getActiveProjectList({ page: INITIAL_PAGE, rowPerPage: ROWS_PER_PAGE });
    }, []);
    useEffect(()=>{
      if(startDate && endDate && projectId)
      {
        getAccountingProjectData();
      } 
      else 
      {
        setLocalState({allTableRows:[],
          totalHrsLogged:""})
      }

    },[startDate,endDate,projectId])

  const projectListDetails = get(activeProjectList, "results", []);
  
  const selectedProject =
   projectListDetails.find((dept) => dept.id === projectId) || {};

  const onHandleDateChange = (newValue, type) => {
    const validDate = newValue ? new Date(newValue) : null;

    setLocalState({
      [type]:
        validDate && isValid(validDate) ? getBEDateFormat(validDate) : null,
    });
  };
  const resetState=()=>{
    setLocalState({
      allTableRows:[],
      totalHrsLogged:""
    })
  }
  const getAccountingProjectData = () =>{
    getFilteredAccountingInfo({projectId,startDate,endDate})
    .unwrap()
    .then((res)=>{
      const tableRows=get(res,"results.accountInfo",[])
      const totalHrs=get(res,"results.totalHours","")
      setLocalState({allTableRows:tableRows,
                     totalHrsLogged:totalHrs})
    })
    .catch(handleError)
    resetState();
  }
  
  const onHandleAutoCompleteChange = (type, value) => {
        setLocalState({ [type]:value });
  };

  const handleExport = async (type) => {
    setLocalState({ exportLoading: true });
    if(startDate &&endDate&&projectId)
    {
      fetch(`${SERVER_URL}/accounting/export?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            // 'content-type': 'application/json'
          },
        })
          .then((res) => res.blob())
          .then((response) => {
            downloadFile(response, type);
    
            setLocalState({ exportLoading: false });
          })
          .catch(handleError);
    }
    else
    {
      toast.error(T.ACCOUNTING_DOWNLOAD_REQUIREMENT_STATEMENT)
    }
  };
  return (
    <Paper sx={{ p: 2, maxHeight: "calc(100vh - 150px)", overflow: "auto" }}>
      {/* {(isFetching || exportLoading) && <MISLoader />} */}

      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="h6" fontWeight={700} ml={1}>
          {T.ACCOUNTING_INFO.toUpperCase()}
        </Typography>
      </Box>
      <TopBar
            startDate={startDate}
            endDate={endDate}
            onHandleDateChange={onHandleDateChange}
            activeProjectList={activeProjectList}
            onHandleAutoCompleteChange={onHandleAutoCompleteChange}
            projectId={projectId}
            projectListDetails={projectListDetails}
            selectedProject={selectedProject}
            handleExport={handleExport}
            // searchInput={searchInput}
            
          />
      <AccountingProjects
        allTableRows={allTableRows}
        totalHrsLogged={totalHrsLogged}
      />
      
    </Paper>
  );
};

export default AccountingInfo;
