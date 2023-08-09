import React from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import WithInputLabel from "./WithInputLabel";

const MISTextField = ({
  label,
  disabled,
  required,
  endIcon,
  variant = "outlined",
  error = "",
  autoComplete = "off",
  readOnly = false,
  InputProps = {},
  SelectProps = {},
  deprecatedLabel = true,
  multiline = false,
  rows = 6,
  ...rest
}) => {
  const helperText = rest?.helperText;
  return (
    <WithInputLabel
      label={deprecatedLabel && label}
      required={required}
      endIcon={endIcon}
      error={error}
    >
      <TextField
        disabled={disabled}
        InputProps={{ ...InputProps, readOnly }}
        variant={variant}
        multiline={multiline}
        autoComplete={autoComplete}
        required={required}
        rows={multiline ? rows : ""}
        label={deprecatedLabel ? null : label}
        {...rest}
        error={Boolean(error)}
        helperText={helperText}
        SelectProps={{
          ...SelectProps,
          IconComponent: (props) => <KeyboardArrowDownRounded {...props} />,
          MenuProps: {
            elevation: 0,
            PaperProps: {
              sx: {
                boxShadow:
                  "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
                maxHeight: 200,
              },
              variant: "outlined",
            },
          },
        }}
      />
    </WithInputLabel>
  );
};

MISTextField.propTypes = {
  label: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  endIcon: PropTypes.node,
  variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  SelectProps: PropTypes.object,
  InputProps: PropTypes.object,
  deprecatedLabel: PropTypes.bool,
};

export default MISTextField;
