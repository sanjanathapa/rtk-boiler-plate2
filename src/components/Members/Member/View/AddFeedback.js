import React, { useReducer } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

import { Grid, Typography } from "@mui/material";

import MISDialog from "components/common/MISDialog";

import T from "T";
import { format, isValid } from "date-fns";

import { BACKEND_DATE_FORMAT } from "settings/constants/date";

import MISDatePicker from "components/common/MISDatePicker";
import MISTextField from "components/common/MISTextField";
import { toast } from "react-toastify";
import { handleError } from "utils/error";
import MISAutocomplete from "components/common/MISAutocomplete";
import { FEEDBACK_TYPES } from "../memberModel";
import { useAddFeedbackMutation } from "api/members/addFeedback";
import MISFooterButton from "components/common/MISFooterButton";

const AddFeedback = ({
  feedbackAddition = false,
  projectId = "",
  refreshView = noop,
  handleAddFeedbackDialog = noop,
}) => {
  const defaultLocalState = {
    date: null,
    type: "",
    feedback: "",
  };

  const [localState, setLocalState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    defaultLocalState
  );
  const { date, type, feedback } = localState;

  const [addFeedback] = useAddFeedbackMutation();

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

  const handleAddFeedback = () => {
    const payload = {
      projectId,
      type: type === `${T.POSITIVE} ${T.FEEDBACK}` ? "P" : "N",
      date,
      feedback,
    };

    addFeedback(payload)
      .unwrap()
      .then(() => {
        toast.success(T.FEEDBACK_SUBMITTED_SUCCESSFULLY);
        resetState();
        handleAddFeedbackDialog();
        refreshView();
      })
      .catch(handleError);
  };

  return (
    <MISDialog open={feedbackAddition}>
      <Typography variant="h5" textAlign="center" p={`10px 100px`}>
        {`${T.ADD} ${T.FEEDBACK}`}
      </Typography>

      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item xs={6}>
          <MISDatePicker
            label={`${T.FEEDBACK} ${T.DATE}`}
            placeholder={`${T.FEEDBACK} ${T.DATE}`}
            inputFormat="MM/DD/YYYY"
            value={date}
            required
            name="date"
            handleChange={onHandleDateChange}
            renderInput={(params) => <MISTextField {...params} />}
          />
        </Grid>

        <Grid item xs={6}>
          <MISAutocomplete
            label={T.SELECT_TYPE_OF_FEEDBACK}
            placeholder={T.SELECT_TYPE_OF_FEEDBACK}
            listDetails={FEEDBACK_TYPES}
            value={type}
            required
            getByLabelText={(option) => option}
            onHandleChange={(event, newValue) =>
              onHandleAutoCompleteChange("type", newValue)
            }
          />
        </Grid>

        <Grid item xs={12} sx={{ pt: 2 }}>
          <MISTextField
            fullWidth
            label={T.FEEDBACK}
            placeholder={T.FEEDBACK}
            size="small"
            variant="outlined"
            name="feedback"
            value={feedback}
            required
            onChange={onHandleChange}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>

      <MISFooterButton
        proceedButtonText={T.SUBMIT}
        justify="center"
        size="medium"
        disableProceed={!type || !date || !feedback}
        sx={{ p: 1, m: 1 }}
        handleClose={() => {
          resetState();
          handleAddFeedbackDialog();
        }}
        handleSubmit={handleAddFeedback}
      />
    </MISDialog>
  );
};

AddFeedback.propTypes = {
  feedbackAddition: PropTypes.bool,
  projectId: PropTypes.string,
  refreshView: PropTypes.func,
  handleAddFeedbackDialog: PropTypes.func,
};

export default AddFeedback;
