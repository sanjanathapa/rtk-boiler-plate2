import React from "react";
import noop from "lodash/noop";
import PropTypes from "prop-types";

import { Grid } from "@mui/material";

import MISTextField from "components/common/MISTextField";
import MISDatePicker from "components/common/MISDatePicker";

import T from "T";

const ExitDetails = ({
  id= "",
  empStatus= "",
  resignationDate = null,
  relievingDate = null,
  releavingComments = "",
  onHandleChange = noop,
  onHandleDateChange = noop,
}) => {
  
  const disableCondition = () => id && empStatus === T.RELIEVED ;
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <MISDatePicker
          label={T.RESIGNATION_DATE}
          placeholder={T.RESIGNATION_DATE}
          inputFormat="MM/DD/YYYY"
          value={resignationDate}
          name="resignationDate"
          disabled={disableCondition()}
          handleChange={onHandleDateChange}
          renderInput={(params) => <MISTextField {...params} />}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <MISDatePicker
          label={T.RELIEVING_DATE}
          placeholder={T.RELIEVING_DATE}
          inputFormat="MM/DD/YYYY"
          value={relievingDate}
          disabled={disableCondition()}
          name="relievingDate"
          handleChange={onHandleDateChange}
          renderInput={(params) => <MISTextField {...params} />}
        />
      </Grid>

      <Grid item xs={12}>
        <MISTextField
          label={T.COMMENTS}
          fullWidth
          placeholder={T.COMMENTS}
          disabled={disableCondition()}
          size="small"
          variant="outlined"
          name="releavingComments"
          multiline
          rows={6}
          value={releavingComments}
          onChange={onHandleChange}
        />
      </Grid>
    </Grid>
  );
};

ExitDetails.propTypes = {
  id: PropTypes.string,
  empStatus: PropTypes.string,
  resignationDate: PropTypes.instanceOf(Date),
  relievingDate: PropTypes.instanceOf(Date),
  releavingComments: PropTypes.string,
  onHandleChange: PropTypes.func,
  onHandleDateChange: PropTypes.func,
};

export default ExitDetails;
