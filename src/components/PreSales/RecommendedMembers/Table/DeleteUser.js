import React, { useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import { BACKGROUND } from "theme/colors";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import MISDialog from "components/common/MISDialog";
import T from "T";
import { NETSMARTZ_THEME_COLOR } from "theme/colors";
import { toast } from "react-toastify";
import { handleError } from "utils/error";
import MISTextField from "components/common/MISTextField";
import { useDeleteUserMutation } from "api/members/deleteUser";
import MISFooterButton from "components/common/MISFooterButton";

const DeleteUser = ({
  deleteMember = false,
  userId = "",
  handleDeleteUserDialog = noop,
  refreshTable =noop,
}) => {
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      comments: "",
    }
  );
  const { comments } = localState;

  const [deleteUser] = useDeleteUserMutation();

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };

  const handleDelete = () => {
    const payload = {
      status: T.DELETED,
      id: userId,
      comments,
    };

    deleteUser(payload)
      .unwrap()
      .then(() => {
        toast.success(T.USER_DELETE_SUCCESSFULL);
        setLocalState({ comments: "" });
        handleDeleteUserDialog();
        window.location.reload();
      })
      .catch(handleError);
  };

  return (
    <MISDialog open={deleteMember}>
      <Typography
        variant="body1"
        textAlign="center"
        p={`20px 60px`}
        sx={{ color: BACKGROUND.black, fontWeight: 500 }}
      >
        {T.DELETE_PERMISSION_STATEMENT}
      </Typography>
      <Divider />

      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12}>
          <MISTextField
            fullWidth
            placeholder={T.TELL_US_WHY}
            size="small"
            variant="outlined"
            name="comments"
            value={comments}
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
        sx={{ mb: 2 }}
        disableProceed={!comments}
        handleClose={() => {
          setLocalState({ comments: "" });
          handleDeleteUserDialog();
        }}
        handleSubmit={handleDelete}
      />
    </MISDialog>
  );
};

DeleteUser.propTypes = {
  deleteMember: PropTypes.bool,
  userId: PropTypes.string,
  handleDeleteUserDialog: PropTypes.func,
  refreshTable: PropTypes.func,
};

export default DeleteUser;
