import React from "react";
import noop from "lodash/noop";
import PropTypes from "prop-types";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import T from "T";

import MISTextField from "./MISTextField";
import WithInputLabel from "./WithInputLabel";

const MISDatePicker = ({
  label = "",
  disabled,
  required,
  deprecatedLabel = true,
  name = "",
  endIcon,
  error = "",
  placeholder = T.SELECT,
  format = "MM/DD/YYYY",
  value = {},
  minDate = "",
  handleChange = noop,
  ...rest
}) => {
  return (
    <WithInputLabel
      label={deprecatedLabel && label}
      required={required}
      endIcon={endIcon}
      error={error}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputFormat={format}
          value={value}
          minDate ={minDate}
          disabled={disabled}
          onChange={(value) => handleChange(value, name)}
          {...rest}
          renderInput={(params) => (
            <MISTextField
              size="small"
              fullWidth
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder: placeholder,
              }}
            />
          )}
        />
      </LocalizationProvider>
    </WithInputLabel>
  );
};

MISDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  value: PropTypes.object,
  onHandleDateChange: PropTypes.func,
};

export default MISDatePicker;
