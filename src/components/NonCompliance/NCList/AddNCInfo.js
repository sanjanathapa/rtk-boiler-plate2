import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { orderBy, noop, capitalize } from "lodash";
import { Grid, MenuItem, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { get } from "utils/lodash";
import { format, isValid } from "date-fns";

import MISFooterButton from "components/common/MISFooterButton";
import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";
import MISAutocomplete from "components/common/MISAutocomplete";
import MISDialog from "components/common/MISDialog";
import T from "T";
import { handleError } from "utils/error";
import { BACKEND_DATE_FORMAT } from "settings/constants/date";
import { EMP_MODE_LIST, JIRA_FREQUENCY, TYPES_OF_NC } from "components/Members/Member/memberModel";
import { useLazyGetActiveProjectListQuery } from "api/projects/getActiveProjectList";
import { PAGINATION } from "settings/constants/pagination";
import { canAddNC } from "utils/permissions";
import usePMFetch from "hooks/usePMFetch";
const { INITIAL_PAGE } = PAGINATION;
const ROWS_PER_PAGE = 10000;
const AddNCInfo = ({
  openAddNCInfo = false,
  handleAddNCInfoDialog = noop,
  refreshTable = noop,
}) => {
  
  const [getActiveProjectList, { data: activeProjectList }] = useLazyGetActiveProjectListQuery();
    
  useEffect(() => {
    getActiveProjectList({ page: INITIAL_PAGE, rowPerPage: ROWS_PER_PAGE });
  }, []);
  const defaultLocalState = {
    userType: "",
    name: "",
    ncBasis: "",
    ncDate: null,
    ncType: "",
    projectName: "",
    projectManager: "",
    reportingManager: "",
    comments: "",
  };

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    defaultLocalState
  );

  const { userType, name, ncBasis, ncDate, ncType, projectName, projectManager, reportingManager, comments} = localState;
  const [projectManagers] = usePMFetch();
  const projectListDetails = get(activeProjectList, "results", []);
  const selectedProject = projectListDetails.find((res) => res.id === projectName) || {};
  const pMResults = get(projectManagers, "results", []);
  const selectedPM = pMResults.find((res) => res.id === reportingManager) || {};

  useEffect(()=>{
    if(projectName && ncType!==T.JIRA)
    {
      setLocalState({projectManager:get(selectedProject,"projectManager.id",""),reportingManager:""})
    }
    else if(ncType===T.JIRA)
    {
      setLocalState({projectName:"",projectManager:""})
    }
  },[projectName,ncType])
  
  const getBEDateFormat = (val) => format(val, BACKEND_DATE_FORMAT);
  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };
  const onHandleDateChange = (newValue, type) => {
    const validDate = newValue ? new Date(newValue) : null;

    setLocalState({
      [type]:
        validDate && isValid(validDate) ? getBEDateFormat(validDate) : null,
    });
  };
  const onHandleAutoCompleteChange = (type, value) => {
    setLocalState({ [type]: value });
  };
  const onHandleRMAutoCompleteChange = (index, type, value, parent) => {
        setLocalState({ [type]: value });
     
  };
  const resetState = () => {
    setLocalState(defaultLocalState);
  };
  const handleAddNCInfo = () => {
    const payload = {
      userType,
      name,
      ncBasis,
      ncDate,
      ncType,
      projectName,
      projectManager,
      reportingManager
    };
    
    // editId
    //   ? updateProject(payload)
    //       .unwrap()
    //       .then(() => {
    //         handleClose();
    //         toast.success(T.PROJECT_UPDATED_SUCCESSFULLY);
    //       })
    //       .catch(handleError)
    //   : saveProject(payload)
    //       .unwrap()
    //       .then(() => {
    //         handleClose();
    //         toast.success(T.PROJECT_ADDED_SUCCESSFULLY);
    //       })
    //       .catch(handleError);
  };

  const handleClose = () => {
    resetState();
    handleAddNCInfoDialog();
    refreshTable();
  };

  return (
    <MISDialog open={openAddNCInfo}>
      <Typography
        variant="h6"
        textAlign="center"
        p={`10px 100px`}
        fontWeight="600"
      >
        {T.CREATE_NON_COMPLIANCE}
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          "& .MuiFormLabel-root": {
            "& .MuiTypography-root": {
              color: "text.popupLabel",
              fontSize: 14,
              fontWeight: 600,
            },
          },
        }}
      >
        <Grid item xs={6}>
            <MISTextField
            label={`${(T.USER).toUpperCase()} ${(T.TYPE).toUpperCase()}`}
            placeholder = {T.SELECT_OPTION}
            fullWidth
            select
            size="small"
            variant="outlined"
            name="userType"
            value={[userType]}
            required
            onChange={onHandleChange}
            >
            <MenuItem value="">{T.SELECT_OPTION}</MenuItem>
            {EMP_MODE_LIST.map((val) => {
                return (
                <MenuItem value={val}>
                    <Typography noWrap>{val}</Typography>
                </MenuItem>
                );
            })}
            </MISTextField>
        </Grid>

        <Grid item xs={6}>
            <MISTextField
            label={(T.NAME).toUpperCase()}
            required
            fullWidth
            placeholder={T.NAME}
            autoComplete="on"
            size="small"
            variant="outlined"
            name="name"
            value={name}
            onChange={onHandleChange}
            />
        </Grid>

        <Grid item xs={6}>
            <MISTextField
            label={`${(T.NC_BASIS).toUpperCase()}`}
            placeholder = {T.SELECT_OPTION}
            fullWidth
            select
            size="small"
            variant="outlined"
            name="ncBasis"
            value={[ncBasis]}
            required
            onChange={onHandleChange}
            >
            <MenuItem value="">{`${T.DAILY}/${T.WEEKLY}`}</MenuItem>
            {JIRA_FREQUENCY.map((val) => {
                return (
                <MenuItem value={val}>
                    <Typography noWrap>{val}</Typography>
                </MenuItem>
                );
            })}
            </MISTextField>
        </Grid>


        <Grid item xs={6}>
          <MISDatePicker
            label={T.DATE_OF_NC.toUpperCase()}
            placeholder={T.DATE_OF_NC}
            inputFormat="MM/DD/YYYY"
            value={ncDate}
            disableFuture
            required
            name="ncDate"
            handleChange={onHandleDateChange}
            renderInput={(params) => <MISTextField {...params} />}
          />
        </Grid>

        <Grid item xs={6}>
            <MISTextField
            label={`${T.NC_TYPE.toUpperCase()}`}
            placeholder = {T.SELECT_OPTION}
            fullWidth
            select
            size="small"
            variant="outlined"
            name="ncType"
            value={[ncType]}
            required
            onChange={onHandleChange}
            >
            <MenuItem value="">{T.SELECT_OPTION}</MenuItem>
            {TYPES_OF_NC.map((val) => {
                return (
                <MenuItem value={val}>
                    <Typography noWrap>{val}</Typography>
                </MenuItem>
                );
            })}
            </MISTextField>
        </Grid>


        <Grid item xs={6}>
          <MISAutocomplete
            label={T.PROJECT_NAME.toUpperCase()}
            listDetails={projectListDetails}
            disabled ={ncType===T.JIRA}
            value={ncType!==T.JIRA?selectedProject:""}
            required
            getByLabelText={(option) => get(option, "name", "")}
            onHandleChange={(event, newValue) =>{
                onHandleAutoCompleteChange(
                  "projectName",
                  get(newValue, "id", "")
                )
                }
              }
          />
        </Grid>

        {
          ncType!==T.JIRA?
          <Grid item xs={6}>
            <MISTextField
            label={(T.PROJECT_MANAGER).toUpperCase()}
            required
            fullWidth
            placeholder={T.PROJECT_MANAGER}
            disabled
            autoComplete="on"
            size="small"
            variant="outlined"
            name="projectManager"
            value={ncType!==T.JIRA?[get(selectedProject,"projectManager.name","")]:""}
            />
        </Grid>
        :
        <Grid item xs={6}>
            <MISAutocomplete
              label={T.REPORTING_MANAGER}
              listDetails={orderBy(pMResults, ["name"], ["asc"])}
              value={selectedPM}
              required
              getByLabelText={(option) => get(option, "name", "")}
              onHandleChange={(event, newValue) =>
                onHandleRMAutoCompleteChange(
                  "",
                  "reportingManager",
                  get(newValue, "id", ""),
                  T.REPORTING_MANAGER
                )
              }
            />
        </Grid>
        
      }

        <Grid item xs={12}>
            <MISTextField
                label={`${T.COMMENTS.toUpperCase()}`}
                fullWidth
                placeholder={T.WRITE_YOUR_COMMENTS}
                size="small"
                variant="outlined"
                name="comments"
                value={comments}
                required
                onChange={onHandleChange}
                multiline
                rows={4}
            />
        </Grid>
      </Grid>

      <MISFooterButton
        proceedButtonText={T.CREATE}
        justify="center"
        size="medium"
        disableProceed={
          !userType ||
          !name ||
          !ncBasis ||
          !ncDate ||
          !ncType ||
          !comments ||
          (ncType!==T.JIRA && !projectName ) ||
          (ncType===T.JIRA && !reportingManager )
        }
        disabled={!canAddNC()}
        sx={{ p: 1, m: 1 }}
        handleClose={()=>{handleAddNCInfoDialog();resetState()}}
        handleSubmit={handleAddNCInfo}
      />
    </MISDialog>
  );
};

AddNCInfo.propTypes = {
  openAddNCInfo: PropTypes.bool,
  handleAddNCInfoDialog: PropTypes.func,
  refreshTable: PropTypes.func,
};

export default AddNCInfo;
