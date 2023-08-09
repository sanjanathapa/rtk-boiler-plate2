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
import { useDeleteAllNcByIdMutation } from "api/Jira/deleteAllNcById";
import { toast } from "react-toastify";

const DeleteAllNC = ({
  openDeleteAllNC = false,
  allNcId = [],
  userId="",
  refreshView = noop,
  handleDeleteAllNcDialog = noop,
}) => {
    const [deleteAllNcById]= useDeleteAllNcByIdMutation();

  const resetState = () => {
    refreshView();
    handleDeleteAllNcDialog();
  };

  const handleDeleteNC = () => {
    const deleteNcPayload = {
        deleteIds:allNcId
      }
        deleteAllNcById({
          id:userId,
          ncRequestDto:deleteNcPayload
        })
        .unwrap()
        .then(res=>
            {
                resetState()
                toast.success(T.NCS_DELETED_SUCCESSFULLY)
            }
            )
        .catch(handleError)
  };

  return (
    <MISDialog open={openDeleteAllNC}>
      <Typography
        variant="h6"
        fontWeight={500}
        textAlign="center"
        p={`5px 30px`}
        mt={2}
      >
        {T.DELETE_ALL_NC_STATEMENT}
      </Typography>

      <MISFooterButton
        proceedButtonText={T.DELETE}
        justify="center"
        size="medium"
        sx={{ p: 1, m: 1 }}
        handleClose={() => {
          resetState();
        }}
        handleSubmit={handleDeleteNC}
      />
    </MISDialog>
  );
};

DeleteAllNC.propTypes = {
  openDeleteAllNC: PropTypes.bool,
  allNcId: PropTypes.number,
  userId: PropTypes.number,
  comments: PropTypes.string,
  refreshView: PropTypes.func,
  handleDeleteAllNcDialog: PropTypes.func,
};

export default DeleteAllNC;
