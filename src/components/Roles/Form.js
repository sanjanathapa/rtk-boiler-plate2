import React from "react";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import { Button, Grid, TextField, Typography } from "@mui/material";
import MISTextField from "components/common/MISTextField";
import T from "T";

import { NETSMARTZ_THEME_COLOR } from "theme/colors";
import Permissions from "./Permissions";
import MISFooterButton from "components/common/MISFooterButton";

const Form = ({
  id = "",
  roleName = "",
  description = "",
  access = [],
  handleBack = noop,
  setAddRoles = noop,
  onHandleChange = noop,
  handleRole = noop,
  handleAddRole = noop,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" mt={2}>
          {T.ROLE}
        </Typography>
        <TextField
          id="outlined-size-normal"
          placeholder={T.ROLE}
          variant="outlined"
          name="roleName"
          size="small"
          disabled={id !== ""}
          value={roleName}
          fullWidth
          required
          onChange={onHandleChange}
          sx={{
            "& .MuiOutlinedInput-input": {
              fontSize: 12,
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <MISTextField
          label={T.DESCRIPTION}
          fullWidth
          placeholder={T.DESCRIPTION}
          size="small"
          variant="outlined"
          name="description"
          multiline
          rows={6}
          value={description}
          onChange={onHandleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Permissions access={access} handleRole={handleRole} />
      </Grid>

      <Grid item xs={12}>
        <MISFooterButton
          proceedButtonText={T.SAVE_AND_CONTINUE}
          disableProceed={!roleName}
          justify="end"
          handleClose={handleBack}
          handleSubmit={handleAddRole}
        />
      </Grid>
    </Grid>
  );
};

Form.propTypes = {
  id: PropTypes.string,
  roleName: PropTypes.string,
  description: PropTypes.string,
  setAddRoles: PropTypes.func,
  handleBack: PropTypes.func,
  onHandleChange: PropTypes.func,
  handleRole: PropTypes.func,
  handleAddRole: PropTypes.func,
};

export default Form;
