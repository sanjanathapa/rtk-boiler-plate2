import React, { useReducer, useEffect, useCallback } from "react";
import { cloneDeep, sum, debounce, startCase } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  intervalToDuration,
  format,
  isValid,
  differenceInMonths,
} from "date-fns";

import { Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import MISLoader from "components/common/MISLoader";
import usePMFetch from "hooks/usePMFetch";

import { useLazyGetAllDepartmentQuery } from "api/members/getDepartmentList";
import { useLazyGetFunctionalManagerQuery } from "api/members/getFunctionalHead";
import { useLazyGetTrainingListQuery } from "api/members/getTrainingList";
import { useAddMemberMutation } from "api/members/addMember";
import { useLazyGetUserByIdQuery } from "api/members/getUserById";
import { useUpdateMemberMutation } from "api/members/updateMember";
import { useCheckAvailableMutation } from "api/members/checkAvailable";

import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";

import T from "T";
import { PAGINATION } from "settings/constants/pagination";
import { get } from "utils/lodash";
import { handleError } from "utils/error";
import { BACKEND_DATE_FORMAT } from "settings/constants/date";
import { isEmail, isEmptyString, isMobileNo } from "utils/validations";

import { MEMBER_MODEL, WEEK_DAYS_LIST } from "./memberModel";

import BasicDetails from "./BasicDetails";
import WorkDetails from "./WorkDetails";
import ProjectDetails from "./ProjectDetails";
import ExitDetails from "./ExitDetails";
import MISFooterButton from "components/common/MISFooterButton";
import { PROJECT_ALLOCATION } from "./memberModel";
import { useLazyGetActiveProjectListQuery } from "api/projects/getActiveProjectList";
import ConfirmCancel from "./ConfirmCancel";

const { INITIAL_PAGE } = PAGINATION;

const TOTAL_ALLOCATION_HOURS = 160;
const DEBOUNCE_TIME = 300;
const ROWS_PER_PAGE = 10000;

const Form = ({getStatus,getFullName}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const id = url.includes("edit") && Number(url.replace(/\D+/g, ""));

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      tabValue: id ?"4":"1",
      ...cloneDeep(MEMBER_MODEL),
    }
  );

  const {
    tabValue,
    userId,
    fullName,
    jiraName,
    previousJiraName,
    empCode,
    departmentId,
    designation,
    email,
    phone,
    empStatus,
    reportingManager,
    functionalHeadId,
    empMode,
    joiningDateInNetsmartz,
    careerStartDate,
    totalExpAsOnDate,
    workLocation,
    workMode,
    workModeExceptionReason,
    profileLinkWord,
    profileLinkPdf,
    linkedInUrl,
    clientJira,
    isBytLead,
    internalJiraExemption,
    trainingToBeAssigned,
    projectMode,
    trainingName,
    trainingStartDate,
    trainingEndDate,
    comments,
    jiraFrequency,
    region,
    workingDays,
    weekDaysList,
    initialWorkingDays,
    isWorking,
    confirmJiraName,
    technologyDetails,
    projectDetails,
    resignationDate,
    relievingDate,
    releavingComments,
    empCodeExist,
    emailExist,
    mobileNoExist,
    openConfirmCancel
  } = localState;
  
  
  const finalExpAsOnDate = careerStartDate
    ? intervalToDuration({
        start: new Date(careerStartDate),
        end: new Date(),
      })
    : "";

  const [getAllDepartment, { data: departmentList }] =
    useLazyGetAllDepartmentQuery();
  const [getTrainingList, { data: trainingList }] =
    useLazyGetTrainingListQuery();
  const [addMember, { isFetching }] = useAddMemberMutation();
  const [getUserById, { isFetching: isUserFetching }] =
    useLazyGetUserByIdQuery();
  const [updateMember] = useUpdateMemberMutation();
  const [checkAvailable] = useCheckAvailableMutation();

  useEffect(()=>{
    if(empStatus === T.STABLE || empStatus === T.YET_TO_JOIN)
    {
      setLocalState({tabValue :"1"})
    }
  },[empStatus])
  const [getActiveProjectList, { data: activeProjectList }] = useLazyGetActiveProjectListQuery();
  
  useEffect(() => {
    getActiveProjectList({ page: INITIAL_PAGE, rowPerPage: ROWS_PER_PAGE });
    getAllDepartment({ page: INITIAL_PAGE, rowPerPage: ROWS_PER_PAGE });
    getTrainingList({ page: INITIAL_PAGE, rowPerPage: ROWS_PER_PAGE });
  }, []);
  

  const [
    projectManagers,
    functionalManagers,
    workLocationList,
    skillList,
    projectList,
  ] = usePMFetch();

  const projectListDetails = get(projectList, "results", []);
  
  useEffect(() => {
    if (careerStartDate) {
      setLocalState({
        totalExpAsOnDate: `${get(finalExpAsOnDate, "years", "")}.${get(
          finalExpAsOnDate,
          "months",
          ""
        )}`,
      });
    }
  }, [careerStartDate]);


  useEffect(()=>{
    getStatus(empStatus)
    getFullName(fullName)
  },[empStatus,fullName])

  const getBEDateFormat = (val) => format(val, BACKEND_DATE_FORMAT);

  const emptyTechDetails = {
    skillId: "",
    skillRating: 0,
    isPrimary: false,
    isSecondary: true,
  };

  const emptyProjectDetails = {
    projectId: "",
    startDate: null,
    endDate: null,
    projectManagerId: "",
    hoursAllocation: "",
    hoursAllocationCustom: "",
    isPrimary: false,
    isSecondary: true,
  };
  

  useEffect(() => {
    if (id)
      getUserById({ id })
        .unwrap()
        .then((res) => {
          const record = get(res, "results", {});
          const training = get(record, "userTraining[0]", {});
          const skills = get(record, "userSkills", []);
          const projects = get(record, "projects", []);
          
          const memberRecords = {
            userId: get(record, "id", ""),
            fullName: get(record, "userName", ""),
            empCode: get(record, "employeeCode", ""),
            empStatus: get(record, "empStatus", ""),
            departmentId: get(record, "userDepartment.id", ""),
            designation: get(record, "userDesignation", ""),
            email: get(record, "userEmailId", ""),
            phone: get(record, "userMobileNo", ""),
            jiraName : get(record, "jiraName", ""),
            previousJiraName : get(record, "jiraName", ""),
            reportingManager: get(record, "reportingManager.id", ""),
            functionalHeadId: get(record, "functionalHead.id", ""),
            empMode: get(record, "empMode", ""),
            joiningDateInNetsmartz: get(record, "joiningDateTime", null),
            careerStartDate: get(record, "careerStartDateTime", null),
            totalExpAsOnDate: `${get(record, "expInYears", 0)}.${get(
              record,
              "expInMonths",
              0
            )} ${T.YEARS.toLowerCase()}`,
            workLocation: get(record, "workLocation.id", ""),
            workMode: get(record, "workMode", ""),
            workModeExceptionReason: get(record, "wfoExceptionReason", ""),
            profileLinkWord: get(record, "profileLinkWord", ""),
            profileLinkPdf: get(record, "profileLinkPdf", ""),
            clientJira: get(record, "clientJira", ""),
            linkedInUrl: get(record, "linkedInUrl", ""),
            isBytLead: get(record, "isBytLead", ""),
            internalJiraExemption: get(record, "internalJiraExemption", ""),
            trainingToBeAssigned: get(record, "isTrainingToBeAssigned", ""),
            projectMode: get(record, "projectMode", ""),
            trainingName: get(training, "trainingName", ""),
            trainingStartDate: get(training, "startDate", null),
            trainingEndDate: get(training, "endDate", null),
            comments: get(record, "comments", ""),
            jiraFrequency: get(record, "jiraFrequency", ""),
            region: get(record, "region", ""),
            workingDays: get(record, "workingDays", []),
            technologyDetails:
              skills.length > 0
                ? skills.map((skill) => ({
                    skillId: get(skill, "skills.id", ""),
                    skillRating: get(skill, "rating", 0),
                    isPrimary: get(skill, "primary", false),
                    isSecondary: get(skill, "secondary", false),
                  }))
                : [emptyTechDetails],
            projectDetails:
              projects.length > 0
                ? projects.map((project) => ({
                    projectId: get(project, "project.id", ""),
                    startDate: get(project, "startDate", null),
                    endDate: get(project, "endDate", null),
                    projectManagerId: get(get(project, "project", {}),"projectManager.id",""),
                    hoursAllocationCustom: PROJECT_ALLOCATION.includes(
                      get(project, "hoursAllocation", "")
                    )
                      ? ""
                      : get(project, "hoursAllocation", ""),
                    hoursAllocation: PROJECT_ALLOCATION.includes(
                      get(project, "hoursAllocation", "")
                    )
                      ? get(project, "hoursAllocation", "")
                      : T.CUSTOM,
                    isPrimary: get(project, "primary", false),
                    isSecondary: get(project, "secondary", false),
                  }))
                : [emptyProjectDetails],
            resignationDate: get(record, "resignationDate", null),
            relievingDate: get(record, "releavingDate", null),
            releavingComments: get(record, "releavingComments", ""),
          };

          setLocalState(memberRecords);
        })
        .catch(handleError);
  }, [id]);

  const disableCondition = () => id && empStatus !== T.STABLE && empStatus !== T.YET_TO_JOIN;
  const handleTabChange = (event, newValue) => {
    if (handleValidation() && !disableCondition()) {
      toast.error(T.REQUIRED_FIELDS_EMPTY);
      return;
    }
    setLocalState({ tabValue: newValue });
  };
  const handleJiraNameChange= () =>{
    setLocalState({confirmJiraName:!confirmJiraName})
  } 
  const handleRevertChange= () =>{
    setLocalState({jiraName:previousJiraName})
    handleJiraNameChange();
  } 
  const onHandleChange = (event) => {
    const { name, value } = event.target;
    if (name === "workLocation") {
      const workLocObj = get(workLocationList, "results", []).find(
        (data) => data.id === value
      );
      const workLocName = get(workLocObj, "workLocationName", "");
      if (workLocName === T.WFH) {
        setLocalState({ workMode: T.WFH });
      }
    }
    setLocalState({ [name]: value });
  };

  // const onHandleFileChange = (event) => {
  //   const { name, files } = event.target;
  //   setLocalState({ [name]: get(files, "[0]", "") });
  // };

  const onHandleDateChange = (newValue, type) => {
    if(newValue!==null)
    {
      const validDate = new Date(newValue);
      if (isValid(validDate))
        setLocalState({ [type]: getBEDateFormat(validDate) });
    }
    else
    {
      setLocalState({[type]: null})
    }
  };

  const onHandleTechAddMore = () => {
    technologyDetails.push(emptyTechDetails);
    setLocalState({ technologyDetails });
  };

  const onHandleProjectAddMore = () => {
    projectDetails.push(emptyProjectDetails);
    setLocalState({ projectDetails });
  };

  const onHandleTechRemove = (index) => {
    technologyDetails.splice(index, 1);
    setLocalState({ technologyDetails });
  };

  const onHandleTechChange = (index, event) => {
    const { name, value } = event.target;
    technologyDetails[index][name] =
      name === "skillRating" ? parseFloat(value) : value;
    setLocalState({ technologyDetails });
  };

  const onHandleCheckboxChange = (index, event, type) => {
    const { name, checked } = event.target;

    if (type === T.TECHNOLOGY) {
      technologyDetails[index][name] = checked;
      technologyDetails[index]["isSecondary"] = !checked;
      setLocalState({ technologyDetails });
    } else {
      const checkPrimary = projectDetails
        .map((project) => project.isPrimary)
        .includes(true);

      if (checkPrimary){
         checkAndUpdateReportManager(projectDetails[index]);
         projectDetails.map((project) => {
           project.isPrimary = false ;
           project.isSecondary= true
         });
      }
      
      projectDetails[index][name] = checked;
      projectDetails[index]["isSecondary"] = !checked;

      setLocalState({ projectDetails });
    }
  };

  const handleWorkingDaysCheckboxChange =(event,index)=>{
    const {value,checked} =event.target;
    if(checked)
    {
      let newWorkingDays=[...workingDays]
            newWorkingDays=[...newWorkingDays,value]
        setLocalState({workingDays:newWorkingDays})
    }
    else {
      let newWorkingDays=[...workingDays]
            newWorkingDays=newWorkingDays.filter(item=>item!==value)
      setLocalState({workingDays:newWorkingDays})
    }
      
  }
  
  const onHandleProjectRemove = (index) => {
    projectDetails.splice(index, 1);
    setLocalState({ projectDetails });
  };

  const onHandleProjectChange = (index, event) => {
    const { name, value, checked } = event.target;
    projectDetails[index][name] = value || checked;
    setLocalState({ projectDetails });
  };

  const checkAndUpdateReportManager = (currentRecord) => {
    const endDate = new Date(get(currentRecord, "endDate", ""));
    const startDate = new Date(get(currentRecord, "startDate", ""));
    const differenceInMonth =
      isValid(startDate) && isValid(endDate)
        ? differenceInMonths(endDate, startDate)
        : 0;
    if (differenceInMonth > 2) {
      const currentProject = projectListDetails.find(
        (project) => project.id === currentRecord.projectId
      );

      setLocalState({
        reportingManager: get(currentProject, "projectManager.id", ""),
      });
    }
  };

  const onHandleProjectDateChange = (newValue, type, index) => {
    projectDetails[index][type] = getBEDateFormat(new Date(newValue));
    get(projectDetails[index],"isPrimary",false) && checkAndUpdateReportManager(projectDetails[index]);
    setLocalState({ projectDetails });
  };

  const onHandleAutoCompleteChange = (index, type, value, parent) => {
    switch (parent) {
      case T.SKILL:
        technologyDetails[index][type] = value;
        setLocalState({ technologyDetails });
        return;
      case T.PROJECT:
        projectDetails[index][type] = value;
        get(projectDetails[index],"isPrimary",false) && checkAndUpdateReportManager(projectDetails[index]);
        setLocalState({ projectDetails });
        return;
      case T.DEPARTMENT:
        setLocalState({ [type]: value });
        return;
      case T.REPORTING_MANAGER:
        setLocalState({ [type]: value });
        return;
      case T.FUNCTIONAL_MANAGER:
        setLocalState({ [type]: value });
        return;
      default:
        return;
    }
  };

  // const allocationHoursLeft =
  //   TOTAL_ALLOCATION_HOURS -
  //   sum(projectDetails.map((data) => data.hoursAllocation).filter((n) => n));

  const allocationHoursLeft =
    TOTAL_ALLOCATION_HOURS -
    sum((projectDetails.filter((data) => new Date(data.endDate)> new Date())).map((data)=>data.hoursAllocation).filter((n) => n));
    


  const isRecordAvailable = useCallback(
    debounce((event) => {
      const { name, value } = event.target;
      const payload = {
        [name === "phone" ? "mobileNo" : name]: value,
      };
      if(name==="empCode"){
        setLocalState({empCodeExist:false})
      }
      if(name==="email"){
        setLocalState({emailExist:false})
      }
      if(name==="phone"){
        setLocalState({mobileNoExist:false})
      }
      checkAvailable(payload)
        .unwrap()
        .then((res) => {
          if(id)
          {
            getUserById({ id })
              .unwrap().then(resp=>{
                const userData=get(resp,"results",{});
                const userEmpCode = get(userData,"employeeCode","");
                const userMobile  = get(userData,"userMobileNo","")
                const userEmail  = get(userData,"userEmailId","")
                  if (res) {
                    if(name==="empCode")
                    {
                      if(userEmpCode===value)
                      {
                        setLocalState({empCodeExist:false})
                      }
                      else{
                        setLocalState({empCodeExist:res})
                        toast.error(`${T.EMP_CODE} Already Exist`)
                      }
                    }
                    if(name==="email"){
                      if(userEmail===value)
                      {
                        setLocalState({emailExist:false})
                      }
                      else{
                        setLocalState({emailExist:res})
                        toast.error(`${T.EMAIL_ID} Already Exist`)
                      }
                    }
                    if(name==="phone"){
                      if(userMobile===value)
                      {
                        setLocalState({mobileNoExist:false})
                      }
                      else{
                        setLocalState({mobileNoExist:res})
                        toast.error(`${T.PHONE} ${T.NUMBER} Already Exist`)
                      }
                    }
                    // toast.error( `
                    // ${name==="empCode"?T.EMP_CODE
                    // :
                    // name==="phone"?`${T.PHONE} ${T.NUMBER} `
                    // :
                    // name==="email"&& T.EMAIL_ID  } Already Exist`);
                  }
              })
          }
          else
          {
            if (res) {
              if(name==="empCode")
              {
                setLocalState({empCodeExist:res})
              }
              if(name==="email"){
                setLocalState({emailExist:res})
              }
              if(name==="phone"){
                setLocalState({mobileNoExist:res})
              }
              toast.error( `
              ${name==="empCode"?T.EMP_CODE
              :
              name==="phone"?`${T.PHONE} ${T.NUMBER} `
              :
              name==="email"&& T.EMAIL_ID  } Already Exist`);
            }

          }
        })
        .catch(handleError);
    }, DEBOUNCE_TIME),
    []
  );

  const renderContent = () => ({
    id,
    empStatus,
    clientJira,
    isBytLead,
    jiraName,
    previousJiraName,
    internalJiraExemption,
    projectMode,
    trainingToBeAssigned,
    trainingName,
    trainingStartDate,
    trainingEndDate,
    comments,
    technologyDetails,
    skillList,
    trainingList,
    jiraFrequency,
    region,
    workingDays,
    weekDaysList,
    initialWorkingDays,
    isWorking,
    confirmJiraName,
    onHandleChange,
    handleJiraNameChange,
    handleRevertChange,
    onHandleCheckboxChange,
    handleWorkingDaysCheckboxChange,
    onHandleDateChange,
    onHandleTechAddMore,
    onHandleTechChange,
    onHandleTechRemove,
    onHandleAutoCompleteChange,
  });
  
  const renderBasicContent = () => ({
    id,
    empStatus,
    fullName,
    empCode,
    departmentId,
    designation,
    email,
    phone,
    reportingManager,
    functionalHeadId,
    empMode,
    joiningDateInNetsmartz,
    careerStartDate,
    totalExpAsOnDate,
    workLocation,
    workMode,
    workModeExceptionReason,
    linkedInUrl,
    profileLinkWord,
    profileLinkPdf,
    departmentList,
    projectManagers,
    functionalManagers,
    workLocationList,
    isRecordAvailable,
    empCodeExist,
    emailExist,
    mobileNoExist,
    onHandleChange,
    // onHandleFileChange,
    onHandleDateChange,
    onHandleAutoCompleteChange,
  });

  const renderProjectContent = () => ({
    id,
    empStatus,
    projectDetails,
    activeProjectList,
    projectList,
    reportingManager,
    projectManagers,
    allocationHoursLeft,
    getBEDateFormat,
    onHandleChange,
    onHandleCheckboxChange,
    onHandleProjectDateChange,
    onHandleAutoCompleteChange,
    onHandleProjectAddMore,
    onHandleProjectChange,
    onHandleProjectRemove,
  });

  const handleClose = () => {
    navigate("/app/members", { state: { showActive: !(empStatus === T.RELIEVED || empStatus === T.DID_NOT_JOIN 
      || empStatus === T.SEPARATED || empStatus === T.ABSCONDED) } });
  };

  const getAllocationHrs = (allocationHoursLeft) => {
    if (allocationHoursLeft === 160) return 1;
    if (allocationHoursLeft > 0) return 2;
    else return 0;
  };

  const projects = projectDetails.filter(
    (data) =>
      data.projectId !== "" && data.startDate !== "" && data.endDate !== ""
  );
  const userSkills = technologyDetails.filter((data) => data.skillId !== "");
  const getPayload = () => {
    const payload = {
      careerStartDate: careerStartDate,
      clientJira,
      comments,
      jiraFrequency,
      region,
      workingDays,
      departmentId,
      designation: startCase(designation),
      email,
      empCode,
      functionalHeadId,
      empMode,
      isBytLead:isBytLead,
      internalJiraExemption,
      isAvailabilitySheet: allocationHoursLeft > 0,
      isPartialAllocation: getAllocationHrs(allocationHoursLeft),
      joiningDate: joiningDateInNetsmartz
        ? joiningDateInNetsmartz.split(" ")[0]
        : null,
      locationId: workLocation,
      mobileNo: phone,
      projectMode,
      reportingManager,
      expInYears: get(finalExpAsOnDate, "years", 0),
      expInMonths: get(finalExpAsOnDate, "months", 0),
      trainingToBeAssigned,
      userName: startCase(fullName),
      jiraName,
      wfoExceptionReason: workModeExceptionReason,
      profileLinkWord : profileLinkWord,
      profileLinkPdf : profileLinkPdf,
      linkedInUrl : linkedInUrl,
      workMode,
      projects,
      userSkills
    };


    projects.map((project) => {
      return project.hoursAllocationCustom !== ""
        ? (project.hoursAllocation = project.hoursAllocationCustom)
        : project;
    });

    

    if (projects.length > 0)
      payload["projects"] = projects.filter(
        (project) => delete project["hoursAllocationCustom"]
      );

    if (userSkills.length > 0) payload["userSkills"] = userSkills;

    if (trainingToBeAssigned) {
      payload["training"] = {
        endDate: trainingEndDate,
        startDate: trainingStartDate,
        trainingName: startCase(trainingName),
      };
    }

    if (userId || id) {
      payload["id"] = userId || id;
      payload["resignationDate"] = resignationDate;
      payload["releavingComments"] = releavingComments;
      payload["releavingDate"] = relievingDate;
    }

    return payload;
  };
  
  const handleValidation = () =>
    (empStatus === "" || empStatus === T.STABLE || empStatus === T.YET_TO_JOIN )
    &&
    !email || 
    !fullName ||
    isEmptyString(fullName) || 
    !empCode || 
    isEmptyString(empCode) || 
    !departmentId ||
    !designation || 
    isEmptyString(designation) || 
    !phone ||
    !reportingManager ||
    !functionalHeadId ||
    !empMode ||
    !workLocation ||
    !workMode ||
    !careerStartDate ||
    !joiningDateInNetsmartz ||
    (phone && !isMobileNo(phone)) ||
    (email && !isEmail(email))
    ||
    (emailExist ||
    mobileNoExist ||
    empCodeExist)

  const handleWorkDetailsValidations = () => !jiraFrequency || !workingDays || workingDays.length ===0;

  const handleAdd = (payload) => {
    addMember(payload)
      .unwrap()
      .then(() => {
        toast.success(T.USER_CREATED_SUCCESSFULLY);
        handleClose();
      })
      .catch(handleError);
  };

  const handleUpdate = (payload) => {
    updateMember(payload)
      .unwrap()
      .then(() => {
        toast.success(T.USER_UPDATED_SUCCESSFULLY);
        handleClose();
      })
      .catch(handleError);
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      toast.error(T.REQUIRED_FIELDS_EMPTY);
      return;
    } else {
      const payload = getPayload();
      const filteredPayload = Object.keys(payload)
        .filter((f) => payload[f])
        .reduce((r, i) => {
          r[i] = payload[i];
          return r;
        }, {});

      if (id) {
        handleUpdate(filteredPayload);
        navigate("/app/members", { state: { showActive: empStatus === T.STABLE || empStatus === T.YET_TO_JOIN 
        || empStatus === T.RESIGNED  } });
      } 
      else {
        handleAdd(filteredPayload);
        navigate("/app/members", { state: { showActive: !(empStatus === T.RELIEVED || empStatus === T.DID_NOT_JOIN 
        || empStatus === T.SEPARATED || empStatus === T.ABSCONDED) } });
      }
    }
  };

  const handleSaveNContinue = () => {
    if (tabValue === "1" && handleValidation()) {
      toast.error(T.REQUIRED_FIELDS_EMPTY);
      return;
    }
    if(tabValue === "2" && handleWorkDetailsValidations())
    { 
      toast.error(T.REQUIRED_FIELDS_EMPTY);
      return;
    }
    setLocalState({ tabValue: (parseInt(tabValue) + 1).toString() });
  };
  const confrmCancelModal =() =>{
    setLocalState({openConfirmCancel:!openConfirmCancel})
  }
  
  const submitCondition = 
  (tabValue === "4" && id) || 
  (tabValue === "3" && id && empStatus === T.STABLE) ||
  (tabValue === "3" && id && empStatus === T.YET_TO_JOIN) ||
   (tabValue === "3"  && !id);

  return (
    <TabContext value={tabValue}>
      {(isFetching || isUserFetching) && <MISLoader />}
      <TabList
        variant="scrollable"
        onChange={handleTabChange}
        aria-label="lab API tabs example"
        sx={{
          "& .MuiTab-root.Mui-selected": {
            color: BACKGROUND.black,
          },
          "& .MuiTabs-indicator": {
            left: 0,
            backgroundColor: NETSMARTZ_THEME_COLOR,
          },
          "& .MuiTab-root": {
            fontWeight: 600,
          },
        }}
      >
        <Tab label={T.BASIC_DETAILS} value="1" />
        <Tab label={T.WORK_DETAILS} value="2" />
        <Tab label={T.PROJECT_DETAILS} value="3" />
        {(id || userId) &&
          [T.DID_NOT_JOIN, T.RESIGNED, T.ABSCONDED, T.RELIEVED].includes(empStatus) && (
            <Tab label={T.EXIT_DETAILS} value="4" />
          )}
      </TabList>

      <Box
        mb={2}
        sx={{
          height: "calc(100vh - 270px)",
          overflowY: "auto",
        }}
      >
        <TabPanel value="1">
          <BasicDetails {...renderBasicContent()} />
        </TabPanel>
        <TabPanel value="2">
          <WorkDetails {...renderContent()} />
        </TabPanel>
        <TabPanel value="3">
          <ProjectDetails {...renderProjectContent()} />
        </TabPanel>

        <TabPanel value="4">
          <ExitDetails
            id={id}
            empStatus={empStatus}
            resignationDate={resignationDate}
            relievingDate={relievingDate}
            releavingComments={releavingComments}
            onHandleChange={onHandleChange}
            onHandleDateChange={onHandleDateChange}
          />
        </TabPanel>
      </Box>

      <MISFooterButton
        id={id}
        tab={tabValue}
        empStatus={empStatus}
        proceedButtonText={submitCondition ? T.SUBMIT : T.SAVE_AND_CONTINUE}
        justify="end"
        disableProceed={handleValidation()}
        sx={{ pb: 0.5 }}
        handleClose={confrmCancelModal}
        handleEditSubmit = {handleSubmit}
        handleSubmit={submitCondition ? handleSubmit : handleSaveNContinue}
      />
      <ConfirmCancel
      openConfirmCancel={openConfirmCancel}
      confrmCancelModal={confrmCancelModal}
      handleClose={handleClose}
          
      />
    </TabContext>
  );
};

export default Form;
