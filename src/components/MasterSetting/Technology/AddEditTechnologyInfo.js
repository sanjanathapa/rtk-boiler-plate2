import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import { Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { get } from "utils/lodash";

import MISFooterButton from "components/common/MISFooterButton";
import MISTextField from "components/common/MISTextField";
import MISDialog from "components/common/MISDialog";
import T from "T";
import { handleError } from "utils/error";
import { useLazyGetSkillByIdQuery } from "api/skills/getSkillById";
import { useSaveSkillMutation } from "api/skills/saveSkill";
import { useUpdateSkillMutation } from "api/skills/updateSkill";

const AddEditTechnologyInfo = ({
  openAddEditTechnologyInfo = false,
  editId = "",
  handleAddEditTechnologyInfoDialog = noop,
  refreshTable = noop,
}) => {
  const [getSkillById] = useLazyGetSkillByIdQuery();
  const [saveSkill] = useSaveSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();

  const defaultLocalState = {
    skillName: "",
  };

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    defaultLocalState
  );

  const { skillName } = localState;

//   const [projectManagers, functionalManagers] = usePMFetch();
//   const pMResults = get(projectManagers, "results", []);
//   const fMResults = get(functionalManagers, "results", []);
//   const selectedPM = pMResults.find((res) => res.id === projectManager) || {};
//   const selectedFM =
//     fMResults.find((res) => res.id === functionalManager) || {};

  useEffect(() => {
    if (editId) {
      getSkillById({ id: editId })
        .unwrap()
        .then((res) => {
          const skill = get(res, "skillName", []);
          
          setLocalState({
            skillName: skill,
          });
        })
        .catch(handleError);
    }
  }, [editId]);

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };

  
  const resetState = () => {
    setLocalState(defaultLocalState);
  };

  const handleAddEditProjectInfo = () => {
    const payload = {
      skillName,
      id: editId,
    };

    editId
      ? updateSkill(payload)
          .unwrap()
          .then(() => {
            handleClose();
            toast.success(T.SKILL_UPDATED_SUCCESSFULLY);
          })
          .catch(handleError)
      : saveSkill(payload)
          .unwrap()
          .then(() => {
            handleClose();
            toast.success(T.SKILL_ADDED_SUCCESSFULLY);
          })
          .catch(handleError);
  };

  const handleClose = () => {
    resetState();
    handleAddEditTechnologyInfoDialog();
    refreshTable();
  };

  return (
    <MISDialog open={openAddEditTechnologyInfo}>
      <Typography
        variant="h6"
        textAlign="center"
        p={`10px 100px`}
        fontWeight="600"
      >
        {editId === "" ? T.ADD_NEW_TECHNOLOGY : T.EDIT_TECHNOLOGY}
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
        <Grid item xs={12}>
          <MISTextField
            fullWidth
            label={T.TECHNOLOGY_NAME.toUpperCase()}
            placeholder={T.NEW_TECHNOLOGY}
            size="small"
            variant="outlined"
            name="skillName"
            value={skillName}
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
          !skillName  
        }
        sx={{ p: 1, m: 1 }}
        handleClose={()=>{handleAddEditTechnologyInfoDialog();resetState()}}
        handleSubmit={handleAddEditProjectInfo}
      />
    </MISDialog>
  );
};

AddEditTechnologyInfo.propTypes = {
  openAddEditTechnologyInfo: PropTypes.bool,
  editId: PropTypes.string,
  handleAddEditTechnologyInfoDialog: PropTypes.func,
  refreshTable: PropTypes.func,
};

export default AddEditTechnologyInfo;
