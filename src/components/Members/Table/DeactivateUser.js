import React, { useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Button, Grid, Stack, Typography } from "@mui/material";

import MISDialog from "components/common/MISDialog";

import T from "T";
import { format, isValid } from "date-fns";

import { BACKEND_DATE_FORMAT } from "settings/constants/date";

import { NETSMARTZ_THEME_COLOR } from "theme/colors";
import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";
import { toast } from "react-toastify";
import { handleError } from "utils/error";
import MISAutocomplete from "components/common/MISAutocomplete";
import { RESIGN_STATUS_LIST } from "../Member/memberModel";
import { useDeleteUserMutation } from "api/members/deleteUser";
import MISFooterButton from "components/common/MISFooterButton";

const DeactivateUser = ({
  deactivateMember = false,
  userId = "",
  handleDeactivateDialog = noop,
}) => {
  const defaultLocalState = {
    status: "",
    resignDate: null,
    releavingDate: null,
    comments: "",
  };

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    defaultLocalState
  );
  const { status, resignDate, releavingDate, comments } = localState;

  const [deleteUser] = useDeleteUserMutation();

  const getBEDateFormat = (val) => format(val, BACKEND_DATE_FORMAT);

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setLocalState({ [name]: value });
  };

  const onHandleDateChange = (newValue, type) => {
    const validDate = new Date(newValue);
    if (isValid(validDate))
      setLocalState({ [type]: getBEDateFormat(validDate) });
  };
  const onHandleAutoCompleteChange = (type, value) => {
    setLocalState({ [type]: value });
  };

  const resetState = () => {
    setLocalState(defaultLocalState);
  };

  const handleDeactivateMember = () => {
    const payload = {
      id: userId,
      status,
      comments,
    };

    if (status === T.RESIGNED) {
      payload.resignDate = resignDate;
      payload.releavingDate = releavingDate;
    }

    deleteUser(payload)
      .unwrap()
      .then(() => {
        toast.success(T.USER_DEACTIVATED_SUCCESSFULLY);
        resetState();
        handleDeactivateDialog();
      })
      .catch(handleError);
  };

  return (
    <MISDialog open={deactivateMember}>
      <Typography variant="h5" textAlign="center" p={`10px 100px`}>
        {`${T.DEACTIVATE} ${T.USER}`}
      </Typography>

      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item xs={12}>
          <MISAutocomplete
            listDetails={RESIGN_STATUS_LIST}
            value={status}
            required
            getByLabelText={(option) => option}
            onHandleChange={(event, newValue) =>
              onHandleAutoCompleteChange("status", newValue)
            }
          />
        </Grid>
        {status === T.RESIGNED && (
          <>
            <Grid item xs={6}>
              <MISDatePicker
                label={T.RESIGNATION_DATE}
                placeholder={T.RESIGNATION_DATE}
                inputFormat="MM/DD/YYYY"
                value={resignDate}
                required
                name="resignDate"
                handleChange={onHandleDateChange}
                renderInput={(params) => <MISTextField {...params} />}
              />
            </Grid>

            <Grid item xs={6}>
              <MISDatePicker
                label={T.RELIEVING_DATE}
                placeholder={T.RELIEVING_DATE}
                inputFormat="MM/DD/YYYY"
                value={releavingDate}
                required
                name="releavingDate"
                handleChange={onHandleDateChange}
                renderInput={(params) => <MISTextField {...params} />}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} sx={{ pt: 2 }}>
          <MISTextField
            fullWidth
            label={T.COMMENTS}
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
        proceedButtonText={T.DEACTIVATE}
        justify="center"
        size="medium"
        sx={{ mb: 2 }}
        disableProceed={
          !status ||
          (status === T.RESIGNED && (!resignDate || !releavingDate)) ||
          !comments
        }
        handleClose={() => {
          resetState();
          handleDeactivateDialog();
        }}
        handleSubmit={handleDeactivateMember}
      />
    </MISDialog>
  );
};

DeactivateUser.propTypes = {
  deactivateMember: PropTypes.bool,
  userID: PropTypes.string,
  handleDeactivateDialog: PropTypes.func,
};

export default DeactivateUser;
