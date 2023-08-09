import React, { useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { Grid, Typography } from "@mui/material";

import T from "T";
import MISDialog from "components/common/MISDialog";
import MISTextField from "components/common/MISTextField";
import MISFooterButton from "components/common/MISFooterButton";

import { handleError } from "utils/error";
import { useDeleteNcByIdMutation } from "api/Jira/deleteNcById";
import { toast } from "react-toastify";

const DeleteNC = ({
  openDeleteNC = false,
  ncId = "",
  userId="",
  deleteComments="",
  refreshView = noop,
  handleDeleteNCDialog = noop,
}) => {
  const [deleteNcById] = useDeleteNcByIdMutation();

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
    handleDeleteNCDialog();
    refreshView();
  };

  const handleDeleteNC = () => {
    deleteNcById({ ncId: ncId, userId: userId, ncRequestDto:{comments:comments} })
      .unwrap()
      .then(() => {
        toast.success(T.NC_DELETED_SUCCESSFULLY)
        resetState();
      })
      .catch(handleError);
  };

  return (
    <MISDialog open={openDeleteNC}>
      <Typography
        variant="h6"
        fontWeight={500}
        textAlign="center"
        p={`5px 30px`}
        mt={2}
      >
        {T.DELETE_NC_STATEMENT}
      </Typography>

      {
        !deleteComments && 
        <>
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
        
        </>
      }

      <MISFooterButton
        proceedButtonText={T.DELETE}
        justify="center"
        size="medium"
        disableProceed={!deleteComments?!comments:false}
        sx={{ p: 1, m: 1 }}
        handleClose={() => {
          resetState();
        }}
        handleSubmit={handleDeleteNC}
      />
    </MISDialog>
  );
};

DeleteNC.propTypes = {
  openDeleteNC: PropTypes.bool,
  ncId: PropTypes.number,
  userId: PropTypes.number,
  comments: PropTypes.string,
  refreshView: PropTypes.func,
  handleDeleteNCDialog: PropTypes.func,
};

export default DeleteNC;
