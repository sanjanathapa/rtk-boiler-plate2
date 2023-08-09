import React, { useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Button, Grid, Stack, Typography } from "@mui/material";

import MISDialog from "components/common/MISDialog";

import T from "T";
import { BACKGROUND, NETSMARTZ_THEME_COLOR } from "theme/colors";
import { useRevokeMutation } from "api/members/revoke";
import { toast } from "react-toastify";
import { handleError } from "utils/error";
import MISTextField from "components/common/MISTextField";
import MISFooterButton from "components/common/MISFooterButton";

const RevokeMemberResignation = ({
  revokeResignation = false,
  userId = "",
  handleRevokeResignationDialog = noop,
}) => {
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
  const [revoke] = useRevokeMutation();

  const handleResignationRevoke = () => {
    const payload = { id: userId, status: T.STABLE, comments };

    revoke(payload)
      .unwrap()
      .then(() => {
        toast.success(T.RESIGN_REVOKE_SUCCESSFULL);
        setLocalState({ comments: "" });
        handleRevokeResignationDialog();
      })
      .catch(handleError);
  };

  return (
    <MISDialog open={revokeResignation}>
      <Typography
        variant="body1"
        textAlign="center"
        p={`20px 10px`}
        sx={{
          wordWrap: "break-word",
          width: "300px",
          color: BACKGROUND.black,
          fontWeight: 500,
        }}
      >
        {T.RESIGNATION_REQUEST_STATEMENT}
      </Typography>

      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12}>
          <MISTextField
            fullWidth
            placeholder={T.REASON}
            size="small"
            variant="outlined"
            name="comments"
            value={comments}
            onChange={onHandleChange}
            multiline
            required
            rows={4}
          />
        </Grid>
      </Grid>

      <MISFooterButton
        proceedButtonText={T.REVOKE}
        justify="center"
        size="medium"
        sx={{ mb: 2 }}
        disableProceed={!comments}
        handleClose={() => {
          setLocalState({ comments: "" });
          handleRevokeResignationDialog();
        }}
        handleSubmit={handleResignationRevoke}
      />
    </MISDialog>
  );
};

RevokeMemberResignation.propTypes = {
  revokeResignation: PropTypes.bool,
  userId: PropTypes.string,
  handleRevokeResignationDialog: PropTypes.func,
};

export default RevokeMemberResignation;
