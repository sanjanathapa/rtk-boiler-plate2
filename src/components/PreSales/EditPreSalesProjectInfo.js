import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import { Grid, Typography } from "@mui/material";
import { get } from "utils/lodash";
import { format, isValid } from "date-fns";

import MISFooterButton from "components/common/MISFooterButton";
import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";
import MISDialog from "components/common/MISDialog";
import T from "T";
import { handleError } from "utils/error";
import { BACKEND_DATE_FORMAT } from "settings/constants/date";
import { useSaveProjectMutation } from "api/projects/saveProject";
import { useUpdateProjectMutation } from "api/projects/updateProject";
import { useLazyGetProjectByIdQuery } from "api/projects/getProjectById";

const EditPreSalesProjectInfo = ({
  openEditProjectDialog = false,
  editId = "",
  handleEditProjectInfoDialog = noop,
  refreshTable = noop,
}) => {
  const [getProjectById] = useLazyGetProjectByIdQuery();
  const [saveProject] = useSaveProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const defaultLocalState = {
      proposalName: "",
      startDate: null,
      endDate: null,
      budget: "",
      createdBy: "",
      primarySkillRequired: "",
      secondarySkillRequired: "",
  };

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    defaultLocalState
  );

  const { 
    proposalName,
    startDate,
    endDate,
    budget,
    createdBy,
    primarySkillRequired,
    secondarySkillRequired
   } =
    localState;


  useEffect(() => {
    if (editId) {
      getProjectById({ id: editId })
        .unwrap()
        .then((res) => {
          const results = get(res, "results", []);
          setLocalState({
            startDate: get(results, "startDate", null),
            endDate: get(results, "endDate", null),
            projectName: get(results, "name", null),
            projectManager: get(results, "projectManager", {}).id,
            functionalManager: get(results, "projectFunctionalHead", {}).id,
          });
        })
        .catch(handleError);
    }
  }, [editId]);

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

  const resetState = () => {
    setLocalState(defaultLocalState);
  };

  const handleEditProjectInfo = () => {
    
    // const payload = {
    //   endDate,
    //   fhId: functionalManager,
    //   name: projectName,
    //   pmId: projectManager,
    //   startDate,
    //   id: editId,
    // };

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
    handleEditProjectInfoDialog();
    refreshTable();
  };

  return (
    <MISDialog open={openEditProjectDialog}>
      <Typography
        variant="h6"
        textAlign="center"
        p={`10px 100px`}
        fontWeight="600"
      >
        {T.EDIT_PROJECT_DETAILS}
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
          width:"50vw"
        }}
      >
        <Grid item xs={6}>
          <MISTextField
            fullWidth
            label={T.PROPOSAL_NAME.toUpperCase()}
            placeholder={T.PROPOSAL_NAME}
            size="small"
            variant="outlined"
            name="proposalName"
            value={proposalName}
            required
            onChange={onHandleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <MISDatePicker
            label={T.START_DATE.toUpperCase()}
            placeholder={T.START_DATE}
            inputFormat="MM/DD/YYYY"
            value={startDate}
            required
            name="startDate"
            handleChange={onHandleDateChange}
            renderInput={(params) => <MISTextField {...params} />}
          />
        </Grid>

        <Grid item xs={6}>
          <MISDatePicker
            label={T.END_DATE.toUpperCase()}
            placeholder={T.END_DATE}
            inputFormat="MM/DD/YYYY"
            value={endDate}
            required
            name="endDate"
            handleChange={onHandleDateChange}
            renderInput={(params) => <MISTextField {...params} />}
          />
        </Grid>

        <Grid item xs={6}>
          <MISTextField
            fullWidth
            label={T.BUDGET.toUpperCase()}
            placeholder={T.BUDGET}
            size="small"
            variant="outlined"
            name="budget"
            value={budget}
            required
            onChange={onHandleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <MISTextField
            fullWidth
            label={T.CREATED_BY.toUpperCase()}
            placeholder={T.CREATED_BY}
            size="small"
            variant="outlined"
            name="createdBy"
            value={createdBy}
            required
            onChange={onHandleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <MISTextField
            fullWidth
            label={T.PRIMARY_SKILL_REQUIRED.toUpperCase()}
            placeholder={T.PRIMARY_SKILL_REQUIRED}
            size="small"
            variant="outlined"
            name="primarySkillRequired"
            value={primarySkillRequired}
            required
            onChange={onHandleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <MISTextField
            fullWidth
            label={T.SECONDARY_SKILL_REQUIRED.toUpperCase()}
            placeholder={T.SECONDARY_SKILL_REQUIRED}
            size="small"
            variant="outlined"
            name="secondarySkillRequired"
            value={secondarySkillRequired}
            required
            onChange={onHandleChange}
          />
        </Grid>
      </Grid>

      <MISFooterButton
        proceedButtonText={T.SAVE}
        justify="center"
        size="medium"
        disableProceed={
          !proposalName ||
          !startDate ||
          !endDate ||
          !budget ||
          !createdBy ||
          !primarySkillRequired ||
          !secondarySkillRequired 
        }
        sx={{ p: 1, m: 1 }}
        handleClose={()=>{handleEditProjectInfoDialog();resetState()}}
        handleSubmit={handleEditProjectInfo}
      />
    </MISDialog>
  );
};

EditPreSalesProjectInfo.propTypes = {
  openAddEditProjectInfo: PropTypes.bool,
  editId: PropTypes.string,
  handleEditProjectInfoDialog: PropTypes.func,
  refreshTable: PropTypes.func,
};

export default EditPreSalesProjectInfo;
