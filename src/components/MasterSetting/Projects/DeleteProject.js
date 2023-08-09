import React, { useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Grid, Typography } from "@mui/material";

import T from "T";
import MISDialog from "components/common/MISDialog";
import MISTextField from "components/common/MISTextField";
import MISFooterButton from "components/common/MISFooterButton";
import { useDeleteProjectMutation } from "api/projects/deleteProject";
import { handleError } from "utils/error";

const DeleteProject = ({
  openDeleteProject = false,
  projectId = "",
  refreshView = noop,
  handleDeleteProjectDialog = noop,
}) => {
  const [deleteProject] = useDeleteProjectMutation();

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      comments: "",
    }
  );
  const { comments } = localState;

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };

  const resetState = () => {
    setLocalState({ comments: "" });
    handleDeleteProjectDialog();
    refreshView();
  };

  const handleDeleteProject = () => {
    deleteProject({ id: projectId })
      .unwrap()
      .then(() => {
        resetState();
      })
      .catch(handleError);
  };

  return (
    <MISDialog open={openDeleteProject}>
      <Typography
        variant="h6"
        fontWeight={500}
        textAlign="center"
        p={`5px 30px`}
        mt={2}
      >
        {T.DELETE_PROJECT_STATEMENT}
      </Typography>

      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item xs={12} sx={{ pt: 2 }}>
          <MISTextField
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
        proceedButtonText={T.DELETE}
        justify="center"
        size="medium"
        disableProceed={!comments}
        sx={{ p: 1, m: 1 }}
        handleClose={() => {
          resetState();
        }}
        handleSubmit={handleDeleteProject}
      />
    </MISDialog>
  );
};

DeleteProject.propTypes = {
  openDeleteProject: PropTypes.bool,
  projectId: PropTypes.number,
  refreshView: PropTypes.func,
  handleDeleteProjectDialog: PropTypes.func,
};

export default DeleteProject;
