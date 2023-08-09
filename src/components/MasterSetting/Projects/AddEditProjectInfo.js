import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { orderBy, noop } from "lodash";
import { Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { get } from "utils/lodash";
import { format, isValid } from "date-fns";

import MISFooterButton from "components/common/MISFooterButton";
import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";
import MISAutocomplete from "components/common/MISAutocomplete";
import MISDialog from "components/common/MISDialog";
import usePMFetch from "hooks/usePMFetch";
import T from "T";
import { handleError } from "utils/error";
import { BACKEND_DATE_FORMAT } from "settings/constants/date";
import { useSaveProjectMutation } from "api/projects/saveProject";
import { useUpdateProjectMutation } from "api/projects/updateProject";
import { useLazyGetProjectByIdQuery } from "api/projects/getProjectById";

const AddEditProjectInfo = ({
  openAddEditProjectInfo = false,
  editId = "",
  handleAddEditProjectInfoDialog = noop,
  refreshTable = noop,
}) => {
  const [getProjectById] = useLazyGetProjectByIdQuery();
  const [saveProject] = useSaveProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const defaultLocalState = {
    projectName: "",
    startDate: null,
    endDate: null,
    projectManager: "",
    functionalManager: "",
  };

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    defaultLocalState
  );

  const { projectName, startDate, endDate, projectManager, functionalManager } =
    localState;

  const [projectManagers, functionalManagers] = usePMFetch();

  const pMResults = get(projectManagers, "results", []);
  const fMResults = get(functionalManagers, "results", []);

  const selectedPM = pMResults.find((res) => res.id === projectManager) || {};
  const selectedFM =
    fMResults.find((res) => res.id === functionalManager) || {};

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

  const handleAddEditProjectInfo = () => {
    const payload = {
      endDate,
      fhId: functionalManager,
      name: projectName,
      pmId: projectManager,
      startDate,
      id: editId,
    };

    editId
      ? updateProject(payload)
          .unwrap()
          .then(() => {
            handleClose();
            toast.success(T.PROJECT_UPDATED_SUCCESSFULLY);
          })
          .catch(handleError)
      : saveProject(payload)
          .unwrap()
          .then(() => {
            handleClose();
            toast.success(T.PROJECT_ADDED_SUCCESSFULLY);
          })
          .catch(handleError);
  };

  const handleClose = () => {
    resetState();
    handleAddEditProjectInfoDialog();
    refreshTable();
  };

  return (
    <MISDialog open={openAddEditProjectInfo}>
      <Typography
        variant="h6"
        textAlign="center"
        p={`10px 100px`}
        fontWeight="600"
      >
        {editId === "" ? T.ADD_NEW_PROJECT_DETAILS : T.EDIT_PROJECT_DETAILS}
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
            label={T.PROJECT_NAME.toUpperCase()}
            placeholder={T.PROJECT_NAME}
            size="small"
            variant="outlined"
            name="projectName"
            value={projectName}
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
          <MISAutocomplete
            label={T.PROJECT_MANAGER.toUpperCase()}
            listDetails={orderBy(pMResults, ["name"], ["asc"])}
            value={selectedPM}
            required
            getByLabelText={(option) => get(option, "name", "")}
            onHandleChange={(event, newValue) =>
              onHandleAutoCompleteChange(
                "projectManager",
                get(newValue, "id", "")
              )
            }
          />
        </Grid>

        <Grid item xs={6}>
          <MISAutocomplete
            label={T.FUNCTIONAL_MANAGER.toUpperCase()}
            listDetails={orderBy(fMResults, ["name"], ["asc"])}
            value={selectedFM}
            required
            getByLabelText={(option) => get(option, "name", "")}
            onHandleChange={(event, newValue) =>
              onHandleAutoCompleteChange(
                "functionalManager",
                get(newValue, "id", "")
              )
            }
          />
        </Grid>
      </Grid>

      <MISFooterButton
        proceedButtonText={T.SAVE}
        justify="center"
        size="medium"
        disableProceed={
          !projectName ||
          !startDate ||
          !endDate ||
          !projectManager ||
          !functionalManager
        }
        sx={{ p: 1, m: 1 }}
        handleClose={()=>{handleAddEditProjectInfoDialog();resetState()}}
        handleSubmit={handleAddEditProjectInfo}
      />
    </MISDialog>
  );
};

AddEditProjectInfo.propTypes = {
  openAddEditProjectInfo: PropTypes.bool,
  editId: PropTypes.string,
  handleAddEditProjectInfoDialog: PropTypes.func,
  refreshTable: PropTypes.func,
};

export default AddEditProjectInfo;
