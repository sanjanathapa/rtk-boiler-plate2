import React, { useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import capitalize from "lodash/capitalize";

import { isValid, format } from "date-fns";

import { Box, Paper, Typography, Grid, IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MISLoader from "components/common/MISLoader";
import { useLazyGetUserViewByIdQuery } from "api/members/getUserViewById";

import T from "T";
import Constants from "Constants";

import {
  FRONTEND_DATE_FORMAT,
  BACKEND_DATE_FORMAT,
} from "settings/constants/date";

import { GET_SIZE } from "utils/responsive";
import { handleError } from "utils/error";
import { get } from "utils/lodash";
import { MISCurrentUser } from "utils/validations";
import { downloadFile } from "utils/file";

import {
  SubTitleTypography,
  TitleTypography,
  StyledContentCopyIcon,
  getFEDateFormat,
} from "utils/members";

import NCHistory from "./View/NCHistory";
import ProjectHistory from "./View/ProjectHistory";
import TechnicalHistory from "./View/TechnicalHistory";
import AddFeedback from "./View/AddFeedback";
import DeleteNC from "./View/DeleteNC";
import { MONTH_LIST } from "./memberModel";
import { useLazyGetUserNcHistoryQuery } from "api/members/getUserNcHistory";
import ActiveNcList from "./View/NcLists/ActiveNcList";
import DeletedNcList from "./View/NcLists/DeletedNcList";
import { NETSMARTZ_THEME_COLOR } from "theme/colors";



const { SERVER_URL } = Constants;

const ViewMember = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isXs } = GET_SIZE();

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      startDate: null,
      endDate: null,
      startMonth:null,
      endMonth:null,
      feedbackAddition: false,
      projectId: "",
      ncId: "",
      selectedMonth: "",
      typeOfNc: "",
      exportLoading: false,
      openDeleteNC:false,
      openActiveNcCountList:false,
      openDeleteNcCountList:false,
      ncHistory:[]
    }
  );

  const { 
    startDate, 
    endDate,
    startMonth, 
    endMonth, 
    feedbackAddition, 
    projectId, 
    ncId, 
    selectedMonth,
    typeOfNc, 
    exportLoading, 
    openDeleteNC, 
    openActiveNcCountList,
    openDeleteNcCountList,   
    ncHistory } =
    localState;

  const startMonthCount = MONTH_LIST.indexOf(startMonth)+1;
  const endMonthCount = MONTH_LIST.indexOf(endMonth)+1;
  const url = location.pathname;
  const id = Number(url.replace(/\D+/g, ""));

  const [getUserViewById, { isFetching, data: viewData }] =
    useLazyGetUserViewByIdQuery();
  const [getUserNcHistory ] =
    useLazyGetUserNcHistoryQuery();

  const refreshView = () => {
    getUserViewById({ id });
  };

  useEffect(() => {
    if(initialNcHistory) setLocalState({ncHistory:initialNcHistory})
    refreshView();
  }, []);
  
  const handleBack = () => {
    navigate("/app/members");
    navigate("/app/members",
     { state:
       { 
        showActive: empStatus === T.STABLE || 
        empStatus === T.YET_TO_JOIN || 
        empStatus === T.RESIGNED 
       } 
      });
  };

  const record = get(viewData, "results", []);
  const fullName = get(record, "userName", "");
  const empCode = get(record, "empCode", "");
  const empStatus = get(record, "empStatus", "");
  const department = get(record, "department", "");
  const designation = get(record, "designation", "");
  const reportingManager = get(record, "reportingManager", "-");
  const nonWorkingDays = get(record, "nonWorkingDays", ["-"])
  const email = get(record, "email", "");
  const phone = get(record, "mobileNo", "");
  const experience = `${get(record, "expInYears", 0)}.${get(
    record,
    "expInMonths",
    0
  )} ${T.YEARS.toLowerCase()}`;

  const jiraFrequency = get(record, "jiraFrequency", "-");
  const joiningDateTime = get(record, "joiningDate", "");

  const joiningDate = joiningDateTime
    ? getFEDateFormat(joiningDateTime.split(" ")[0], FRONTEND_DATE_FORMAT)
    : "-";

  const projectHistory = get(record, "projectHistory", []);
  const technicalHistory = get(record, "technicalHistory", []);
  const initialNcHistory = get(record, "ncHistory", []);
  
  useEffect(()=>{
    if(startMonthCount && endMonthCount)
    {
      getUserNcHistory({id,startMonth:startMonthCount,endMonth:endMonthCount})
      .unwrap()
      .then(res=>{
        setLocalState({ncHistory:get(res,"results",[])})
      })
    }
    else{
      setLocalState({ncHistory:initialNcHistory})
    }
  },[startMonthCount,endMonthCount,initialNcHistory])

  // const onHandleDateChange = (newValue, type) => {
  //   const validDate = new Date(newValue);
  //   if (isValid(validDate))
  //     setLocalState({ [type]: format(validDate, BACKEND_DATE_FORMAT) });
  // };
  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };

  const { sessionToken } = MISCurrentUser();
  const handleExport = async (type) => {
    setLocalState({ exportLoading: true });
    fetch(`${SERVER_URL}/feedback/project/export?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then((res) => res.blob())
      .then((response) => {
        downloadFile(response, type);

        setLocalState({ exportLoading: false });
      })
      .catch(handleError);
  };

  const handleDeleteNCDialog = (id = "") => {
    setLocalState({
      openDeleteNC: !openDeleteNC,
      ncId: id,
    });
  };

  //Active user NC list open handler
  const handleActiveNcCountDialog = (selectedMonth="",typeOfNc="") => {
    setLocalState({
      openActiveNcCountList: !openActiveNcCountList,
      selectedMonth: selectedMonth,
      typeOfNc:typeOfNc
    });
  };

  //Deleted user NC list open handler
  const handleDeleteNcCountDialog = (selectedMonth="",typeOfNc="") => {
    setLocalState({
      openDeleteNcCountList: !openDeleteNcCountList,
      selectedMonth: selectedMonth,
      typeOfNc:typeOfNc
    });
  };

  const handleAddFeedbackDialog = (id) => {
    setLocalState({ feedbackAddition: !feedbackAddition, projectId: id });
  };

  const handleAddFeedback = (id) => {
    handleAddFeedbackDialog(id);
  };

  return (
    <Paper sx={{ p: 2, maxHeight: "calc(100vh - 150px)", overflow: "auto" }}>
      {(isFetching || exportLoading) && <MISLoader />}

      <Box display="flex" alignItems="center" mb={1}>
        <ArrowBackIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={handleBack}
        />
        <Typography variant="h6" fontWeight={700} ml={1}>
          {fullName.toUpperCase()}
        </Typography>
        <Tooltip title={T.EDIT_DETAILS} placement="top">
          <IconButton >
            <EditOutlinedIcon
              fontSize="medium"
              disabled
              onClick={() => {
                navigate(`edit`)
              }}
            sx={{
              mr: 1,
              height: 18,
              cursor: "pointer",
              color: NETSMARTZ_THEME_COLOR,
              

            }}
          />

          </IconButton>

        </Tooltip>
      </Box>

      <Grid
        spacing={2}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item mt={2}>
          <Box display="flex">
            <SubTitleTypography>{T.EMP_CODE}:</SubTitleTypography>
            <TitleTypography ml={1}>{empCode}</TitleTypography>
            {StyledContentCopyIcon(empCode, T.EMP_CODE)}
          </Box>

          <Box display="flex" mt={0.5}>
            <SubTitleTypography>{T.DEPARTMENT}:</SubTitleTypography>
            <TitleTypography ml={1}>{department}</TitleTypography>
          </Box>

          <Box display="flex" mt={0.5}>
            <SubTitleTypography>{T.DESIGNATION}:</SubTitleTypography>
            <TitleTypography ml={1}>{designation}</TitleTypography>
          </Box>

          <Box display="flex" mt={0.5}>
            <SubTitleTypography>{T.REPORTING_MANAGER}:</SubTitleTypography>
            <TitleTypography ml={1}>
              {reportingManager}
            </TitleTypography>
          </Box>

          <Box display="flex" mt={0.5}>
            <SubTitleTypography>{T.NON_WORKING_DAYS}:</SubTitleTypography>
            <TitleTypography ml={1}>
              {nonWorkingDays.map(item=>capitalize(item)).join(", ")}
            </TitleTypography>
          </Box>
        </Grid>
        <Grid item mt={2}>
          <Box display="flex">
            <SubTitleTypography>{T.EMAIL_ID}:</SubTitleTypography>
            <TitleTypography ml={1} noWrap maxWidth={isXs ? 205 : "inherit"}>
              {email}
            </TitleTypography>
            {StyledContentCopyIcon(email, T.EMAIL_ID)}
          </Box>

          <Box display="flex" mt={0.5}>
            <SubTitleTypography>{`${T.PHONE} ${T.NUMBER}`}:</SubTitleTypography>
            <TitleTypography ml={1}>{phone}</TitleTypography>
            {StyledContentCopyIcon(phone, `${T.PHONE} ${T.NUMBER}`)}
          </Box>

          <Box display="flex" mt={0.5}>
            <SubTitleTypography>{T.JOINING_DATE_IN_NTZ}:</SubTitleTypography>
            <TitleTypography ml={1} noWrap maxWidth={isXs ? 100 : "inherit"}>
              {joiningDate}
            </TitleTypography>
          </Box>

          <Box display="flex" mt={0.5}>
            <SubTitleTypography>{T.TOTAL_EXPERIENCE}:</SubTitleTypography>
            <TitleTypography ml={1}>{experience}</TitleTypography>
          </Box>

          <Box display="flex" mt={0.5}>
            <SubTitleTypography>{T.FREQUENCY_OF_JIRA}:</SubTitleTypography>
            <TitleTypography ml={1}>{jiraFrequency}</TitleTypography>
          </Box>
        </Grid>
      </Grid>

      <ProjectHistory
        allTableRows={projectHistory}
        handleAddFeedback={handleAddFeedback}
        handleExport={handleExport}
      />

      <TechnicalHistory results={technicalHistory} />
      <NCHistory
        startMonth={startMonth}
        endMonth={endMonth}
        allTableRows={ncHistory}
        refreshNCTable={refreshView}
        handleDeleteNCDialog={handleDeleteNCDialog}
        handleActiveNcCountDialog={handleActiveNcCountDialog}
        handleDeleteNcCountDialog={handleDeleteNcCountDialog}
        onHandleChange={onHandleChange}
        handleExport={handleExport}
      />
      <AddFeedback
        feedbackAddition={feedbackAddition}
        projectId={projectId}
        handleAddFeedbackDialog={handleAddFeedbackDialog}
        refreshView={refreshView}
      />
      <DeleteNC
        openDeleteNC = {openDeleteNC}
        ncId = {ncId}
        refreshView = {refreshView}
        handleDeleteNCDialog = {handleDeleteNCDialog}
      />

      <ActiveNcList
        openActiveNcCountList = {openActiveNcCountList}
        selectedUserName ={fullName}
        userId = {id}
        month={selectedMonth}
        typeOfNc={typeOfNc}
        refreshView = {refreshView}
        handleActiveNcCountDialog = {handleActiveNcCountDialog}
      />
      
      <DeletedNcList
        openDeleteNcCountList = {openDeleteNcCountList}
        selectedUserName ={fullName}
        userId = {id}
        month={selectedMonth}
        typeOfNc={typeOfNc}
        refreshView = {refreshView}
        handleDeleteNcCountDialog = {handleDeleteNcCountDialog}
      />

      
    </Paper>
  );
};

export default ViewMember;
